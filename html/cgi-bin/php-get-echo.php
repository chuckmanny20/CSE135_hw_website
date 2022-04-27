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
            print "<b>Query String:</b>" . $_SERVER['QUERY_STRING'] . "<br />\n";

            $query = $_SERVER['QUERY_STRING'];
            $length = strlen($query);

            $in = [];

            # Credit for this code to parse the Query string:
            # https://www.mediacollege.com/internet/perl/query-string.html
            if ( $length > 0) {
                $buffer = $_SERVER['QUERY_STRING'];
                $array = explode("&", $buffer);
                foreach ($pair as $array) {
                    $pieces = explode("=", $pair);
                    $name = $pieces[0];
                    $value = $pieces[1];

                    $in += array($name => $value);
                }
            }

            #Print out the Query String
            $loop = 0;
            foreach ($in as $name => $value) {
                $loop += 1;
                if($loop % 2 != 0) {
                    print "$key = $in{$key}<br/>\n";
                }
            }
        ?>
    </body>
</html>