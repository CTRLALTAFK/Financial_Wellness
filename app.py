from flask import Flask, render_template, jsonify
import pymongo
app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.financial_wellnessDB
@app.route('/')
def index():

    return render_template("index.html")
@app.route('/ethnicity')
def ethnicity():
    print('i am page')
# function that renders the ethnicity html template

@app.route("/data")
def data():
    
    afford_expense = db.afford_expense.find()
    housing = db.housing.find()
    money_leftover = db.money_leftover.find()
    payday_loan = db.payday_loan.find()
    rejected_credit = db.rejected_credit.find()


    myData = {
        "afford_expense": afford_expense,
        }

    return jsonify(myData)

if __name__ == "__main__":
    app.run(debug=True)