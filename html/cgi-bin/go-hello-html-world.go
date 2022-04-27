package main

import (
    "fmt"
    "time"
    "net/http"
	"net"
	"strings"
	"log"
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
    t := time.Now()
    fmt.Printf("<p>Current Time: %s</p>", t.String())

	fmt.Printf("<p>Your IP Address: ")
	http.HandleFunc("/", getUserIP)
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Fatal(err)
	}

    fmt.Println("</p> \n </body>")
    fmt.Println("</html>")

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
