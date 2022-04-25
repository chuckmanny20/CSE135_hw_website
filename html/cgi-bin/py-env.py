#!/usr/bin/python3

import os

print("Cache-Control: no-cache")
print("Content-type: text/html\n\n")
print("<html><head><title>Environment Variables</title></head>\
    </head><body><h1 align=center>Environment Variables</h1>\
        <hr/> \n")
# Loop over the environment variables and print each variable and its value
for param in os.environ.keys():
   print("%s\n<br/>" % (os.environ[param]))

print("</body></html>")