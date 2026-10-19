<?php
/**
 * Rate Limiter Service
 * Protects login and public endpoints against brute-force attacks and abuse.
 */

class RateLimiter {
    /**
     * Checks if IP or username has exceeded maximum failed login attempts.
     */
    public static function checkLoginAttempts($pdo, $ip, $username = '', $maxAttempts = 5, $windowMinutes = 15) {
        try {
            // Clean up stale attempts older than window
            $cleanup = $pdo->prepare("DELETE FROM wazir_login_attempts WHERE attempt_time < (NOW() - INTERVAL ? MINUTE)");
            $cleanup->execute([$windowMinutes]);

            // Query failed attempts by IP in current window
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM wazir_login_attempts WHERE ip_address = ? AND attempt_time >= (NOW() - INTERVAL ? MINUTE)");
            $stmt->execute([$ip, $windowMinutes]);
            $ipAttempts = (int)$stmt->fetchColumn();

            if ($ipAttempts >= $maxAttempts) {
                return [
                    'allowed'     => false,
                    'remaining'   => 0,
                    'retry_after' => $windowMinutes,
                    'error'       => "Too many failed login attempts. Access temporarily locked for {$windowMinutes} minutes."
                ];
            }

            return [
                'allowed'   => true,
                'remaining' => max(0, $maxAttempts - $ipAttempts)
            ];
        } catch (Exception $e) {
            // Fail open on database error to avoid blocking valid traffic
            return ['allowed' => true, 'remaining' => $maxAttempts];
        }
    }

    /**
     * Records a failed login attempt.
     */
    public static function recordFailedAttempt($pdo, $ip, $username = '') {
        try {
            $stmt = $pdo->prepare("INSERT INTO wazir_login_attempts (ip_address, username, attempt_time) VALUES (?, ?, NOW())");
            $stmt->execute([$ip, substr($username, 0, 100)]);
        } catch (Exception $e) {}
    }

    /**
     * Clears failed attempts after successful authentication.
     */
    public static function clearFailedAttempts($pdo, $ip, $username = '') {
        try {
            $stmt = $pdo->prepare("DELETE FROM wazir_login_attempts WHERE ip_address = ? OR (username != '' AND username = ?)");
            $stmt->execute([$ip, $username]);
        } catch (Exception $e) {}
    }
}
