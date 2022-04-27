<?php
    header("Cache-Control: no-cache");
    header("Content-type: text/json");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Hello, PHP! (JSON)</title>
    </head>
    <body>
        <?php
            $message = "This page was generated with the PHP scripting langauge";
            $date = date('l jS \of F Y h:i:s A');
            $address = $_SERVER{REMOTE_ADDR};

            $json_array = array("message"=>$message, "date"=>$date, "IP"=>$address);
        
            $json_object = json_encode($json_array);
        
            print "<p>" . $json_object . "</p>";
        ?>
    </body>
</html>


