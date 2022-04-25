#!/usr/bin/python3

import datetime
import json
import os


#print("Cache-Control: no-cache")
print("Content-type: application/json\n")

date = datetime.datetime.now()
address = os.environ["REMOTE_ADDR"]

msg = {
    'title': 'Hello, Python!',
    'heading': 'Zhaoxing Lyu was here!  - Hello, Python!',
    'message': 'This page was generated with the Python programming langauge',
}
j = json.dumps(msg)
print(j)
#print(json.JSONEncoder().encode(msg))