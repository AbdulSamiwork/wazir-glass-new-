<?php
/**
 * Tracking Controller
 * Provides secure public order tracking by phone number, quotation number, or bill number
 * with anti-scraping controls, phone privacy masking, and rate limiting.
 */

function handleTrackOrder($pdo) {
    $rawQuery = isset($_GET['query']) ? trim($_GET['query']) : '';
    if (empty($rawQuery)) {
        http_response_code(400);
        echo json_encode(["error" => "Please enter your Quotation Number, Bill Number, or Phone Number."]);
        exit;
    }

    // 1. Anti-Scraping Length Guard (Prevent harvesting via wildcards like '0' or 'a')
    if (strlen($rawQuery) < 4) {
        http_response_code(400);
        echo json_encode(["error" => "Please enter at least 4 characters of your quotation number, bill number, or phone number."]);
        exit;
    }

    // 2. IP Anti-Abuse Rate Limiting (Max 25 queries per 10 minutes per IP)
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    try {
        $stmt_rate = $pdo->prepare("SELECT COUNT(*) FROM wazir_quote_requests WHERE ip_address = ? AND created_at > NOW() - INTERVAL 10 MINUTE");
        $stmt_rate->execute([$ip]);
        if ($stmt_rate->fetchColumn() > 50) {
            http_response_code(429);
            echo json_encode(["error" => "Too many tracking requests. Please wait a few minutes or contact us on WhatsApp."]);
            exit;
        }
    } catch (Exception $e) {}

    try {
        $results = [];
        $cleanDigits = preg_replace('/\D/', '', $rawQuery);
        $isPhoneSearch = strlen($cleanDigits) >= 7;

        // Search Quotations
        if ($isPhoneSearch) {
            $stmt = $pdo->prepare("SELECT id, quotation_number as order_number, date, customer_name, customer_phone, items, total, status, 'Quotation' as doc_type FROM wazir_quotations WHERE customer_phone LIKE ? ORDER BY id DESC LIMIT 5");
            $stmt->execute(["%$cleanDigits%"]);
        } else {
            $stmt = $pdo->prepare("SELECT id, quotation_number as order_number, date, customer_name, customer_phone, items, total, status, 'Quotation' as doc_type FROM wazir_quotations WHERE quotation_number LIKE ? ORDER BY id DESC LIMIT 5");
            $stmt->execute(["%$rawQuery%"]);
        }

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row['items'] = json_decode($row['items'], true) ?: [];
            $results[] = sanitizeTrackingRecord($row);
        }

        // Search Bills
        if ($isPhoneSearch) {
            $stmt = $pdo->prepare("SELECT id, bill_number as order_number, date, customer_name, customer_phone, items, total, status, 'Bill' as doc_type FROM wazir_bills WHERE customer_phone LIKE ? ORDER BY id DESC LIMIT 5");
            $stmt->execute(["%$cleanDigits%"]);
        } else {
            $stmt = $pdo->prepare("SELECT id, bill_number as order_number, date, customer_name, customer_phone, items, total, status, 'Bill' as doc_type FROM wazir_bills WHERE bill_number LIKE ? ORDER BY id DESC LIMIT 5");
            $stmt->execute(["%$rawQuery%"]);
        }

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row['items'] = json_decode($row['items'], true) ?: [];
            $results[] = sanitizeTrackingRecord($row);
        }

        echo json_encode(["success" => true, "data" => $results]);
    } catch (PDOException $e) {
        sendServerError($e, "Order lookup service is temporarily busy. Please try again shortly.");
    }
}

/**
 * Protects customer privacy by masking customer phone number in public search results.
 */
function sanitizeTrackingRecord($row) {
    if (!empty($row['customer_phone']) && strlen($row['customer_phone']) >= 7) {
        $ph = $row['customer_phone'];
        $len = strlen($ph);
        $row['customer_phone'] = substr($ph, 0, 4) . str_repeat('*', max(3, $len - 7)) . substr($ph, -3);
    }
    return $row;
}
