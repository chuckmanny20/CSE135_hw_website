public class JavaDestroySession {
    public static void main(String[] args) {
        // Headers
        System.out.print("Cache-Control: no-cache\n");
        System.out.print("Set-Cookie: destroyed\n");
        System.out.print("Content-type: text/html\n\n");

        // Body - HTML
        System.out.print("<html>");
        System.out.print("<head><title>Java Session Destroyed</title></head>");
        System.out.print("<body>");
        System.out.print("<h1>Java Session Destroyed</h1>");

        // Links
        System.out.print("<a href=\"/cgi-bin/java-sessions-1.cgi\">Back to Page 1</a>");
        System.out.print("<br />");
        System.out.print("<a href=\"/cgi-bin/java-sessions-2.cgi\">Back to Page 2</a>");
        System.out.print("<br />");
        System.out.print("<a href=\"/java-cgiform.html\">Java CGI Form</a>");

        System.out.print("</body>");
        System.out.print("</html>");
    }
}
