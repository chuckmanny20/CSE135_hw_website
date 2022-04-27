package main

import (
	"fmt"
	"os"
	"bufio"
	"strings"
)

func main7() {
	// headers
	fmt.Println("Cache-Control: no-cache")

	// get name from env
	var inputReader *bufio.Reader
	var username string

	inputReader = bufio.NewReader(os.Stdin)
	username, _ = inputReader.ReadString('\n')
   
	name := strings.Split(username, "=")
	// if (len(username) != 0 && username[0] == 'u') {
	// 	name = strings.Split(username, "=")
	// }
	

	// set the cookie using a header, add extra \n to end headers
	if len(name) > 0 {
		fmt.Println("Content-type: text/html")
		fmt.Printf("Set-Cookie: %s\n\n", name)
	} else {
		fmt.Println("Content-type: text/html")
	}
		
	//fmt.Println(username)

	// Body - HTML
	fmt.Println("<html>")
	fmt.Println("<head><title>Python Sessions</title></head>")
	fmt.Println("<body>")
	fmt.Println("<h1>Python Sessions Page 1</h1>")
	fmt.Println("<table>")

	//First check for new Cookie, then Check for old Cookie
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
	fmt.Println("<a href=\"/py-cgiform.html\">Python CGI Form</a>")
	fmt.Println("<br /><br />")

	// Destroy Cookie button
	fmt.Println("<form action=\"/cgi-bin/py-destroy-session.py\" method=\"get\">")
	fmt.Println("<button type=\"submit\">Destroy Session</button>")
	fmt.Println("</form>")

	fmt.Println("</body>")
	fmt.Println("</html>")

}
