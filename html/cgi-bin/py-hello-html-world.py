#!/usr/bin/python3
import datetime
import socket

print("Cache-Control: no-cache\n")
print ("Content-type:text/html\r\n\r\n")
print ('<html>')
print ('<head>')
print ('<title>Hello, Python!</title>')
print ('</head>')
print ('<body>')
print ('<h1>Zhaoxing Lyu was here! -Hello, Python!</h1>')
print ('<p>THis page was generated with the Python Programming language</p>')
date = datetime.datetime.now().strftime("%c")

print ('<p>Current Time: %s' %(date))
print ('</body>')
print ('</html>')