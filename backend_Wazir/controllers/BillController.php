<?php
/**
 * Bill Controller
 * Manages official invoices, tax rates, advance payments, and customer phone validation.
 */

function handleGetBills($pdo) {
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $status = isset($_GET['status']) ? trim($_GET['status']) : 'all';
    $dues_only = isset($_GET['dues_only']) && $_GET['dues_only'] == '1';
    $is_paginated = isset($_GET['page']) || isset($_GET['paginate']);
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? max(1, min(100, intval($_GET['limit']))) : 10;
    $offset = ($page - 1) * $limit;

    try {
        $where = " WHERE 1=1";
        $params = [];
        if (!empty($search)) {
            $where .= " AND (customer_name LIKE ? OR customer_phone LIKE ? OR bill_number LIKE ?)";
            $params = array_merge($params, ["%$search%", "%$search%", "%$search%"]);
        }
        if ($dues_only) {
            $where .= " AND remaining_amount > 0";
        } elseif ($status !== 'all') {
            $where .= " AND status = ?";
            $params[] = $status;
        }

        // Count total matching records
        $countQuery = "SELECT COUNT(*) FROM wazir_bills" . $where;
        $countStmt = $pdo->prepare($countQuery);
        $countStmt->execute($params);
        $totalRecords = intval($countStmt->fetchColumn());

        // Fetch paginated or full records
        $query = "SELECT * FROM wazir_bills" . $where . " ORDER BY id DESC";
        if ($is_paginated) {
            $query .= " LIMIT " . intval($limit) . " OFFSET " . intval($offset);
        }

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $bills = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($bills as &$b) {
            $b['items'] = json_decode($b['items'], true);
            $b['_id'] = $b['id'];
            $b['billNumber'] = $b['bill_number'];
            $b['customerName'] = $b['customer_name'];
            $b['customerPhone'] = $b['customer_phone'];
            $b['customerAddress'] = $b['customer_address'];
            $b['subtotal'] = floatval($b['subtotal']);
            $b['discount'] = floatval($b['discount']);
            $b['discountAmount'] = floatval($b['discount_amount']);
            $b['taxRate'] = floatval($b['tax_rate']);
            $b['taxAmount'] = floatval($b['tax_amount']);
            $b['total'] = floatval($b['total']);
            $b['amountReceived'] = floatval($b['amount_received']);
            $b['remainingAmount'] = floatval($b['remaining_amount']);
        }

        if ($is_paginated) {
            echo json_encode([
                "data" => $bills,
                "pagination" => [
                    "total" => $totalRecords,
                    "page" => $page,
                    "limit" => $limit,
                    "totalPages" => ceil($totalRecords / $limit)
                ]
            ]);
        } else {
            echo json_encode($bills);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch bills: " . $e->getMessage()]);
    }
}

function handleCreateBill($pdo) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
    }

    $input = json_decode(file_get_contents("php://input"), true);
    $bill_number = trim($input['billNumber'] ?? '');
    $date = trim($input['date'] ?? '');
    $customer_name = trim($input['customerName'] ?? '');
    $customer_phone = trim($input['customerPhone'] ?? '');
    $customer_address = trim($input['customerAddress'] ?? '');
    $items = json_encode($input['items'] ?? []);
    $subtotal = floatval($input['subtotal'] ?? 0);
    $discount = floatval($input['discount'] ?? 0);
    $discount_amount = floatval($input['discountAmount'] ?? 0);
    $tax_rate = floatval($input['taxRate'] ?? 0);
    $tax_amount = floatval($input['taxAmount'] ?? 0);
    $total = floatval($input['total'] ?? 0);
    $amount_received = floatval($input['amountReceived'] ?? 0);
    $remaining_amount = $total - $amount_received;
    $notes = trim($input['notes'] ?? '');
    $quotation_id = isset($input['quotationId']) ? intval($input['quotationId']) : null;

    $status = ($amount_received >= $total && $total > 0) ? 'paid' : (($amount_received > 0) ? 'advanced' : 'pending');
    if ($status === 'paid') $remaining_amount = 0;

    if (empty($bill_number) || empty($customer_name) || empty($customer_phone)) {
        http_response_code(400);
        echo json_encode(["error" => "Required fields missing"]);
        exit;
    }

    $clean_phone = preg_replace('/\D/', '', $customer_phone);
    if (strlen($clean_phone) !== 11 || substr($clean_phone, 0, 1) !== '0') {
        http_response_code(400);
        echo json_encode(["error" => "Customer phone number must start with 0 and contain exactly 11 digits."]);
        exit;
    }
    $customer_phone = $clean_phone;

    try {
        $pdo->beginTransaction();
        $stmt = $pdo->prepare("INSERT INTO wazir_bills (bill_number, date, customer_name, customer_phone, customer_address, items, subtotal, discount, discount_amount, tax_rate, tax_amount, total, amount_received, remaining_amount, notes, status, converted_from_quotation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$bill_number, $date, $customer_name, $customer_phone, $customer_address, $items, $subtotal, $discount, $discount_amount, $tax_rate, $tax_amount, $total, $amount_received, $remaining_amount, $notes, $status, $quotation_id]);

        if ($quotation_id) {
            $updQ = $pdo->prepare("UPDATE wazir_quotations SET status = 'converted' WHERE id = ?");
            $updQ->execute([$quotation_id]);
        }

        $pdo->commit();
        echo json_encode(["success" => true, "message" => "Bill created successfully"]);
    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(["error" => "Failed to create bill: " . $e->getMessage()]);
    }
}

