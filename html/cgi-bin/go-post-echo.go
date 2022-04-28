package main

import (
	"fmt"
	"os"
	"bufio"
)

func main() {
	fmt.Println("Cache-Control: no-cache")
	fmt.Print("Content-type: text/html\n\n")
	fmt.Println("<html><head><title>POST Message Body</title></head>")
	fmt.Println("</head><body><h1 align=center>POST Message Body</h1><hr/>")

	inputReader := bufio.NewReader(os.Stdin)
	input, _ := inputReader.ReadString('\n')
	fmt.Printf("Message Body: %s\n<br/>\n", input)

	// # fmt.Println HTML footer
	fmt.Println("</body>")
	fmt.Println("</html>")

}
