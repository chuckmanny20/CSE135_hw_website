package main

import (
	"fmt"
	"os"
	"bufio"
)

func main6() {
	fmt.Println("Cache-Control: no-cache")
	fmt.Println("Content-type: text/html")
	fmt.Println("\n<html><head><title>General Request Echo</title></head>")
	fmt.Println("</head><body><h1 align=center>General Request Echo</h1><hr/> ")

	// Get environment vars
	fmt.Println("<table>")
	fmt.Printf("<tr><td>Protocol:</td><td>%s</td></tr>\n", os.Getenv(("SERVER_PROTOCOL")))
	fmt.Printf("<tr><td>Method:</td><td>%s</td></tr>\n", os.Getenv(("REQUEST_METHOD")))
	var inputReader *bufio.Reader
	var input string
	var err error

	inputReader = bufio.NewReader(os.Stdin)
	input, err = inputReader.ReadString('\n')
    if err == nil {
        fmt.Printf("<tr><td>Message Body:</td><td> %s</td></tr>\n", input)
    }

	// fmt.Println HTML footer
	fmt.Println("</body>")
	fmt.Println("</html>")

}
