package main

import (
	"fmt"
	"os"
)

func main() {
	// Headers
	fmt.Println("Cache-Control: no-cache")
	fmt.Print("Content-type: text/html\n\n")
	// Body - HTML
	fmt.Println("<html>")
	fmt.Println("<head><title>Python Sessions</title></head>")
	fmt.Println("<body>")
	fmt.Println("<h1>Python Sessions Page 2</h1>")
	fmt.Println("<table>")
	if os.Getenv("HTTP_COOKIE") != "" && os.Getenv("HTTP_COOKIE") != "destroyed" {
		fmt.Printf("<tr><td>Cookie:</td><td>%s</td></tr>\n", os.Getenv("HTTP_COOKIE"))
	} else {
		fmt.Print("<tr><td>Cookie:</td><td>None</td></tr>\n")
	}

	fmt.Println("</table>")
	// Links for other pages
	fmt.Println("<br />")
	fmt.Println("<a href=\"/cgi-bin/py-sessions-1.py\">Session Page 1</a>")
	fmt.Println("<br />")
	fmt.Println("<a href=\"/py-cgiform.html\">Python CGI Form</a>")
	fmt.Println("<br /><br />")
	// Destroy Cookie button
	fmt.Println("<form action=\"/cgi-bin/py-destroy-session.py\" method=\"get\">")
	fmt.Println("<button type=\"submit\">Destroy Session</button>")
	fmt.Println("</form>")
	fmt.Println("</body>")
	fmt.Println("</html>")
}
