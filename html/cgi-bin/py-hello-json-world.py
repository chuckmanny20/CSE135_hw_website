#!/usr/bin/python3
import datetime
import json
import os


print("Cache-Control: no-cache")
print("Content-type: application/json\r\n\r\n")

date = datetime.datetime.now()
address = os.environ["REMOTE_ADDR"]

msg = {
    "title": "Hello, Python!",
    "heading": "Zhaoxing Lyu was here!  - Hello, Python!",
    "message": "This page was generated with the Perl programming langauge",
    "time": date,
    "IP": address
}

j = json.dump(msg)
print(j)


