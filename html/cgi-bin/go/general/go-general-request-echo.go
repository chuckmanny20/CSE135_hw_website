package main

import (
	"fmt"
	"os"
	"bufio"
)

func main() {
	fmt.Println("Cache-Control: no-cache")
	fmt.Print("Content-type: text/html\n\n")
	fmt.Println("<html><head><title>General Request Echo</title></head>")
	fmt.Println("</head><body><h1 align=center>General Request Echo</h1><hr/> ")

	// Get environment vars
	fmt.Println("<table>")
	fmt.Printf("<tr><td>Protocol:</td><td>%s</td></tr>\n", os.Getenv(("SERVER_PROTOCOL")))
	fmt.Printf("<tr><td>Method:</td><td>%s</td></tr>\n", os.Getenv(("REQUEST_METHOD")))
	
	inputReader := bufio.NewReader(os.Stdin)
	input, _ := inputReader.ReadString('\n')
	fmt.Printf("<tr><td>Message Body:</td><td> %s</td></tr>\n", input)

	fmt.Println("</body>")
	fmt.Println("</html>")

}
