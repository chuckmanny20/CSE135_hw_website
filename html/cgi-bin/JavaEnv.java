public class JavaEnv {
    public static void main(String[] args, String[] envp) {
        // print HTML header
        System.out.print("Cache-Control: no-cache\n");
        System.out.print("Content-type: text/html\n\n");
        System.out.print(
                "<html><head><title>Environment Variables</title></head>" + "\t" +
                        "<body><h1 align=center>Environment Variables</h1>" + "\t" +
                        "<hr/>\n");

        for (String env : envp)
            System.out.printf("%s\n<br/>", env);

        // print HTML footer
        System.out.print("</body></html>");
    }
}
