<?php
    header("Cache-Control: no-cache");
    header("Content-type: text/html");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Environment Variables</title>
    </head>
    <body>
        <h1 align="center">Environment Variables</h1>
        <hr>
        <?php
            //getenv() without any arguments returns all of the 
            //$env_array = getenv();
            // $_ENV and getenv() is different from $_SERVER

            foreach ($_SERVER as $key=>$value) {
                // nl2br replaces \n with HTML line breaks <br>
                print nl2br("<b>" . $key . ":</b> " . $value . "\n");
            }
        ?>
    </body>
</html>