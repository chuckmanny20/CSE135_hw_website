import datetime
import socket
import json

def main():
    print("Cache-Control: no-cache\n")
    print("Content-type: application/json\n\n")

    date = datetime.datetime.now()
    ads = socket.gethostbyname(socket.gethostname())


    msg = {
        "title": "Hello, Python!",
        "heading": "Zhaoxing Lyu was here!  - Hello, Python!",
        "message": "This page was generated with the Perl programming langauge",
        "time": date,
        "IP": ads
    }

    j = json.dump(msg)
    print(j)



if __name__ == "__main__":
    main()
