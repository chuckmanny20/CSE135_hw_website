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
            //getenv() without any arguments returns all of them
            $env_array = getenv();

            foreach ($env_array as $key=>$value) {
                print "<b>" . $key . ":</b>" . $value . "\n";
            }
        ?>
    </body>
</html>