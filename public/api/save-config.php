<?php
// API: Save Configuration (Admin only)
session_start();
header('Content-Type: application/json');

// Check if user is authenticated (basic check)
if (!isset($_SESSION['admin_authenticated']) || $_SESSION['admin_authenticated'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['config'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No configuration provided']);
    exit;
}

// Basic validation of configuration structure
$config = $data['config'];
if (!isset($config['global']) || !isset($config['apps']) || !is_array($config['apps'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid configuration structure']);
    exit;
}

$configPath = __DIR__ . '/../../data/config.json';

// Backup current config
if (file_exists($configPath)) {
    $backupPath = __DIR__ . '/../../data/config.backup.' . time() . '.json';
    copy($configPath, $backupPath);
}

// Save new config
$result = file_put_contents($configPath, json_encode($data['config'], JSON_PRETTY_PRINT));

if ($result === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to save configuration']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Configuration saved successfully']);
