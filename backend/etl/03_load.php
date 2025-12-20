<?php

$data = include('02_transform.php');

require_once '../config.php';

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "INSERT INTO im3_air_pollution (uv_index, pm2_5, nitrogen_dioxide, carbon_monoxide, alder_pollen, birch_pollen, grass_pollen, mugwort_pollen, olive_pollen, ragweed_pollen, dust, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // $sql = diese Werte müssen in meine Datenbank rein -> Insert into = Name Tabelle (Achtung Rechtschreibung!!) ? = Sicherheit
    $stmt = $pdo->prepare($sql); // schickt Info an Datenbank //

    // Fügt jedes Element im Array in die Datenbank ein
    foreach($data as $key => $value) {
        $stmt->execute([
            $value['uv_index'],
            $value['pm2_5'],
            $value['nitrogen_dioxide'],
            $value['carbon_monoxide'],
            $value['alder_pollen'],
            $value['birch_pollen'],
            $value['grass_pollen'],
            $value['mugwort_pollen'],
            $value['olive_pollen'],
            $value['ragweed_pollen'],
            $value['dust'],
            $value['city']
        ]);
    }

        echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}


/* Intervall planen -> Infomaniak, Web & Domains, Hosting, auf mein Web-Hosting
Web, Aufgabenplaner, Aufgaben, neue Aufgabe hinzufügen, Name egal (im3)
Wichtig: "Aufgabe aktivieren" -> Häckchen setzen
korrekte URL angeben -> im3.uv-index-usa.com, backend/etl/03_load.php
Häufigkeit anpassen: täglich wählen, stündlich auswählen bei 2. Kachel, danach 0
E-Mail-Benachrichtigung zur Kontrolle ob es funktioniert */