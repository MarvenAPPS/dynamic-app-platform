<?php
// API: Track Analytics Events
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Log directory
$logDir = __DIR__ . '/../../data/logs';
if (!is_dir($logDir)) {
    mkdir($logDir, 0755, true);
}

// Anonymize IP address (GDPR compliance)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if ($ip !== 'unknown' && filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
    // Mask last octet for IPv4
    $ip = preg_replace('/\.\d+$/', '.0', $ip);
} elseif ($ip !== 'unknown' && filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) {
    // Mask last 80 bits for IPv6
    $ip = preg_replace('/:[^:]+:[^:]+:[^:]+:[^:]+$/', '::0', $ip);
}

// Create log entry
$logEntry = [
    'timestamp' => date('Y-m-d H:i:s'),
    'ip' => $ip,
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    'event' => $data['event'] ?? 'unknown',
    'session_id' => $data['session_id'] ?? 'unknown',
    'visitor_id' => $data['visitor_id'] ?? 'unknown',
    'data' => $data['data'] ?? []
];

// Write to daily log file
$logFile = $logDir . '/analytics-' . date('Y-m-d') . '.log';
file_put_contents($logFile, json_encode($logEntry) . "\n", FILE_APPEND);

echo json_encode(['success' => true]);
