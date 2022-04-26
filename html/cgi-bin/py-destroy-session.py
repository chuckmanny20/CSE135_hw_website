#!/usr/bin/python3

print("Cache-Control: no-cache")
print("Set-Cookie: destroyed")
print("Content-type: text/html\n\n")

# Body - HTML
print("<html>")
print("<head><title>Python Session Destroyed</title></head>")
print("<body>")
print("<h1>C Session Destroyed</h1>")

# Links
print("<a href=\"/cgi-bin/py-sessions-1.py\">Back to Page 1</a>")
print("<br />")
print("<a href=\"/cgi-bin/py-sessions-2.py\">Back to Page 2</a>")
print("<br />")
print("<a href=\"/py-cgiform.html\">Python CGI Form</a>")

print("</body>")
print("</html>")
