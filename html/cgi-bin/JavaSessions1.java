import java.util.Scanner;

public class JavaSessions1 {
    public static void main(String[] args) {
        System.out.print("Cache-Control: no-cache\n");

        // Get Name from Environment
        Scanner sc = new Scanner(System.in);
        String username = String.format("%1000s", sc.next());
        sc.close();

        // Check to see if a proper name was sent
        String name = "";
        if (username.charAt(0) == 'u')
            name = username + 9;

        // Set the cookie using a header, add extra \n to end headers
        if (name.length() > 0) {
            System.out.print("Content-type: text/html\n");
            System.out.printf("Set-Cookie: %s\n\n", name);
        } else
            System.out.print("Content-type: text/html\n\n");

        // Body - HTML
        System.out.print("<html>");
        System.out.print("<head><title>Java Sessions</title></head>\n");
        System.out.print("<body>");
        System.out.print("<h1>Java Sessions Page 1</h1>");
        System.out.print("<table>");

        // First check for new Cookie, then Check for old Cookie
        if (name.length() > 0)
            System.out.printf("<tr><td>Cookie:</td><td>%s</td></tr>\n", name);
        else if (System.getenv("HTTP_COOKIE") != null && System.getenv("HTTP_COOKIE").equals("destroyed"))
            System.out.printf("<tr><td>Cookie:</td><td>%s</td></tr>\n", System.getenv("HTTP_COOKIE"));
        else
            System.out.print("<tr><td>Cookie:</td><td>None</td></tr>\n");

        System.out.print("</table>");

        // Links for other pages
        System.out.print("<br />");
        System.out.print("<a href=\"/cgi-bin/java-sessions-2.cgi\">Session Page 2</a>");
        System.out.print("<br />");
        System.out.print("<a href=\"/java-cgiform.html\">Java CGI Form</a>");
        System.out.print("<br /><br />");

        // Destroy Cookie button
        System.out.print("<form action=\"/cgi-bin/java-destroy-session.cgi\" method=\"get\">");
        System.out.print("<button type=\"submit\">Destroy Session</button>");
        System.out.print("</form>");

        System.out.print("</body>");
        System.out.print("</html>");
    }
}
