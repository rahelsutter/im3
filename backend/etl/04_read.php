<?php

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once '../config.php';

$city = $_GET['city'];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "SELECT * FROM im3_air_pollution WHERE city = ? ORDER BY timestamp DESC LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$city]);
    $values = $stmt->fetch();

    print json_encode($values);

} catch (PDOException $e) {

    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}