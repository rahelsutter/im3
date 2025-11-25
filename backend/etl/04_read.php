<?php

require_once '../config.php';

// Todo: Diesen Wert validieren 
// z.B. ists eine erlaubte Stadt?
$city = $_GET['city'];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "SELECT * FROM im3_air_pollution WHERE city = ? ORDER BY timestamp DESC LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$city]);
    $values = $stmt->fetch();

    // Todo: Was tun, wenns keine Resultate gibt?
    print json_encode($values);

} catch (PDOException $e) {

    // Todo: Ist kein JSON. Was geschieht im Frontend?
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}