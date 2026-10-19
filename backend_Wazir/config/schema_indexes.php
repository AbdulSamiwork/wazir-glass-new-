<?php
/**
 * Database Optimization Indexes
 * Adds high-performance compound and search indexes idempotently.
 */

function applyDatabaseIndexes($pdo) {
    $indexes = [
        ['wazir_quote_requests', 'idx_quotes_status_created', '(status, created_at)'],
        ['wazir_quote_requests', 'idx_quotes_phone', '(phone)'],
        ['wazir_quote_requests', 'idx_quotes_ip_created', '(ip_address, created_at)'],
        ['wazir_quotations', 'idx_quotations_phone', '(customer_phone)'],
        ['wazir_quotations', 'idx_quotations_status_created', '(status, created_at)'],
        ['wazir_quotations', 'idx_quotations_date', '(date)'],
        ['wazir_bills', 'idx_bills_phone', '(customer_phone)'],
        ['wazir_bills', 'idx_bills_status_created', '(status, created_at)'],
        ['wazir_bills', 'idx_bills_date', '(date)'],
        ['wazir_admins', 'idx_admins_token', '(token)']
    ];

    foreach ($indexes as $item) {
        list($table, $indexName, $cols) = $item;
        try {
            $check = $pdo->prepare("SHOW INDEX FROM `$table` WHERE Key_name = ?");
            $check->execute([$indexName]);
            if ($check->rowCount() === 0) {
                $pdo->exec("ALTER TABLE `$table` ADD INDEX `$indexName` $cols");
            }
        } catch (Exception $e) {
            // Index or table may already be structured
        }
    }
}
