<?php
/**
 * Auth Controller
 * Handles Admin authentication, brute-force protection, token TTL, and credential updates.
 */

require_once __DIR__ . '/../services/RateLimiter.php';

function handleLogin($pdo) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $input = json_decode(file_get_contents("php://input"), true);
    $username = isset($input['username']) ? trim($input['username']) : '';
    $password = isset($input['password']) ? trim($input['password']) : '';

    // 1. Brute-Force Rate Limiting Check
    $rateStatus = RateLimiter::checkLoginAttempts($pdo, $ip, $username);
    if (!$rateStatus['allowed']) {
        http_response_code(429);
        echo json_encode([
            "success" => false,
            "error"   => $rateStatus['error']
        ]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM wazir_admins WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // Clear failed attempts on successful login
            RateLimiter::clearFailedAttempts($pdo, $ip, $username);

            $token = bin2hex(random_bytes(32));

            // Set 24h expiration and activity timestamp
            $upd = $pdo->prepare("UPDATE wazir_admins SET token = ?, token_expires_at = DATE_ADD(NOW(), INTERVAL 24 HOUR), last_active_at = NOW() WHERE id = ?");
            $upd->execute([$token, $user['id']]);

            echo json_encode([
                "success"       => true,
                "token"         => $token,
                "is_superadmin" => ($user['id'] == 1),
                "message"       => "Login successful"
            ]);
        } else {
            RateLimiter::recordFailedAttempt($pdo, $ip, $username);
            $newStatus = RateLimiter::checkLoginAttempts($pdo, $ip, $username);
            $remaining = $newStatus['remaining'];

            http_response_code(401);
            echo json_encode([
                "success" => false,
                "error"   => "Invalid username or password." . ($remaining > 0 ? " ({$remaining} attempts remaining before temporary lockout)" : " Account temporarily locked.")
            ]);
        }
    } catch (PDOException $e) {
        sendServerError($e, "Authentication service is temporarily unavailable.");
    }
}

function handleLogout($pdo) {
    $token = '';
    $auth_header = $_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '');
    if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
        $token = $matches[1];
    } elseif (isset($_GET['token'])) {
        $token = $_GET['token'];
    }
    if (!empty($token)) {
        try {
            $stmt = $pdo->prepare("UPDATE wazir_admins SET token = NULL, token_expires_at = NULL WHERE token = ?");
            $stmt->execute([$token]);
        } catch (Exception $e) {}
    }
    echo json_encode(["success" => true, "message" => "Logged out successfully"]);
}

function handleUpdateCredentials($pdo) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
    }

    $input = json_decode(file_get_contents("php://input"), true);
    $currentPassword = isset($input['currentPassword']) ? trim($input['currentPassword']) : '';
    $newUsername = isset($input['newUsername']) ? trim($input['newUsername']) : '';
    $newPassword = isset($input['newPassword']) ? trim($input['newPassword']) : '';

    if (empty($currentPassword)) {
        http_response_code(400);
        echo json_encode(["error" => "Current password is required to verify identity"]);
        exit;
    }

    try {
        $auth_header = $_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '');
        $token = '';
        if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
            $token = $matches[1];
        } elseif (isset($_GET['token'])) {
            $token = $_GET['token'];
        }

        $stmt = $pdo->prepare("SELECT * FROM wazir_admins WHERE token = ?");
        $stmt->execute([$token]);
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$admin || !password_verify($currentPassword, $admin['password'])) {
            http_response_code(401);
            echo json_encode(["error" => "Incorrect current password"]);
            exit;
        }

        $update_fields = [];
        $params = [];

        if (!empty($newUsername)) {
            $update_fields[] = "username = ?";
            $params[] = $newUsername;
        }

        if (!empty($newPassword)) {
            $update_fields[] = "password = ?";
            $params[] = password_hash($newPassword, PASSWORD_DEFAULT);
        }

        if (count($update_fields) > 0) {
            $params[] = $admin['id'];
            $sql = "UPDATE wazir_admins SET " . implode(", ", $update_fields) . " WHERE id = ?";
            $upd = $pdo->prepare($sql);
            $upd->execute($params);

            echo json_encode([
                "success" => true,
                "message" => "Credentials updated successfully!"
            ]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "No new username or password provided"]);
        }
    } catch (PDOException $e) {
        sendServerError($e, "Failed to update admin credentials.");
    }
}
