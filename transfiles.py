from googletrans import Translator
import time
import os
import pickle

def get_module_path(file_name):
    return os.path.dirname(os.path.realpath(file_name))

os.chdir(get_module_path(__file__))

translator = Translator()
files = os.listdir()

def split_text(file):
    with open(file, "r") as f:
        raw = f.read()
        titleauthor = raw.split("\n\n----")[0]
        txts = raw.split("\n\n\u3000")[1]
        txts = txts.split("。")
    return titleauthor, txts

def get_text(translated):
    rv = ""
    for i in translated:
        rv = rv + i.text +". "
    return rv

def make_dict(file):
    rv = {}
    rv["titleauthor"], txts = split_text(file)
    en, de = "", ""
    for i in txts:
        if len(i) > 4:
            en += translator.translate(i, dest='en').text
            en += ". "
            time.sleep(0.3)
            de += translator.translate(i, dest='de').text
            de += ". "
            time.sleep(0.3)
    rv["en"] = en
    rv["de"] = de
    rv["jp"] = txts
    return rv

if __name__ == "__main__":
    lst = []
    for idx, file in enumerate(files):
        try:
            lst.append(make_dict(file))
        except:
            pass
        # print(idx)
        if idx % 3 == 0:
            with open('out.pickle', 'wb') as handle:
                pickle.dump(lst, handle)