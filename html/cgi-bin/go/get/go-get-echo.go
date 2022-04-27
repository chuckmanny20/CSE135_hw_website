package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	fmt.Println("Cache-Control: no-cache")
	fmt.Print("Content-type: text/html\n\n")
	fmt.Println("<html><head><title>GET query string</title></head>")
	fmt.Println("</head><body><h1 align=center>GET query string</h1><hr/>")

	// TODO: QUERY_STRING
	fmt.Printf("Raw query string: %s\n<br/><br/>\n", os.Getenv("QUERY_STRING"))
	fmt.Println("<table> Formatted Query String:")
	buffer := os.Getenv("QUERY_STRING")
	for _, e := range strings.Split(buffer, "&") {
		pair := strings.SplitN(e, "=", 2)
		if len(pair) > 1 {
			print("%s = %s <br/>\n", pair[0], pair[1])
		}
	}
	fmt.Println("</table>")

	fmt.Println("</body>")
	fmt.Println("</html>")

}
