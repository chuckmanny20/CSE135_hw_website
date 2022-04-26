import java.util.Calendar;

public class JavaHelloHtmlWorld {
    public static void main(String[] args) {
        Calendar calendar = Calendar.getInstance();

        System.out.print("Cache-Control: no-cache\n");
        System.out.print("Content-type: text/html\n\n");
        System.out.print(
                "<html><head><title>Hello CGI World</title></head>" + "\t" +
                        "<body><h1 align=center>Hello HTML World</h1>" + "\t" +
                        "<hr/>\n");

        System.out.print("Hello World<br/>\n");
        System.out.print("This program was generated at: " + calendar.getTime() + "\n\n<br/>");
        System.out.print("Your current IP address is: " + System.getenv("REMOTE_ADDR") + "<br/>");

        // Print HTML footer
        System.out.print("</body></html>");
    }
}
