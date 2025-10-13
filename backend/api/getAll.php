<?php

// -> Datenbank Zugangsdaten einbinden
require_once '../config.php';

// -> json aktivieren
header('Content-Type: application/json');

// -> Verbindung mit der Datenbank
try {
    // -> Login auf Datenbank
    $pdo = new PDO($dsn, $username, $password, $options);

    //-> sql statement schreiben
    $sql = "SELECT * FROM im3_air_pollution";
    $stmt = $pdo->prepare($sql);

    // -> sql statement ausführen
    $stmt->execute();

    // -> daten in empfang nehmen
    $results = $stmt->fetchAll();

    //-> daten als json zurückgeben
    echo json_encode($results);

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
    }