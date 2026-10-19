<?php
/**
 * Environment Variables Loader
 * Loads .env key-value pairs safely into getenv(), $_ENV, and $_SERVER.
 */

function loadEnvFile($envPath = null) {
    if ($envPath === null) {
        $envPath = __DIR__ . '/../.env';
    }

    if (!file_exists($envPath) || !is_readable($envPath)) {
        return false;
    }

    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        // Ignore comments and blank lines
        if ($line === '' || strpos($line, '#') === 0) {
            continue;
        }

        if (strpos($line, '=') !== false) {
            list($key, $val) = explode('=', $line, 2);
            $key = trim($key);
            $val = trim($val);

            // Strip enclosing quotes
            if (
                (strlen($val) >= 2) &&
                (($val[0] === '"' && substr($val, -1) === '"') ||
                 ($val[0] === "'" && substr($val, -1) === "'"))
            ) {
                $val = substr($val, 1, -1);
            }

            putenv("{$key}={$val}");
            $_ENV[$key] = $val;
            $_SERVER[$key] = $val;
        }
    }
    return true;
}

if (!function_exists('env')) {
    function env($key, $default = null) {
        $val = getenv($key);
        if ($val === false) {
            $val = $_ENV[$key] ?? $_SERVER[$key] ?? $default;
        }
        return ($val !== false && $val !== null) ? $val : $default;
    }
}

// Auto-load once on include
loadEnvFile();

if (!defined('APP_DEBUG')) {
    define('APP_DEBUG', env('APP_DEBUG', false));
}
