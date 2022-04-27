<?php
    header("Cache-Control: no-cache");
    header("Content-type: text/html");

    $message = "This page was generated with the PHP scripting langauge"
    $date = date('l jS \of F Y h:i:s A');
    $address = $_SERVER{REMOTE_ADDR};

    $json_object = json_encode(string $message, mixed $date, mixed $address);

    print "$json_object";
?>

