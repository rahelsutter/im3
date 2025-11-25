<?php
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
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
?>
