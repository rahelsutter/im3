<?php

function fetchWeatherData($lat, $lon) {
    $url = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=" . $lat . "&longitude=" . $lon . "&current=pm2_5,carbon_monoxide,nitrogen_dioxide,dust,uv_index,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=auto&ref=freepublicapis.com&start_date=2025-09-23&end_date=2025-09-23";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true); //Holt Daten von API in PHP und gibt es als Json zurück//
}

$collection = [
    'bern' => fetchWeatherData(46.9481, 7.4474),
    'kairo' => fetchWeatherData(30.0444, 31.2357),
    'vancouver' => fetchWeatherData(49.2827, 123.1207),
    'rio_de_janeiro' => fetchWeatherData(22.9068, 43.1729),
    'shanghai' => fetchWeatherData(31.2304, 121.4737),
    'melbourne' => fetchWeatherData(37.8136, 144.9631)
];

/* echo '<pre>';
var_dump(fetchWeatherData(46.9481, 7.4474));
var_dump(fetchWeatherData(30.0444, 31.2357));
var_dump(fetchWeatherData(49.2827, 123.1207));
var_dump(fetchWeatherData(22.9068, 43.1729));
var_dump(fetchWeatherData(31.2304, 121.4737));
var_dump(fetchWeatherData(37.8136, 144.9631));
echo '</pre>'; */

return $collection;

?>