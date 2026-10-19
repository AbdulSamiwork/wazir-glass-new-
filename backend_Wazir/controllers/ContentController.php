<?php
/**
 * Content Controller
 * Coordinates GET and POST requests for dynamic website content with high-speed server caching.
 */

require_once __DIR__ . '/ContentReader.php';
require_once __DIR__ . '/ContentWriter.php';

const CONTENT_CACHE_FILE = __DIR__ . '/../cache/site_content_cache.json';

function handleGetContent($pdo) {
    $bypassCache = isset($_GET['nocache']) || isset($_GET['refresh']);

    // 1. Fast Cache Hit Path (< 10ms response time)
    if (!$bypassCache && file_exists(CONTENT_CACHE_FILE) && (filesize(CONTENT_CACHE_FILE) > 100)) {
        header("X-Cache: HIT");
        header("Cache-Control: public, max-age=60");
        readfile(CONTENT_CACHE_FILE);
        exit;
    }

    // 2. Cache Miss / Refresh Path
    try {
        $siteData = getDatabaseContent($pdo);
        $json = json_encode($siteData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        // Atomically write cache file
        @file_put_contents(CONTENT_CACHE_FILE, $json, LOCK_EX);

        header("X-Cache: MISS");
        header("Cache-Control: public, max-age=60");
        echo $json;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to read database rows: " . $e->getMessage()]);
    }
}

function handleSaveContent($pdo) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
    }

    $raw_json = file_get_contents("php://input");
    $decoded = json_decode($raw_json, true);

    if ($decoded === null) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON payload"]);
        exit;
    }

    try {
        $pdo->beginTransaction();
        saveDatabaseContent($pdo, $decoded);
        $pdo->commit();

        // Invalidate and immediately pre-warm cache file
        try {
            $updatedData = getDatabaseContent($pdo);
            $cacheJson = json_encode($updatedData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            @file_put_contents(CONTENT_CACHE_FILE, $cacheJson, LOCK_EX);
        } catch (Exception $ce) {
            @unlink(CONTENT_CACHE_FILE);
        }

        echo json_encode([
            "success" => true,
            "message" => "Database updated and cache regenerated successfully"
        ]);
    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(["error" => "Transaction failed: " . $e->getMessage()]);
    }
}
