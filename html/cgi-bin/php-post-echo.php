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
            // STDIN is an "already-open stream to php://input"
            $entityBody = stream_get_contents(STDIN);

            print "<b>Message Body:</b>" . $entityBody . "<br />\n";

        ?>
    </body>
</html>