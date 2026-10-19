<?php
/**
 * Upload Controller
 * Integrates Cloudinary API for cloud-hosted media storage.
 * Cloud Name: topin8es | Folder: wazir
 */

function handleUpload($pdo) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
    }

    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(["error" => "No file uploaded or file upload error"]);
        exit;
    }

    $file = $_FILES['image'];
    $fileName = $file['name'];
    $fileSize = $file['size'];
    $fileTmpName = $file['tmp_name'];

    $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'];

    if (!in_array($ext, $allowed)) {
        http_response_code(400);
        echo json_encode(["error" => "Unsupported format. Allowed: JPG, PNG, GIF, WEBP, SVG, AVIF"]);
        exit;
    }

    $mime_type = mime_content_type($fileTmpName);
    if (strpos($mime_type, 'image/') !== 0 && $ext !== 'svg') {
        http_response_code(400);
        echo json_encode(["error" => "Uploaded file is not a valid image"]);
        exit;
    }

    if ($fileSize > 15 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(["error" => "File size exceeds limit of 15MB"]);
        exit;
    }

    // Load Cloudinary credentials
    $configPath = __DIR__ . '/../config/cloudinary.php';
    if (!file_exists($configPath)) {
        http_response_code(500);
        echo json_encode(["error" => "Cloudinary configuration file missing"]);
        exit;
    }

    $config = require $configPath;
    $cloud_name = $config['cloud_name'] ?? 'topin8es';
    $api_key = $config['api_key'] ?? '';
    $api_secret = $config['api_secret'] ?? '';
    $folder = $config['folder'] ?? 'wazir';

    $timestamp = time();
    $params = [
        'folder'    => $folder,
        'timestamp' => $timestamp
    ];
    ksort($params);

    $to_sign = '';
    foreach ($params as $k => $v) {
        $to_sign .= $k . '=' . $v . '&';
    }
    $to_sign = rtrim($to_sign, '&') . $api_secret;
    $signature = sha1($to_sign);

    $cfile = new CURLFile($fileTmpName, $mime_type, $fileName);
    $post_fields = [
        'file'      => $cfile,
        'api_key'   => $api_key,
        'timestamp' => $timestamp,
        'signature' => $signature,
        'folder'    => $folder
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.cloudinary.com/v1_1/{$cloud_name}/image/upload");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($response && $http_code >= 200 && $http_code < 300) {
        $resData = json_decode($response, true);
        if (isset($resData['secure_url'])) {
            echo json_encode([
                "success"   => true,
                "url"       => $resData['secure_url'],
                "public_id" => $resData['public_id'] ?? '',
                "format"    => $resData['format'] ?? '',
                "width"     => $resData['width'] ?? null,
                "height"    => $resData['height'] ?? null,
                "message"   => "Image uploaded successfully to Cloudinary"
            ]);
            exit;
        }
    }

    // Local Storage Fallback if Cloudinary is unreachable
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $script_dir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
    $web_upload_prefix = $protocol . "://" . $host . ($script_dir === '/' ? '' : $script_dir) . '/uploads/';
    $upload_dir = __DIR__ . '/../uploads/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $new_filename = uniqid('wazir_') . '.' . $ext;
    if (move_uploaded_file($fileTmpName, $upload_dir . $new_filename)) {
        echo json_encode([
            "success"  => true,
            "url"      => $web_upload_prefix . $new_filename,
            "fallback" => true,
            "message"  => "Cloudinary upload unavialable (" . ($curl_error ?: "HTTP $http_code") . "). Saved to local server."
        ]);
        exit;
    }

    http_response_code(500);
    echo json_encode(["error" => "Upload failed: " . ($curl_error ?: "Cloudinary error HTTP $http_code")]);
}
