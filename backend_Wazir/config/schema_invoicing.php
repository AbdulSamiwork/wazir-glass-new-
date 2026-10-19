<?php
/**
 * Invoicing Database Schema
 * Creates wazir_quotations and wazir_bills tables.
 */

function createInvoicingTables($pdo) {
    // Quotations Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_quotations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        quotation_number VARCHAR(100) UNIQUE NOT NULL,
        date DATE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_address TEXT DEFAULT NULL,
        items TEXT NOT NULL,
        subtotal DECIMAL(15,2) NOT NULL,
        discount DECIMAL(5,2) DEFAULT 0,
        discount_amount DECIMAL(15,2) DEFAULT 0,
        total DECIMAL(15,2) NOT NULL,
        notes TEXT DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Bills Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS wazir_bills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bill_number VARCHAR(100) UNIQUE NOT NULL,
        date DATE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_address TEXT DEFAULT NULL,
        items TEXT NOT NULL,
        subtotal DECIMAL(15,2) NOT NULL,
        discount DECIMAL(5,2) DEFAULT 0,
        discount_amount DECIMAL(15,2) DEFAULT 0,
        tax_rate DECIMAL(5,2) DEFAULT 0,
        tax_amount DECIMAL(15,2) DEFAULT 0,
        total DECIMAL(15,2) NOT NULL,
        amount_received DECIMAL(15,2) DEFAULT 0,
        remaining_amount DECIMAL(15,2) DEFAULT 0,
        notes TEXT DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        converted_from_quotation INT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
}
