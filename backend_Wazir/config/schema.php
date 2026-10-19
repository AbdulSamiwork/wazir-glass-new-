<?php
/**
 * Database Schema Auto-Provisioning
 * Creates required tables if not existing and calls seeders.
 */

require_once __DIR__ . '/seeders.php';
require_once __DIR__ . '/schema_invoicing.php';
require_once __DIR__ . '/schema_indexes.php';

function createTablesAndSeed($pdo) {
    // 1. Admins & Security Tables
    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        token VARCHAR(255) DEFAULT NULL,
        token_expires_at DATETIME DEFAULT NULL,
        last_active_at DATETIME DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    try { $pdo->exec("ALTER TABLE wazir_admins ADD COLUMN token_expires_at DATETIME DEFAULT NULL"); } catch (Exception $e) {}
    try { $pdo->exec("ALTER TABLE wazir_admins ADD COLUMN last_active_at DATETIME DEFAULT NULL"); } catch (Exception $e) {}

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_login_attempts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        username VARCHAR(100) DEFAULT NULL,
        attempt_time DATETIME NOT NULL,
        INDEX idx_ip_time (ip_address, attempt_time)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Default Admins Seed
    $stmt = $pdo->query("SELECT COUNT(*) FROM wazir_admins");
    if ($stmt->fetchColumn() == 0) {
        $hash = password_hash('admin_wazir_2026', PASSWORD_DEFAULT);
        $ins = $pdo->prepare("INSERT INTO wazir_admins (username, password) VALUES (?, ?)");
        $ins->execute(['admin', $hash]);
    }

    $check_wazir = $pdo->prepare("SELECT COUNT(*) FROM wazir_admins WHERE username = ?");
    $check_wazir->execute(['wazirglass']);
    if ($check_wazir->fetchColumn() == 0) {
        $hash_wazir = password_hash('wazirglass2026', PASSWORD_DEFAULT);
        $ins_wazir = $pdo->prepare("INSERT INTO wazir_admins (username, password) VALUES (?, ?)");
        $ins_wazir->execute(['wazirglass', $hash_wazir]);
    }

    // 2. Settings & Content Tables
    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value LONGTEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    try { $pdo->exec("ALTER TABLE wazir_settings MODIFY setting_value LONGTEXT"); } catch (Exception $e) {}

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        meta VARCHAR(100),
        image TEXT,
        details TEXT,
        specs TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_featured_products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        tagline VARCHAR(255),
        description TEXT,
        use_case TEXT,
        specifications TEXT,
        image TEXT,
        features TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        image TEXT,
        details TEXT,
        highlights TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        value VARCHAR(50),
        suffix VARCHAR(10),
        label VARCHAR(255)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_trust_points (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        `desc` TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_gallery (
        id INT PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(100),
        size VARCHAR(100),
        `desc` TEXT,
        image TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_timeline (
        id INT AUTO_INCREMENT PRIMARY KEY,
        step VARCHAR(10),
        title VARCHAR(255),
        `desc` TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        role VARCHAR(100),
        `text` TEXT,
        stars INT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_before_after (
        id INT PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(100),
        beforeImage TEXT,
        afterImage TEXT,
        beforeLabel VARCHAR(255),
        afterLabel VARCHAR(255),
        specs TEXT,
        impact TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_quote_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) DEFAULT NULL,
        service_type VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        project_details TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'New',
        ip_address VARCHAR(50) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    try { $pdo->exec("ALTER TABLE wazir_quote_requests ADD COLUMN status VARCHAR(50) DEFAULT 'New'"); } catch (Exception $e) {}
    try { $pdo->exec("ALTER TABLE wazir_quote_requests ADD COLUMN ip_address VARCHAR(50) DEFAULT NULL"); } catch (Exception $e) {}

    // 3. Modular Invoicing Tables & Indexes
    createInvoicingTables($pdo);
    applyDatabaseIndexes($pdo);

    // 4. Seed database if empty
    $stmt = $pdo->query("SELECT COUNT(*) FROM wazir_settings");
    if ($stmt->fetchColumn() == 0) {
        $possible_json = [__DIR__ . '/../data.json', __DIR__ . '/../../public/data.json', __DIR__ . '/../../data.json'];
        foreach ($possible_json as $file) {
            if (file_exists($file)) {
                seedDatabase($pdo, $file);
                break;
            }
        }
    }
}
