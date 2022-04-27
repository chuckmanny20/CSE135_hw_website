// import java.util.Calendar;

public class JavaHelloHtmlWorld {
    public static void main(String[] args) {
        // Calendar calendar = Calendar.getInstance();

        System.out.print("Cache-Control: no-cache\n");
        System.out.print("Content-type:text/html\r\n\r\n");


        System.out.println("<html>");
        System.out.println("<head>");
        System.out.println("<title>Hello, Java!</title>");
        System.out.println("</head>");
        System.out.println("<body>");
        System.out.println("<h1 align=center>Hello HTML World</h1>");

        // System.out.print("Chang Liu was here! - Hello, Java!<br/>\n");
        // System.out.print("This program was generated at: " + calendar.getTime() + "\n\n<br/>");
        // System.out.print("Your current IP address is: " + System.getenv("REMOTE_ADDR") + "<br/>");

        // Print HTML footer
        System.out.println("</body>");
        System.out.println("</html>");
    }
}
