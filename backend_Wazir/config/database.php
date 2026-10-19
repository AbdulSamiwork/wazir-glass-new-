<?php
/**
 * Database Connection Module
 * Connects to MySQL via PDO and verifies table schema.
 */

require_once __DIR__ . '/env.php';

$db_host = env('DB_HOST', 'sql303.infinityfree.com');
$db_port = env('DB_PORT', '3306');
$db_user = env('DB_USER', 'if0_43137755');
$db_pass = env('DB_PASS', 'ACYqGZrUAVPxq');
$db_name = env('DB_NAME', 'if0_43137755_wazirglass');

// If local environment, attempt auto-creating database if permitted
if ($db_host === '127.0.0.1' || $db_host === 'localhost') {
    try {
        $pdo_init = new PDO("mysql:host=$db_host;port=$db_port", $db_user, $db_pass);
        $pdo_init->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo_init->exec("CREATE DATABASE IF NOT EXISTS `$db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    } catch (Exception $e) {
        // Shared hosting / permission restriction: proceed to direct DB connection
    }
}

try {
    $pdo = new PDO("mysql:host=$db_host;port=$db_port;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    require_once __DIR__ . '/schema.php';
    createTablesAndSeed($pdo);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}
