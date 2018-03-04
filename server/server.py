from flask import jsonify, request, Flask, render_template
from flask_cors import CORS
import pprint
import requests
import colorlog
import pickle

logger = colorlog.getLogger()
logger.setLevel(colorlog.colorlog.logging.INFO)
handler = colorlog.StreamHandler()
handler.setFormatter(colorlog.ColoredFormatter(log_colors={
    'DEBUG':    'cyan',
    'INFO':     'green',
    'WARNING':  'yellow',
    'ERROR':    'red',
    'CRITICAL': 'orange',
}))
logger.addHandler(handler)

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')
CORS(app)

with open('data/out.pickle', 'rb') as f:
	lst = pickle.load(f)

def search_files(stxt):
    rv = []
    s = stxt.lower()
    for i in lst:
        if (s in i["en"].lower()) | (s in i["de"].lower()) | (s in "。".join(i
            ["jp"]).lower()):
            rv.append({
                "titleauthor": i["titleauthor"],
                "preview": i["de"][0:1000] + "....."})
    return rv

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/sagasu", methods=['POST'])
def sagasu():
    logger.warning(request.form)
    try:
        stxt = request.form['text']
        hits = search_files(stxt)
        # logger.warning(alg.matched_docs)
        return jsonify(hits)
    except ValueError:
        raise 

if __name__ == "__main__":
    app.run(debug=True)
    # , host='0.0.0.0'