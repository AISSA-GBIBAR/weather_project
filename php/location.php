<?php

$ip = file_get_contents("https://api.ipify.org");
$apikey = "a79ea474652c4f998238027d1e5a4033";

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.ipgeolocation.io/ipgeo?apiKey=$apikey&ip=$ip");

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$output = curl_exec($ch);

echo "<pre>";
print_r($output);
echo "</pre>";

curl_close($ch);

