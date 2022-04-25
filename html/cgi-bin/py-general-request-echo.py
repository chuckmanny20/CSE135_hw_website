#!/usr/bin/python3
import os


print("Cache-Control: no-cache")
print("Content-type: text/html\n\n")
print("<html><head><title>General Request Echo</title></head>\
    </head><body><h1 align=center>General Request Echo</h1>\
        <hr/> \n")

# Get environment vars
print("<table>\n")
print("<tr><td>Protocol:</td><td>%s</td></tr>\n" %(os.environ.get("SERVER_PROTOCOL")))
print("<tr><td>Method:</td><td>%s</td></tr>\n" %(os.environ.get("REQUEST_METHOD")))
#print("<tr><td>Message Body:</td><td> %s</td></tr>\n", fgets(str, 1000, stdin))

# Print HTML footer
print("</body>")
print("</html>")
