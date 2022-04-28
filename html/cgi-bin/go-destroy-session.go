package main

import (
	"fmt"
)

func main() {
	// Headers
	fmt.Print("Cache-Control: no-cache\n");
	fmt.Print("Set-Cookie: destroyed\n");
	fmt.Print("Content-type: text/html\n\n");
  
	// Body - HTML
	fmt.Println("<html>");
	fmt.Println("<head><title>Go Session Destroyed</title></head>");
	fmt.Println("<body>");
	fmt.Println("<h1>Go Session Destroyed</h1>");
  
	// Links
	fmt.Println("<a href=\"/cgi-bin/go-sessions-1.cgi\">Back to Page 1</a>");
	fmt.Println("<br />");
	fmt.Println("<a href=\"/cgi-bin/go-sessions-2.cgi\">Back to Page 2</a>");
	fmt.Println("<br />");
	fmt.Println("<a href=\"/go-cgiform.html\">Go CGI Form</a>");
  
	fmt.Println("</body>");
	fmt.Println("</html>");
}
