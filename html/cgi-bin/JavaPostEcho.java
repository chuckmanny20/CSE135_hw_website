import java.util.Scanner;

public class JavaPostEcho {
    public static void main(String[] args, String[] envp) {
        // Print HTML header
        System.out.print("Cache-Control: no-cache\n");
        System.out.print("Content-type: text/html\n\n");
        System.out.print(
            "<html><head><title>POST Message Body</title></head>" + "\t" +
        "<body><h1 align=center>POST Message Body</h1>" + "\t" +
        "<hr/>\n");

        Scanner sc = new Scanner(System.in);
        System.out.printf("Message Body: %s\n<br/>", String.format("%1000s", sc.next()));
        sc.close();

        // Print HTML footer
        System.out.print("</body>");
        System.out.print("</html>");
    }
}
