<?php
    header("Cache-Control: no-cache");
    header("Content-type: text/html");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Hello, PHP!</title>
    </head>
    <body>
        <?php
            print "<h1>Liam was here - Hello, Perl!</h1>";
            print "<p>This page was generated with the Perl programming langauge</p>";
            
            date_default_timezone_set('UTC');

            print "<p>Current Time:" . date('l jS \of F Y h:i:s A') . "</p>";
            
            # IP Address is an environment variable when using CGI
            $address = $_SERVER{REMOTE_ADDR};
            print "<p>Your IP Address: $address</p>";
        ?>
    </body>
</html>