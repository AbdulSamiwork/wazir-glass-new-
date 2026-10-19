<?php
/**
 * Quotation Controller
 * Manages official quotations, line items, pricing, and phone validation.
 */

function handleGetQuotations($pdo) {
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $status = isset($_GET['status']) ? trim($_GET['status']) : 'all';
    $is_paginated = isset($_GET['page']) || isset($_GET['paginate']);
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? max(1, min(100, intval($_GET['limit']))) : 10;
    $offset = ($page - 1) * $limit;

    try {
        $where = " WHERE 1=1";
        $params = [];
        if (!empty($search)) {
            $where .= " AND (customer_name LIKE ? OR customer_phone LIKE ? OR quotation_number LIKE ?)";
            $params[] = "%$search%";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }
        if ($status !== 'all') {
            $where .= " AND status = ?";
            $params[] = $status;
        }

        // Count total matching records
        $countQuery = "SELECT COUNT(*) FROM wazir_quotations" . $where;
        $countStmt = $pdo->prepare($countQuery);
        $countStmt->execute($params);
        $totalRecords = intval($countStmt->fetchColumn());

        // Fetch paginated or full records
        $query = "SELECT * FROM wazir_quotations" . $where . " ORDER BY id DESC";
        if ($is_paginated) {
            $query .= " LIMIT " . intval($limit) . " OFFSET " . intval($offset);
        }

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $quotations = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($quotations as &$q) {
            $q['items'] = json_decode($q['items'], true);
            $q['_id'] = $q['id'];
            $q['quotationNumber'] = $q['quotation_number'];
            $q['customerName'] = $q['customer_name'];
            $q['customerPhone'] = $q['customer_phone'];
            $q['customerAddress'] = $q['customer_address'];
            $q['discountAmount'] = floatval($q['discount_amount']);
            $q['subtotal'] = floatval($q['subtotal']);
            $q['discount'] = floatval($q['discount']);
            $q['total'] = floatval($q['total']);
        }

        if ($is_paginated) {
            echo json_encode([
                "data" => $quotations,
                "pagination" => [
                    "total" => $totalRecords,
                    "page" => $page,
                    "limit" => $limit,
                    "totalPages" => ceil($totalRecords / $limit)
                ]
            ]);
        } else {
            echo json_encode($quotations);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch quotations: " . $e->getMessage()]);
    }
}

function handleCreateQuotation($pdo) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
    }

    $input = json_decode(file_get_contents("php://input"), true);
    $quotation_number = isset($input['quotationNumber']) ? trim($input['quotationNumber']) : '';
    $date = isset($input['date']) ? trim($input['date']) : '';
    $customer_name = isset($input['customerName']) ? trim($input['customerName']) : '';
    $customer_phone = isset($input['customerPhone']) ? trim($input['customerPhone']) : '';
    $customer_address = isset($input['customerAddress']) ? trim($input['customerAddress']) : '';
    $items = isset($input['items']) ? json_encode($input['items']) : '[]';
    $subtotal = isset($input['subtotal']) ? floatval($input['subtotal']) : 0;
    $discount = isset($input['discount']) ? floatval($input['discount']) : 0;
    $discount_amount = isset($input['discountAmount']) ? floatval($input['discountAmount']) : 0;
    $total = isset($input['total']) ? floatval($input['total']) : 0;
    $notes = isset($input['notes']) ? trim($input['notes']) : '';
    $status = isset($input['status']) ? trim($input['status']) : 'pending';

    if (empty($quotation_number) || empty($customer_name) || empty($customer_phone)) {
        http_response_code(400);
        echo json_encode(["error" => "Required fields missing"]);
        exit;
    }

    // Validate phone number format (must start with 0 and contain exactly 11 digits)
    $clean_phone = preg_replace('/\D/', '', $customer_phone);
    if (strlen($clean_phone) !== 11 || substr($clean_phone, 0, 1) !== '0') {
        http_response_code(400);
        echo json_encode(["error" => "Customer phone number must start with 0 and contain exactly 11 digits (e.g. 03001234567)."]);
        exit;
    }
    $customer_phone = $clean_phone;

    try {
        $stmt = $pdo->prepare("INSERT INTO wazir_quotations (quotation_number, date, customer_name, customer_phone, customer_address, items, subtotal, discount, discount_amount, total, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$quotation_number, $date, $customer_name, $customer_phone, $customer_address, $items, $subtotal, $discount, $discount_amount, $total, $notes, $status]);
        echo json_encode(["success" => true, "message" => "Quotation created successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to create quotation: " . $e->getMessage()]);
    }
}

function handleUpdateQuotation($pdo) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $input = json_decode(file_get_contents("php://input"), true);
    if (empty($id)) {
        http_response_code(400);
        echo json_encode(["error" => "Quotation ID required"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM wazir_quotations WHERE id = ?");
        $stmt->execute([$id]);
        $quotation = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$quotation) {
            http_response_code(404);
            echo json_encode(["error" => "Quotation not found"]);
            exit;
        }

        if (isset($input['customerPhone'])) {
            $clean_phone = preg_replace('/\D/', '', $input['customerPhone']);
            if (strlen($clean_phone) !== 11 || substr($clean_phone, 0, 1) !== '0') {
                http_response_code(400);
                echo json_encode(["error" => "Customer phone number must start with 0 and contain exactly 11 digits (e.g. 03001234567)."]);
                exit;
            }
            $input['customerPhone'] = $clean_phone;
        }

        $fields = [];
        $params = [];
        $mapping = [
            'quotationNumber' => 'quotation_number',
            'date' => 'date',
            'customerName' => 'customer_name',
            'customerPhone' => 'customer_phone',
            'customerAddress' => 'customer_address',
            'items' => 'items',
            'subtotal' => 'subtotal',
            'discount' => 'discount',
            'discountAmount' => 'discount_amount',
            'total' => 'total',
            'notes' => 'notes',
            'status' => 'status'
        ];

        foreach ($mapping as $key => $column) {
            if (array_key_exists($key, $input)) {
                $fields[] = "$column = ?";
                $val = $input[$key];
                if ($key === 'items') $val = json_encode($val);
                $params[] = $val;
            }
        }

        if (count($fields) > 0) {
            $params[] = $id;
            $sql = "UPDATE wazir_quotations SET " . implode(", ", $fields) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            echo json_encode(["success" => true, "message" => "Quotation updated successfully"]);
        } else {
            echo json_encode(["success" => true, "message" => "No changes detected"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to update quotation: " . $e->getMessage()]);
    }
}

function handleDeleteQuotation($pdo) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    try {
        $stmt = $pdo->prepare("DELETE FROM wazir_quotations WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true, "message" => "Quotation removed"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to delete quotation: " . $e->getMessage()]);
    }
}
