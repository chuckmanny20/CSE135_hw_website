public class JavaGetEcho {
    public static void main(String[] args) {
        // Print HTML header
        System.out.print("Cache-Control: no-cache\n");
        System.out.print("Content-type: text/html\n\n");
        System.out.print(
                "<html><head><title>GET query string</title></head>" + "\t" +
                        "<body><h1 align=center>GET query string</h1>" + "\t" +
                        "<hr/>\n");

        // Get and format query string
        System.out.print("Raw query string: %s\n<br/><br/>" + System.getenv("QUERY_STRING"));
        System.out.print("<table> Formatted Query String:");
        String query = System.getenv("QUERY_STRING");
        String tokens = query;
        for (String p : tokens.split("&\n")) {
            String[] vars = p.split("=");
            System.out.printf("<tr><td>%-8s:</td><td>%s</td></tr>\n", vars[0], vars[1]);;
        }

        System.out.print("</table>");

        // Print HTML footer
        System.out.print("</body>");
        System.out.print("</html>");
    }
}
