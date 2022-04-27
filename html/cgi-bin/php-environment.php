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
            //getenv() without any arguments returns all of them
            $env_array = getenv();

            foreach ($env_array as $key=>$value) {
                print "<b>" . $key . ":</b>" . $value;
            }
        ?>
    </body>
</html>