package main

import (
	"fmt"
	"os"
	"bufio"
	"strings"
)

func main() {
	// headers
	fmt.Println("Cache-Control: no-cache")

	inputReader := bufio.NewReader(os.Stdin)
	username, _ := inputReader.ReadString('\n')
	name := strings.Split(username, "=")

	if len(name) > 0 {
		fmt.Println("Content-type: text/html")
		fmt.Printf("Set-Cookie: %s\n\n", name[1])
	} else {
		fmt.Print("Content-type: text/html\n\n")
	}

	// Body - HTML
	fmt.Println("<html>")
	fmt.Println("<head><title>Go Sessions</title></head>")
	fmt.Println("<body>")
	fmt.Println("<h1>Go Sessions Page 1</h1>")
	fmt.Println("<table>")

	// First check for new Cookie, then Check for old Cookie
	if len(name) > 0 {
		fmt.Printf("<tr><td>Cookie:</td><td>%s</td></tr>\n", name)
	} else if os.Getenv("HTTP_COOKIE") != "" && os.Getenv("HTTP_COOKIE") != "destroyed" {
		fmt.Printf("<tr><td>Cookie:</td><td>%s</td></tr>\n", os.Getenv("HTTP_COOKIE"))
	} else {
		fmt.Println("<tr><td>Cookie:</td><td>None</td></tr>")
	}

	fmt.Println("</table>")

	// Links for other pages
	fmt.Println("<br />")
	fmt.Println("<a href=\"/cgi-bin/py-sessions-2.py\">Session Page 2</a>")
	fmt.Println("<br />")
	fmt.Println("<a href=\"/py-cgiform.html\">Go CGI Form</a>")
	fmt.Println("<br /><br />")

	// Destroy Cookie button
	fmt.Println("<form action=\"/cgi-bin/py-destroy-session.py\" method=\"get\">")
	fmt.Println("<button type=\"submit\">Destroy Session</button>")
	fmt.Println("</form>")

	fmt.Println("</body>")
	fmt.Println("</html>")

}
