import os
from collections import defaultdict

pth = r"C:\Users\Buelter\Google Drive\dev\maxjob\venv\Lib\site-packages\py\_io"

def leaf(name=""):
    return {"name": name, "children": []}

data = defaultdict(leaf)

for root, dirs, files in os.walk(pth):
    for f in files:
        filepath = os.path.join(root, f)
        parts = filepath.split(os.sep)

        current = data
        for p in parts:
            obj = leaf(name=p)
            current["children"].append(obj)
            current = obj
            # if p not in [c.name for c in current_obj["children"]]:
            #     obj = leaf(name=p)
            #     current_obj["children"].append(obj)
            #     current_obj = obj
            #     print current_obj

from pprint import pprint
pprint(dict(data))
