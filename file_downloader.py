import requests
import os
from requests_html import HTMLSession
import time

def get_module_path(file_name):
    return os.path.dirname(os.path.realpath(file_name))

os.chdir(get_module_path(__file__))

session = HTMLSession()
n = 2000
baseurl = "https://raw.githubusercontent.com/aozorabunko/aozorabunko/master/cards"
apibaseurl = "https://api.github.com/repos/aozorabunko/aozorabunko/contents/cards"

if __name__ == "__main__":
    for i in range(n):
        pagen = "0" * (6 - len(str(i))) + str(i)
        apiurl = os.path.join(apibaseurl, pagen, "files")
        r = requests.get(apiurl)
        if r.status_code==200:
            files = [i["name"] for i in r.json() if ".zip" in i["name"]]
            suburl = os.path.join(baseurl, pagen, "files")
            for f in files:
                os.system("curl " + os.path.join(suburl, f) + " > " +
                    get_module_path(__file__) + "/data/" + f)
                print("curl " + os.path.join(suburl, f) + " > " +
                    get_module_path(__file__) + "/data/" + f)
                time.sleep(1)
        else:
            print(r.status_code)
            time.sleep(1)
        
# cd /Users/yuki/Documents/aozora/data
# unzip '*.zip'
# nkf -w --overwrite *.txt

