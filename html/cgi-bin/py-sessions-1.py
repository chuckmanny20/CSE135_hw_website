#!/usr/bin/python3
import sys
import os


# headers
print("Cache-Control: no-cache")

# get name from env
username = sys.stdin.readlines()

#print (username[0])
# check to see if a proper name was sent
name = ""
if username[0][0] == "u":
    name = username.split('=')[1]

# set the cookie using a header, add extra \n to end headers
if len(name) > 0:
    print("Content-type: text/html\n")
    print("Set-Cookie: %s\n\n" %(name))
else:
    print("Content-type: text/html\n\n")
    #print(username)

# Body - HTML
print("<html>")
print("<head><title>Python Sessions</title></head>\n")
print("<body>")
print("<h1>Python Sessions Page 1</h1>")
print("<table>")

#First check for new Cookie, then Check for old Cookie
if len(name) > 0:
    print("<tr><td>Cookie:</td><td>%s</td></tr>\n" %(name))
elif os.environ.get("HTTP_COOKIE") != None and os.environ.get("HTTP_COOKIE") != "destroyed":
    print("<tr><td>Cookie:</td><td>%s</td></tr>\n" %(os.environ.get("HTTP_COOKIE")))
else:
    print("<tr><td>Cookie:</td><td>None</td></tr>\n")

print("</table>")

# Links for other pages
print("<br />")
print("<a href=\"/cgi-bin/py-sessions-2.py\">Session Page 2</a>")
print("<br />")
print("<a href=\"/py-cgiform.html\">Python CGI Form</a>")
print("<br /><br />")

# Destroy Cookie button
print("<form action=\"/cgi-bin/py-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")

print("</body>")
print("</html>")