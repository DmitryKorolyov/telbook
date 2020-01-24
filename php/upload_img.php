<?php
$file = '../img/'.$_GET["number"].'.jpg';
$image = file_get_contents($file);
header("Content-type: image/jpeg");


echo base64_encode ($image);
?>