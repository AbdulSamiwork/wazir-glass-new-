<?php
/**
 * Cloudinary API Configuration
 * Cloud Name: topin8es
 * Key Name: wazir
 */

require_once __DIR__ . '/env.php';

return [
    'cloud_name' => env('CLOUDINARY_CLOUD_NAME', 'topin8es'),
    'api_key'    => env('CLOUDINARY_API_KEY', '492248647196671'),
    'api_secret' => env('CLOUDINARY_API_SECRET', 'uPuAc1pPRfFZZ55UJV_Ffzbo3xA'),
    'folder'     => env('CLOUDINARY_FOLDER', 'wazir'),
    'secure'     => true
];
