package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"strings"
	"time"
)

func main() {
	fmt.Println("Cache-Control: no-cache")
	fmt.Println("Content-type: text/html")
	fmt.Println("{\n\t\"message\": \"Hello World\",")
	t := time.Now()

	fmt.Println("\t\"date\": \"" + t.String() + "\",")

	fmt.Println("\t\"currentIP\":")
	http.HandleFunc("/", getUserIP)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("\r\n}")
}

func getUserIP(httpWriter http.ResponseWriter, httpServer *http.Request) {
	var userIP string
	if len(httpServer.Header.Get("CF-Connecting-IP")) > 1 {
		userIP = httpServer.Header.Get("CF-Connecting-IP")
		fmt.Println(net.ParseIP(userIP))
	} else if len(httpServer.Header.Get("X-Forwarded-For")) > 1 {
		userIP = httpServer.Header.Get("X-Forwarded-For")
		fmt.Println(net.ParseIP(userIP))
	} else if len(httpServer.Header.Get("X-Real-IP")) > 1 {
		userIP = httpServer.Header.Get("X-Real-IP")
		fmt.Println(net.ParseIP(userIP))
	} else {
		userIP = httpServer.RemoteAddr
		if strings.Contains(userIP, ":") {
			fmt.Println(net.ParseIP(strings.Split(userIP, ":")[0]))
		} else {
			fmt.Println(net.ParseIP(userIP))
		}
	}
}
