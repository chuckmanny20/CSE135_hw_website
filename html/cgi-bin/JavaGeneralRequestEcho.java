import java.util.Scanner;

public class JavaGeneralRequestEcho {
    public static void main(String[] args) {
        // Print HTML header
        System.out.print("Cache-Control: no-cache\n");
        System.out.print("Content-type: text/html\n\n");
        System.out.print(
                "<html><head><title>General Request Echo</title></head> " + "\t" +
                        "<body><h1 align=center>General Request Echo</h1> " + "\t" +
                        "<hr/>\n");

        Scanner sc = new Scanner(System.in);
        // Get environment vars
        System.out.print("<table>\n");
        System.out.printf("<tr><td>Protocol:</td><td>%s</td></tr>\n", System.getenv("SERVER_PROTOCOL"));
        System.out.printf("<tr><td>Method:</td><td>%s</td></tr>\n", System.getenv("REQUEST_METHOD"));
        System.out.printf("<tr><td>Message Body:</td><td> %s</td></tr>\n", String.format("%1000s", sc.next()));
        sc.close();

        // Print HTML footer
        System.out.print("</body>");
        System.out.print("</html>");
    }
}
