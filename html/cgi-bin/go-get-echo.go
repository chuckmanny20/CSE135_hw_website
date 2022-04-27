package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	fmt.Print("Cache-Control: no-cache")
	fmt.Print("Content-type: text/html\n\n")
	fmt.Println("<html><head><title>Environment Variables</title></head>")
	fmt.Println("<body><h1 align=center>Environment Variables</h1><hr/>")

	for _, e := range os.Environ() {
		pair := strings.SplitN(e, "=", 2)
		fmt.Printf("<b>%20s</b>: %s\n<br/>", pair[0], pair[1])
	}

	fmt.Print("</body></html>")

	fmt.Println("Cache-Control: no-cache")
	fmt.Print("Content-type: text/html\n\n")
	fmt.Println("<html><head><title>GET query string</title></head>")
	fmt.Println("</head><body><h1 align=center>GET query string</h1><hr/>")

	// TODO: QUERY_STRING
	fmt.Println("Raw query string: \n<br/><br/>")
	fmt.Println("<table> Formatted Query String:")
	fmt.Println("</table>")

	fmt.Println("</body>")
	fmt.Println("</html>")

}
