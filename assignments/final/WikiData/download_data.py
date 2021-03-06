import requests
import json

"""
Note:
If you are using conda on Windows, you may get a 'SSL Module Not Available'
error. If this happens, installing the binaries from this website should
help:

https://slproweb.com/products/Win32OpenSSL.html

"""

S = requests.Session()

URL = "https://en.wikipedia.org/w/api.php"

PARAMS = {
    "action": "query",
    "format": "json",
    "list": "recentchanges",
    "rcdir": "newer",
    "rctype": "edit",
    "rcshow": "!bot",
    "rcprop": "timestamp|ids|title|sizes|flags|user",
    "rclimit": "500"
}

R = S.get(url = URL, params = PARAMS)
DATA = R.json()

edit_data = DATA["query"]["recentchanges"]

with open("data.json", "w", encoding = "utf-8") as f:
  json.dump(edit_data, f, ensure_ascii = False)
