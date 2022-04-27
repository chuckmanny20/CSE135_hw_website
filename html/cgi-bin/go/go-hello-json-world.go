package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	fmt.Println("Cache-Control: no-cache")
	fmt.Println("Content-type: text/html")
	fmt.Println("{\n\t\"message\": \"Hello World\",")

	fmt.Println("\t\"date\": \"" + time.Now().Format("2006-01-02 15:04:05") + "\",")

	fmt.Printf("\t\"currentIP\": %s", os.Getenv("REMOTE_ADDR"))
	fmt.Println("\r\n}")
}
