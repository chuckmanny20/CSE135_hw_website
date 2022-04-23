#!/usr/bin/python3
import datetime
import json
import os
import sys


#print("Cache-Control: no-cache")
print("Content-type: text/plain\n")

date = datetime.datetime.now()
address = os.environ["REMOTE_ADDR"]

msg = {
    "title": "Hello, Python!",
    "heading": "Zhaoxing Lyu was here!  - Hello, Python!",
    "message": "This page was generated with the Python programming langauge",
    "time": date,
    "IP": address
}

j = json.dumps(msg)
print(j)


