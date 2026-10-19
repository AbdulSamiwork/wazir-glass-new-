<?php
/**
 * Safe Error Handler
 * Logs raw internal exception details to server logs and returns clean, sanitized client messages.
 */

function sendServerError($e, $defaultMsg = "An unexpected server error occurred. Please try again.") {
    $errInfo = "[SERVER_ERROR] " . ($e instanceof Throwable ? ($e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine()) : (string)$e);
    error_log($errInfo);

    http_response_code(500);
    $isDebug = defined('APP_DEBUG') && (APP_DEBUG === true || APP_DEBUG === 'true');

    echo json_encode([
        "success" => false,
        "error"   => ($isDebug && $e instanceof Throwable) ? ($defaultMsg . " (" . $e->getMessage() . ")") : $defaultMsg
    ]);
    exit;
}
