public class JavaSessions2 {
    public static void main(String[] args) {
        // Headers
        System.out.print("Cache-Control: no-cache\n");
        System.out.print("Content-type: text/html\n\n");

        // Body - HTML
        System.out.print("<html>");
        System.out.print("<head><title>Java Sessions</title></head>\n");
        System.out.print("<body>");
        System.out.print("<h1>Java Sessions Page 2</h1>");
        System.out.print("<table>");

        if (System.getenv("HTTP_COOKIE") != null && System.getenv("HTTP_COOKIE").equals("destroyed"))
            System.out.printf("<tr><td>Cookie:</td><td>%s</td></tr>\n", System.getenv("HTTP_COOKIE"));
        else
            System.out.print("<tr><td>Cookie:</td><td>None</td></tr>\n");
        
        System.out.print("</table>");

        // Links for other pages
        System.out.print("<br />");
        System.out.print("<a href=\"/cgi-bin/java-sessions-1.cgi\">Session Page 1</a>");
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
