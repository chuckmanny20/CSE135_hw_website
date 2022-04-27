// import java.util.Calendar;

public class JavaHelloHtmlWorld {
    public static void main(String[] args) {
        // Calendar calendar = Calendar.getInstance();

        System.out.print("Cache-Control: no-cache\n");
        System.out.print("Content-type: text/html\r\n\r\n");

        System.out.println("<html><head>");
        System.out.println("<title>Hello, Java!</title></head>" + 
                        "<body><h1 align=center>Hello HTML World</h1>" +
                        "<hr/>");

        // System.out.print("Chang Liu was here! - Hello, Java!<br/>\n");
        // System.out.print("This program was generated at: " + calendar.getTime() + "\n\n<br/>");
        // System.out.print("Your current IP address is: " + System.getenv("REMOTE_ADDR") + "<br/>");

        // Print HTML footer
        System.out.print("</body></html>");
    }
}
