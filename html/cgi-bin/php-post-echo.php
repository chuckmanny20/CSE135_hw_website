<?php
    header("Cache-Control: no-cache");
    header("Content-type: text/html");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Post Request Echo</title>
    </head>
    <body>
        <h1 align="center">Post Request Echo</h1>
        <hr>
        <?php
            // To access body of POST or PUT or whatever
            $entityBody = file_get_contents('php://input');

            print "<b>Message Body:</b>" . $entityBody . "<br />\n";

        ?>
    </body>
</html>