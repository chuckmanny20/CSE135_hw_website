package main

import (
	"fmt"
	"time"
	"os"
)

func main() {
	fmt.Println("Cache-Control: no-cache")
	fmt.Print("Content-type: text/html\n\n")
	fmt.Println("<html>")
	fmt.Println("<head>")
	fmt.Println("<title>Hello, Go!</title>")
	fmt.Println("</head>")
	fmt.Println("<body>")
	fmt.Println("<h1>Chang Liu was here! - Hello, Go!</h1>")
	fmt.Println("<p>This page was generated with the Go programming language</p>")
	fmt.Printf("<p>Current Time: %s</p> \n", time.Now().Format("2006-01-02 15:04:05"))

	fmt.Printf("<p>Your IP Address: %s</p> \n", os.Getenv("REMOTE_ADDR"))
	fmt.Println("</body></html>")
}