from flask import jsonify, request, Flask, render_template
from flask_cors import CORS
import pprint
import requests
import colorlog
import pickle
import numpy as np
import csv
import json
import operator

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

with open('inputs/model', 'rb') as f:
	model = pickle.load(f)

with open('inputs/major_diagnose', 'rb') as f:
    labels = pickle.load(f)

with open('inputs/scaler', 'rb') as f:
    scaler = pickle.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/diagnose", methods=['POST'])
def diagnose():
    response = {}
    j = request.get_json(silent=True)
    logger.warning(j)
    thre = float(j['cl'])
    raw_x = np.array(
        [[
            float(j['crp']),
            float(j['erythrozyten']),
            float(j['hamatokrit']),
            float(j['hamoglobin']),
            float(j['kreatinin']),
            float(j['leukozyten']),
            float(j['mch']),
            float(j['mchc']),
            float(j['mcv']),
            float(j['mpv']),
            float(j['thrombozyten']),
            # 1,
            int(j['gender']),
            int(j['age'])

        ]])
    x = scaler.transform(raw_x)[0]
    preds = model.predict(np.expand_dims(x, axis=0))

    if len(preds[0]) != len(labels):
        raise ValueError('predicted labels and actual labels have different lengths')

    rv = preds.tolist()[0]
    diagnosis_index = np.where(preds > thre)[1]
    major_diagnosis_prob = preds[np.where(preds > thre)]
    major_labels = [labels[i] for i in diagnosis_index]
    major_rv = [rv[i] for i in diagnosis_index]
    majors = dict(zip(major_labels, major_rv))
    sorted_majors = sorted(majors.items(), key=operator.itemgetter(1))
    sorted_majors.reverse()
    sorted_labels = list(map(operator.itemgetter(0), sorted_majors))
    sorted_values = list(map(operator.itemgetter(1), sorted_majors))

    response["labels"] = sorted_labels
    response["datasets"] = [{
    "data": sorted_values,
    "label": "Confidence level",
    "backgroundColor": "rgba(255,99,132,0.2)"}]
    try:
        logger.warning(json.dumps(response))
        return jsonify(response)
    except ValueError:
        raise 

if __name__ == "__main__":
    app.run(debug=True)
    # , host='0.0.0.0'