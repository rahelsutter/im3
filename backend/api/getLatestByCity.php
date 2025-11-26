<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept");

require_once '../config.php';
header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $city = $_GET['city'];
    
    // Holt den neuesten Eintrag für die Stadt
    $sql = "SELECT * FROM im3_air_pollution WHERE city = :city ORDER BY timestamp DESC LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['city' => $city]);
    $result = $stmt->fetch();
    
    echo json_encode($result);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
