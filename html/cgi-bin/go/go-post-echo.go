package main

import (
	"fmt"
	"os"
	"bufio"
)

func main5() {
	fmt.Println("Cache-Control: no-cache")
	fmt.Println("Content-type: text/html")
	fmt.Println("\n<html><head><title>POST Message Body</title></head>")
	fmt.Println("</head><body><h1 align=center>POST Message Body</h1><hr/>")

	var inputReader *bufio.Reader
	var input string
	var err error

	inputReader = bufio.NewReader(os.Stdin)
	input, err = inputReader.ReadString('\n')
    if err == nil {
        fmt.Printf("Message Body: %s\n<br/>", input)
    }

	// # fmt.Println HTML footer
	fmt.Println("</body>")
	fmt.Println("</html>")

}
