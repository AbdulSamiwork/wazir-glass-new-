<?php
/**
 * Wazir Glass & Aluminium - Modular Backend Router
 * Dispatches requests to dedicated controllers with enterprise token security and rate limiting.
 */

// 1. CORS & Origin Whitelist Guard
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$allowed_origins = [
    'http://localhost',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1',
    'http://127.0.0.1:5173',
    'https://wazirglass.tech',
    'http://wazirglass.tech',
    'https://www.wazirglass.tech',
    'http://www.wazirglass.tech'
];

if (in_array($origin, $allowed_origins) || preg_match('/^https?:\/\/(.*?\.)?wazirglass\.(tech|com|pk)$/i', $origin)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
} elseif (empty($origin)) {
    // Direct or server-to-server request
} else {
    // Fallback: reflect the origin if legitimate web request or set header
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// 2. Strict HTTP Security Headers
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: SAMEORIGIN");
header("X-XSS-Protection: 1; mode=block");
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Permissions-Policy: camera=(), microphone=(), geolocation=()");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

header("Content-Type: application/json; charset=utf-8");

// 3. Load Core Configuration & Services
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/auth.php';
require_once __DIR__ . '/services/ErrorHandler.php';

// 4. Load Controllers
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/AdminController.php';
require_once __DIR__ . '/controllers/ContentController.php';
require_once __DIR__ . '/controllers/QuotationController.php';
require_once __DIR__ . '/controllers/BillController.php';
require_once __DIR__ . '/controllers/InquiryController.php';
require_once __DIR__ . '/controllers/TrackingController.php';
require_once __DIR__ . '/controllers/UploadController.php';

// 5. Action Route Security Guard
$action = isset($_GET['action']) ? $_GET['action'] : '';
$public_actions = ['login', 'get', 'track_order', 'submit_quote_request', 'logout'];

if (!in_array($action, $public_actions)) {
    if (!isAuthenticated($pdo)) {
        http_response_code(403);
        echo json_encode([
            "success" => false,
            "error"   => "403 Forbidden: Access Denied. Valid admin authentication token is required or session has expired."
        ]);
        exit;
    }
}

// 6. Request Dispatcher
switch ($action) {
    case 'login':                      handleLogin($pdo); break;
    case 'logout':                     handleLogout($pdo); break;
    case 'get':                        handleGetContent($pdo); break;
    case 'save':                       handleSaveContent($pdo); break;
    case 'update_credentials':         handleUpdateCredentials($pdo); break;
    case 'add_admin':                  handleAddAdmin($pdo); break;
    case 'get_admins':                 handleGetAdmins($pdo); break;
    case 'update_admin_by_super':      handleUpdateAdminBySuper($pdo); break;
    case 'delete_admin':               handleDeleteAdmin($pdo); break;
    case 'upload':                     handleUpload($pdo); break;
    case 'track_order':                handleTrackOrder($pdo); break;
    case 'submit_quote_request':       handleSubmitQuoteRequest($pdo); break;
    case 'get_quote_requests':         handleGetQuoteRequests($pdo); break;
    case 'delete_quote_request':       handleDeleteQuoteRequest($pdo); break;
    case 'update_quote_request_status':handleUpdateQuoteRequestStatus($pdo); break;
    case 'get_quotations':             handleGetQuotations($pdo); break;
    case 'create_quotation':           handleCreateQuotation($pdo); break;
    case 'update_quotation':           handleUpdateQuotation($pdo); break;
    case 'delete_quotation':           handleDeleteQuotation($pdo); break;
    case 'get_bills':                  handleGetBills($pdo); break;
    case 'create_bill':                handleCreateBill($pdo); break;
    case 'update_bill':                handleUpdateBill($pdo); break;
    case 'delete_bill':                handleDeleteBill($pdo); break;
    default:
        http_response_code(404);
        echo json_encode(["error" => "Action '$action' not found."]);
        break;
}
