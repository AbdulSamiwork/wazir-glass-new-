<?php
/**
 * Inquiry Controller
 * Manages public quote requests, lead status, and anti-spam rate limiting.
 */

function handleSubmitQuoteRequest($pdo) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
    }

    $input = json_decode(file_get_contents("php://input"), true);
    $name = isset($input['name']) ? trim($input['name']) : '';
    $phone = isset($input['phone']) ? trim($input['phone']) : '';
    $email = isset($input['email']) ? trim($input['email']) : '';
    $service_type = isset($input['service']) ? trim($input['service']) : (isset($input['serviceType']) ? trim($input['serviceType']) : '');
    $location = isset($input['location']) ? trim($input['location']) : '';
    $project_details = isset($input['message']) ? trim($input['message']) : (isset($input['projectDetails']) ? trim($input['projectDetails']) : '');

    if (empty($name) || empty($phone) || empty($service_type) || empty($project_details)) {
        http_response_code(400);
        echo json_encode(["error" => "Please fill out all required fields."]);
        exit;
    }

    $client_ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    try {
        $check_stmt = $pdo->prepare("SELECT COUNT(*) FROM wazir_quote_requests WHERE ip_address = ? AND created_at > NOW() - INTERVAL 1 HOUR");
        $check_stmt->execute([$client_ip]);
        if ($check_stmt->fetchColumn() >= 5) {
            http_response_code(429);
            echo json_encode(["error" => "Too many quote requests submitted from your IP. Please try again later or contact us directly on WhatsApp."]);
            exit;
        }
    } catch (Exception $e) {}

    try {
        $stmt = $pdo->prepare("INSERT INTO wazir_quote_requests (name, phone, email, service_type, location, project_details, status, ip_address) VALUES (?, ?, ?, ?, ?, ?, 'New', ?)");
        $stmt->execute([$name, $phone, $email, $service_type, $location, $project_details, $client_ip]);
        echo json_encode(["success" => true, "message" => "Quote request submitted successfully"]);
    } catch (PDOException $e) {
        sendServerError($e, "Quote request submission could not be processed at this moment.");
    }
}

function handleGetQuoteRequests($pdo) {
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
            $where .= " AND (name LIKE ? OR phone LIKE ? OR email LIKE ? OR service_type LIKE ? OR location LIKE ?)";
            $params = array_merge($params, ["%$search%", "%$search%", "%$search%", "%$search%", "%$search%"]);
        }
        if ($status !== 'all') {
            $where .= " AND status = ?";
            $params[] = $status;
        }

        // Count total matching records
        $countQuery = "SELECT COUNT(*) FROM wazir_quote_requests" . $where;
        $countStmt = $pdo->prepare($countQuery);
        $countStmt->execute($params);
        $totalRecords = intval($countStmt->fetchColumn());

        // Fetch paginated or full records
        $query = "SELECT * FROM wazir_quote_requests" . $where . " ORDER BY id DESC";
        if ($is_paginated) {
            $query .= " LIMIT " . intval($limit) . " OFFSET " . intval($offset);
        }

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($is_paginated) {
            echo json_encode([
                "data" => $requests,
                "pagination" => [
                    "total" => $totalRecords,
                    "page" => $page,
                    "limit" => $limit,
                    "totalPages" => ceil($totalRecords / $limit)
                ]
            ]);
        } else {
            echo json_encode($requests);
        }
    } catch (PDOException $e) {
        sendServerError($e, "Unable to load customer inquiries.");
    }
}

function handleDeleteQuoteRequest($pdo) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    try {
        $stmt = $pdo->prepare("DELETE FROM wazir_quote_requests WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true, "message" => "Inquiry deleted successfully"]);
    } catch (PDOException $e) {
        sendServerError($e, "Failed to delete inquiry.");
    }
}

function handleUpdateQuoteRequestStatus($pdo) {
    $id = isset($_POST['id']) ? intval($_POST['id']) : (isset($_GET['id']) ? intval($_GET['id']) : 0);
    $status = isset($_POST['status']) ? trim($_POST['status']) : (isset($_GET['status']) ? trim($_GET['status']) : 'New');
    try {
        $stmt = $pdo->prepare("UPDATE wazir_quote_requests SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        echo json_encode(["success" => true, "message" => "Lead status updated successfully"]);
    } catch (PDOException $e) {
        sendServerError($e, "Failed to update inquiry status.");
    }
}
