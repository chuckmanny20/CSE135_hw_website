<?php
    header("Cache-Control: no-cache");
    header("Content-type: text/html");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>GET Request Echo</title>
    </head>
    <body>
        <h1 align="center">GET Request Echo</h1>
        <hr>
        <?php
            # The Query String is simply an environment variable
            print "<b>Query String:</b>" . $_SERVER["QUERY_STRING"] . "<br />\n";

            $query = $_SERVER["QUERY_STRING"];

            # parses query string into $output as a Associative Array
            parse_str($query, $output);

            #Print out the Query String's key + value pairs
            foreach ($output as $key => $value) {
                print $key . " = " . $value . "<br/>\n";
            }
        ?>
    </body>
</html>