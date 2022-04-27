<?php
    header("Cache-Control: no-cache");
    header("Content-type: text/html");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>PHP Sessioning Page 1</title>
    </head>
    <body>
        <h1>C Sessions Page 1</h1>
        <?php
            session_name("ZhaoXingID");
            session_start();


            $_SESSION['username'] = file_get_contents('php://input');
            $user = $_SESSION['username'];

            // Check to see if a proper name was sent
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
        <a href="/cgi-bin/c-sessions-2.cgi\">Session Page 2</a>
        <br />
        <a href="/c-cgiform.html\">C CGI Form</a>
        <br /><br />

        // Destroy Cookie button
        <form action="/cgi-bin/c-destroy-session.cgi\" method="get\">
            <button type="submit\">Destroy Session</button>
        </form>
    </body>
</html>