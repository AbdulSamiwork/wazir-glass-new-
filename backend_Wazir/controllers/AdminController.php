<?php
/**
 * Admin Controller
 * Handles super-admin privileges: adding, editing, listing, and removing sub-admins.
 */

function handleAddAdmin($pdo) {
    if (getCurrentUserId($pdo) != 1) {
        http_response_code(403);
        echo json_encode(["error" => "Only Super Admin can create new admins."]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
    }

    $input = json_decode(file_get_contents("php://input"), true);
    $newUsername = isset($input['newUsername']) ? trim($input['newUsername']) : '';
    $newPassword = isset($input['newPassword']) ? trim($input['newPassword']) : '';

    if (empty($newUsername) || empty($newPassword)) {
        http_response_code(400);
        echo json_encode(["error" => "Username and password are required to create a new admin"]);
        exit;
    }

    try {
        $check = $pdo->prepare("SELECT id FROM wazir_admins WHERE username = ?");
        $check->execute([$newUsername]);
        if ($check->fetch()) {
            http_response_code(409);
            echo json_encode(["error" => "Username already exists. Please choose a different username."]);
            exit;
        }

        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO wazir_admins (username, password) VALUES (?, ?)");
        $stmt->execute([$newUsername, $hashedPassword]);

        echo json_encode([
            "success" => true,
            "message" => "New admin account created successfully!"
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to create new admin: " . $e->getMessage()]);
    }
}

function handleGetAdmins($pdo) {
    if (getCurrentUserId($pdo) != 1) {
        http_response_code(403);
        echo json_encode(["error" => "Only Super Admin can view all admins."]);
        exit;
    }

    try {
        $stmt = $pdo->query("SELECT id, username, created_at FROM wazir_admins ORDER BY id ASC");
        $admins = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($admins);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch admins: " . $e->getMessage()]);
    }
}

function handleUpdateAdminBySuper($pdo) {
    if (getCurrentUserId($pdo) != 1) {
        http_response_code(403);
        echo json_encode(["error" => "Only Super Admin can update other admins."]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
    }

    $input = json_decode(file_get_contents("php://input"), true);
    $admin_id = isset($input['admin_id']) ? intval($input['admin_id']) : 0;
    $newUsername = isset($input['username']) ? trim($input['username']) : '';
    $newPassword = isset($input['password']) ? trim($input['password']) : '';

    if ($admin_id <= 0) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid admin ID"]);
        exit;
    }

    try {
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
            $params[] = $admin_id;
            $sql = "UPDATE wazir_admins SET " . implode(", ", $update_fields) . " WHERE id = ?";
            $upd = $pdo->prepare($sql);
            $upd->execute($params);
            echo json_encode(["success" => true, "message" => "Admin updated successfully!"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "No new username or password provided"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to update admin: " . $e->getMessage()]);
    }
}

function handleDeleteAdmin($pdo) {
    if (getCurrentUserId($pdo) != 1) {
        http_response_code(403);
        echo json_encode(["error" => "Only Super Admin can delete admins."]);
        exit;
    }

    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    if ($id === 1) {
        http_response_code(400);
        echo json_encode(["error" => "Cannot delete the Super Admin account."]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM wazir_admins WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true, "message" => "Admin deleted successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to delete admin: " . $e->getMessage()]);
    }
}
