<?php
    header("Cache-Control: no-cache");
    header("Content-type: text/html");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>PHP Sessioning Page 2</title>
    </head>
    <body>
        <h1>PHP Sessions Page 2</h1>
        <?php
            session_name("ZhaoXingID");
            session_start();

            $user = $_SESSION['username'];

            // Check to see if a proper name was sent
            // Skips "username=____" to just get the "____"
            if ($user[0] == 'u')
            {
                $user = substr($user, 9);
            }

            print("<table>");

            // First check for new Cookie, then Check for old Cookie
            if (strlen($user) > 0)
            {
                print "<tr><td>Cookie:</td><td>" . $user . "</td></tr>\n";
            }
            else if ($_SESSION["HTTP_COOKIE"] != NULL && strcmp($_SESSION["HTTP_COOKIE"], "destroyed"))
            {
                print "<tr><td>Cookie:</td><td>%s</td></tr>\n" . $_SESSION["HTTP_COOKIE"];
            }
            else
            {
                print "<tr><td>Cookie:</td><td>None</td></tr>\n";
            }

            print "</table>";
        ?>
        <br />
        <a href="/cgi-bin/php-sessions-2.php\">Session Page 2</a>
        <br />
        <a href="/php-cgiform.html\">PHP CGI Form</a>
        <br /><br />

        <form action="/cgi-bin/php-destroy-session.php\" method="get\">
            <button type="submit\">Destroy Session</button>
        </form>
    </body>
</html>