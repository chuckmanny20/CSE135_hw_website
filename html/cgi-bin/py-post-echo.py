#!/usr/bin/python3

import sys

print("Cache-Control: no-cache")
print("Content-type: text/html\n\n")
print("<html><head><title>POST Message Body</title></head>\
    </head><body><h1 align=center>POST Message Body</h1>\
        <hr/> \n")

print("Message Body: %s\n<br/>" %(sys.stdin.readlines()))

# Print HTML footer
print("</body>")
print("</html>")