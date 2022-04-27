<?php
    header("Cache-Control: no-cache");
    header("Content-type: text/html");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>PHP Session Destroyed</title>
    </head>
    <body>
        <h1>Session Destroyed</h1>
        <?php
            session_name("ZhaoXingID");
            // Make cookie last a day
            session_start([
                'cookie_lifetime' => 86400,
            ]);

            session_destroy();

        ?>

        <a href="/php-cgiform.html">Back to the PHP CGI Form</a><br />
        <a href="/cgi-bin/php-sessions-1.php">Back to Page 1</a><br />
        <a href="/cgi-bin/php-sessions-2.php">Back to Page 2</a>
        
    </body>
</html>