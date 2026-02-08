<?php
// API: Get Configuration
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$configPath = __DIR__ . '/../../data/config.json';

if (!file_exists($configPath)) {
    echo json_encode([
        'success' => false,
        'error' => 'Configuration file not found'
    ]);
    exit;
}

$config = file_get_contents($configPath);
$configData = json_decode($config, true);

if ($configData === null) {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid configuration file'
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'data' => $configData
]);