function handleUpdateBill($pdo) {
    $id = intval($_GET['id'] ?? 0);
    $input = json_decode(file_get_contents("php://input"), true);
    if (empty($id)) {
        http_response_code(400);
        echo json_encode(["error" => "Bill ID required"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM wazir_bills WHERE id = ?");
        $stmt->execute([$id]);
        $bill = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$bill) {
            http_response_code(404);
            echo json_encode(["error" => "Bill not found"]);
            exit;
        }

        if (isset($input['customerPhone'])) {
            $clean_phone = preg_replace('/\D/', '', $input['customerPhone']);
            if (strlen($clean_phone) !== 11 || substr($clean_phone, 0, 1) !== '0') {
                http_response_code(400);
                echo json_encode(["error" => "Customer phone number must start with 0 and contain exactly 11 digits."]);
                exit;
            }
            $input['customerPhone'] = $clean_phone;
        }

        $fields = [];
        $params = [];
        $mapping = [
            'billNumber' => 'bill_number', 'date' => 'date', 'customerName' => 'customer_name',
            'customerPhone' => 'customer_phone', 'customerAddress' => 'customer_address', 'items' => 'items',
            'subtotal' => 'subtotal', 'discount' => 'discount', 'discountAmount' => 'discount_amount',
            'taxRate' => 'tax_rate', 'taxAmount' => 'tax_amount', 'total' => 'total', 'notes' => 'notes',
            'status' => 'status', 'amountReceived' => 'amount_received'
        ];

        foreach ($mapping as $key => $column) {
            if (array_key_exists($key, $input)) {
                $fields[] = "$column = ?";
                $val = ($key === 'items') ? json_encode($input[$key]) : $input[$key];
                $params[] = $val;
            }
        }

        $newTotal = floatval($input['total'] ?? $bill['total']);
        $newRec = floatval($input['amountReceived'] ?? $bill['amount_received']);
        $newRem = $newTotal - $newRec;
        $newStatus = ($newRec >= $newTotal && $newTotal > 0) ? 'paid' : (($newRec > 0) ? 'advanced' : 'pending');
        if ($newStatus === 'paid') $newRem = 0;

        if (!isset($input['status'])) { $fields[] = "status = ?"; $params[] = $newStatus; }
        $fields[] = "remaining_amount = ?"; $params[] = $newRem;

        if (count($fields) > 0) {
            $params[] = $id;
            $pdo->prepare("UPDATE wazir_bills SET " . implode(", ", $fields) . " WHERE id = ?")->execute($params);
            echo json_encode(["success" => true, "message" => "Bill updated successfully"]);
        } else {
            echo json_encode(["success" => true, "message" => "No changes detected"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to update bill: " . $e->getMessage()]);
    }
}

function handleDeleteBill($pdo) {
    $id = intval($_GET['id'] ?? 0);
    try {
        $pdo->prepare("DELETE FROM wazir_bills WHERE id = ?")->execute([$id]);
        echo json_encode(["success" => true, "message" => "Bill removed"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to delete bill: " . $e->getMessage()]);
    }
}
