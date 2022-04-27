package main

import (
	"fmt"
	"os"
	"strings"
)

func main3() {
	fmt.Print("Cache-Control: no-cache")
	fmt.Print("Content-type: text/html\n\n")
	fmt.Println("<html><head><title>Environment Variables</title></head>")
	fmt.Println("<body><h1 align=center>Environment Variables</h1><hr/>")

	for _, e := range os.Environ() {
		pair := strings.SplitN(e, "=", 2)
		fmt.Printf("<b>%20s</b>: %s\n<br/>", pair[0], pair[1])
	}

	fmt.Print("</body></html>")

}
