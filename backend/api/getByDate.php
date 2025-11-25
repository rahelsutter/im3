<?php
require_once '../config.php';
header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    $date = $_GET['date']; // Format: YYYY-MM-DD
    $time = $_GET['time']; // Format: HH:00:00
    $city = $_GET['city'];

    // Stunde extrahieren
    $hour = intval(substr($time, 0, 2));

    // SQL-Abfrage: alle Einträge aus dem gewünschten Tag und der gewünschten Stunde
    $sql = "SELECT * FROM im3_air_pollution WHERE city = :city AND DATE(timestamp) = :date AND HOUR(timestamp) = :hour";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'city' => $city,
        'date' => $date,
        'hour' => $hour
    ]);

    $results = $stmt->fetchAll();
    echo json_encode($results);

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
?>

