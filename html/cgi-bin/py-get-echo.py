#!/usr/bin/python3
import os

print("Cache-Control: no-cache")
print("Content-type: text/html\n\n")
print("<html><head><title>GET query string</title></head>\
    </head><body><h1 align=center>GET query string</h1>\
        <hr/> \n")

# get and format query string
print("Raw query string: %s\n<br/><br/>", os.environ.get("QUERY_STRING"))
#print("<table> Formatted Query String:")
query = os.environ.get("QUERY_STRING")
print(query)



#print("</table>")

# Print HTML footer  
print("</body>")
print("</html>")
