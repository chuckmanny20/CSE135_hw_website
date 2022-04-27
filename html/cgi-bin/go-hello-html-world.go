package main

import (
	"fmt"
	// "time"
)

func main() {
	fmt.Println("Cache-Control: no-cache")
	fmt.Println("Content-type: text/html")
	fmt.Println("<html>")
	fmt.Println("<head>")
	fmt.Println("<title>Hello, Go!</title>")
	fmt.Println("</head>")
	fmt.Println("<body>")
	fmt.Println("<h1>Chang Liu was here! - Hello, Go!</h1>")
	fmt.Println("<p>This page was generated with the Go programming language</p>")
	// t := time.Now()
	// fmt.Printf("<p>Current Time: %s</p>", t.String())
	// fmt.Printf(cgi.escape(os.environ["REMOTE_ADDR"]))
	// address = os.environ["REMOTE_ADDR"]
	// fmt.Printf("<p>Your IP Address: %s</p>" %(address))
	fmt.Println("</body>")
	fmt.Println("</html>")
}
