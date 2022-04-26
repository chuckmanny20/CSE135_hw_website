import java.util.Calendar;

public class JavaHelloJsonWorld {
    public static void main(String[] args) {
        Calendar calendar = Calendar.getInstance();
        System.out.print("Cache-Control: no-cache\r\n");
        System.out.print("Content-type: application/json\r\n\r\n");
        System.out.print("{\n\t\"message\": \"Hello World\",\n");
        System.out.print("\t\"date\": \"" + calendar.getTime() + "\",\n ");
        System.out.print("\t\"currentIP\": \"" + System.getenv("REMOTE_ADDR") + "\"\n}\n ");
    }
}
