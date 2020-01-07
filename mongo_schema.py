from flask import Flask, render_template, jsonify
import pymongo

app = Flask(__name__)
conn = 'mongodb://localhost:27017'

client = pymongo.MongoClient(conn)
db = client.financial_wellness

@app.route('/')
def index():
    
    destination_data = db.financial_wellness.find_one()

    return render_template("index.html", app.js=destination_data)

@app.route("/data")
def dat():

    financial_wellness_data = db.financial_wellness.find()
    # other_data = db.other_data.find()
    # pull third
    return jsonify({
        financial_wellness_data: financial_wellness_data,
        other_data: data
    })

if __name__ == "__maina__":
    app.run(debug=True)