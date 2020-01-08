from flask import Flask, render_template, jsonify
import pymongo
from bson.json_util import dumps
app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.financial_wellnessDB
@app.route('/')
def index():

    return render_template("index.html")
@app.route('/ethnicity')
#def ethnicity():
   
# function that renders the html template

@app.route("/data")
def data():
    
    afford_expense = []
    for item in db.afford_expense.find():
        item.pop('_id')
        afford_expense.append(item)
    
    housing = []
    for item in db.housing.find():
        item.pop('_id')
        housing.append(item)
    
    money_leftover = []
    for item in db.money_leftover.find():
        item.pop('_id')
        money_leftover.append(item)

    payday_loan = []
    for item in db.payday_loan.find():
        item.pop('_id')
        payday_loan.append(item)

    # rejected_credit = []
    # for item in db.rejected_credit.find():
    #     item.pop('_id')
    #     rejected_credit.append(item)

#     json_docs = []
# for doc in cursor:
#     json_doc = json.dumps(doc, default=json_util.default)
#     json_docs.append(json_doc)
   

    myData = {
        "afford_expense": afford_expense,
        "housing": housing,
        "money_leftover" : money_leftover,
        "payday_loan" : payday_loan,
        # "rejected_credit" : rejected_credit
        }

    print(myData)

    return myData

if __name__ == "__main__":
    app.run(debug=True)