<?php

for ($i = 0; $i < 11; $i++){
    $curl = curl_init();
    $url = 'https://hdfat7b8eg.execute-api.us-west-2.amazonaws.com/prod/external/v1/bulk-communities?page=' . ($i + 1);

    curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
      CURLOPT_HTTPHEADER => array(
      'x-wg-api-key: bee91269c9c29e898d473bf285284ff1'
      ),
    ));
    
    $response = curl_exec($curl);
    $data = json_decode($response,true);
    $lands = $data;
    $buildings = [];
    
    
    for($y = 0; $y < 10; $y++){
        foreach ($lands[$y]["lands"] as $item){
            if($item["building"] !== null){
                print_r($item["building"]);
                array_push($buildings, $item);    
            }
        }
    }
    

    
    $buildings = json_encode($buildings);
    
    file_put_contents("page" . ($i + 1) . ".json", $buildings);
    curl_close($curl);
}

//reset buildings array
$buildings = [];

//create singular json file with structures
for ($x = 0; $x < 11; $x++){
    $data = file_get_contents("page" . ($x + 1) . ".json");
    $data = json_decode($data,true);
    foreach($data as $item){
        $item['building']['community'] = $item['communityId'];
        array_push($buildings, $item);
    }
}

$buildings = json_encode($buildings);
file_put_contents("wg_data.json", $buildings);

date_default_timezone_set('America/New_York');
$date = date('m/d/Y h:i:s a', time());
file_put_contents("cron_log.txt", $date);



