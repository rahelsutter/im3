<?php

$data = include('01_extract.php');

$transformed_data = [];
foreach($data as $key => $value) {
    $transformed_data[] = [
        'city' => $key,
        'time' => $value['current']['time'],
        'uv_index' => $value['current']['uv_index'],
        'pm2_5' => $value['current']['pm2_5'],
        'carbon_monoxide' => $value['current']['carbon_monoxide'],
        'nitrogen_dioxide' => $value['current']['nitrogen_dioxide'],
        'dust' => $value['current']['dust'],
        'alder_pollen' => $value['current']['alder_pollen'],
        'birch_pollen' => $value['current']['birch_pollen'],
        'grass_pollen' => $value['current']['grass_pollen'],
        'mugwort_pollen' => $value['current']['mugwort_pollen'],
        'olive_pollen' => $value['current']['olive_pollen'],
        'ragweed_pollen' => $value['current']['ragweed_pollen'],
    ];
};

return $transformed_data; 

