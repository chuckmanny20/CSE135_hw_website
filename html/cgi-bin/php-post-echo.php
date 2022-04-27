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
            // Initially tried stream_get_contents(STDIN); but this stays open and the request was still visible
            // in the network tab until I closed the tab. Wasn't even grabbing the body anyways
            $entityBody = file_get_contents('php://input');

            print "<b>Message Body:</b>" . $entityBody . "<br />\n";

        ?>
    </body>
</html>