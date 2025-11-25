<?php

// -> Datenbank Zugangsdaten einbinden
require_once '../config.php';

// -> json aktivieren
header('Content-Type: application/json');

// -> Verbindung mit der Datenbank
try {
    // -> Login auf Datenbank
    $pdo = new PDO($dsn, $username, $password, $options);

    $date = $_GET['date'];
    $city = $_GET['city'];

    //-> sql statement schreiben
  //  $sql = "SELECT * FROM im3_air_pollution WHERE DATE(timestamp) = :date AND city = :city";
    $date = $_GET['date']; // Format: YYYY-MM-DD
    $time = $_GET['time']; // Format: HH:00:00 (da stündlich)
    $city = $_GET['city'];

    // Kombiniere Datum und Zeit
$datetime = $date . ' ' . $time;

    $sql = "SELECT * FROM im3_air_pollution WHERE timestamp = :datetime AND city = :city";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['datetime' => $datetime, 'city' => $city]);
    $stmt = $pdo->prepare($sql);

    // -> sql statement ausführen
    $stmt->execute( ['date' => $date,'city' => $city ] );

    // -> daten in empfang nehmen
    $results = $stmt->fetchAll();

    //-> daten als json zurückgeben
    echo json_encode($results);

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
    }