<?php
/**
 * Authentication & Access Control Helpers
 * Validates Bearer tokens with 24-hour TTL expiration and sliding refresh.
 */

function isAuthenticated($pdo) {
    $auth_header = '';
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth_header = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $auth_header = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    }
    
    $token = '';
    if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
        $token = $matches[1];
    } elseif (!empty($_GET['token'])) {
        $token = $_GET['token'];
    } elseif (!empty($_POST['token'])) {
        $token = $_POST['token'];
    } elseif (!empty($_REQUEST['token'])) {
        $token = $_REQUEST['token'];
    }
    
    $token = trim($token);
    if (empty($token) || strlen($token) < 16) {
        return false;
    }
    
    try {
        // Query token with atomic MySQL expiration check
        $stmt = $pdo->prepare("SELECT id FROM wazir_admins WHERE token = ? AND (token_expires_at IS NULL OR token_expires_at > NOW())");
        $stmt->execute([$token]);
        $adminId = $stmt->fetchColumn();

        if (!$adminId) {
            return false;
        }

        // Sliding token refresh: extend session by 24 hours on active interaction
        try {
            $upd = $pdo->prepare("UPDATE wazir_admins SET last_active_at = NOW(), token_expires_at = DATE_ADD(NOW(), INTERVAL 24 HOUR) WHERE id = ?");
            $upd->execute([$adminId]);
        } catch (Exception $e) {}

        return true;
    } catch (PDOException $e) {
        return false;
    }
}

function getCurrentUserId($pdo) {
    $auth_header = '';
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth_header = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $auth_header = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    }
    
    $token = '';
    if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
        $token = $matches[1];
    } elseif (!empty($_GET['token'])) {
        $token = $_GET['token'];
    } elseif (!empty($_POST['token'])) {
        $token = $_POST['token'];
    } elseif (!empty($_REQUEST['token'])) {
        $token = $_REQUEST['token'];
    }
    
    $token = trim($token);
    if (empty($token) || strlen($token) < 16) {
        return null;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT id FROM wazir_admins WHERE token = ? AND (token_expires_at IS NULL OR token_expires_at > NOW())");
        $stmt->execute([$token]);
        $val = $stmt->fetchColumn();
        return $val !== false ? $val : null;
    } catch (PDOException $e) {
        return null;
    }
}
