#!/usr/bin/env python3

import datetime
import socket

def main():
    print("Cache-Control: no-cache\n")
    print("Content-Type: text/x-python\n\n")
    print("<html>")
    print("<head>")
    print("<title>Hello, Python!</title>")
    print("</head>")
    print("<body>")

    print("<h1>Zhaoxing Lyu was here!  - Hello, Python!</h1>")
    print("<p>This page was generated with the Perl programming langauge</p>")

    date = datetime.datetime.now()
    print("<p>Current Time: ", date, " </p>")

    # # IP Address is an environment variable when using CGI
    # $address = $ENV{REMOTE_ADDR};
    #print ("<p>Your IP Address: ", socket.gethostbyname(socket.gethostname()), " </p>");

    print("</body>")
    print("</html>")

if __name__ == "__main__":
    main()
