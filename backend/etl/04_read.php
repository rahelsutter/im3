<?php

// ---- CORS-Freigabe für dein lokales Test-Origin ----
header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // oder "*" für „alle“
header("Access-Control-Allow-Methods: GET, OPTIONS");          // was dein Frontend braucht
header("Access-Control-Allow-Headers: Content-Type");          // falls nötig

// bei Preflight-Anfragen (OPTIONS) sofort antworten
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // leer, aber OK
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

    // Todo: Was tun, wenns keine Resultate gibt?
    print json_encode($values);

} catch (PDOException $e) {

    // Todo: Ist kein JSON. Was geschieht im Frontend?
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}