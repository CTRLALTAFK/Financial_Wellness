import pymongo
#from pymongo import MongoClient
import pandas as pd

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.financial_wellnessDB
collection = db.afford_expense
collection.remove()
df = pd.read_csv("C:\\Users\\Lunch\\Documents\\Financial_Wellness\\static\\data\\2000_expense.csv") #csv file which you want to import
records_ = df.to_dict(orient = 'records')
result = collection.insert_many(records_ )

db = client.financial_wellnessDB
collection2 = db.housing
collection2.remove()
df2 = pd.read_csv("C:\\Users\\Lunch\\Documents\\Financial_Wellness\\static\\data\\housing.csv")
records_ = df2.to_dict(orient = 'records')
result = collection2.insert_many(records_ )

db = client.financial_wellnessDB
collection3 = db.money_leftover
collection3.remove()
df3 = pd.read_csv("C:\\Users\\Lunch\\Documents\\Financial_Wellness\\static\\data\\money_left.csv")
records_ = df3.to_dict(orient = 'records')
result = collection3.insert_many(records_ )

db = client.financial_wellnessDB
collection4 = db.payday_loan
collection4.remove()
df4 = pd.read_csv("C:\\Users\\Lunch\\Documents\\Financial_Wellness\\static\\data\\payday.csv")
records_ = df4.to_dict(orient = 'records')
result = collection4.insert_many(records_ )

db = client.financial_wellnessDB
collection5 = db.rejected_credit
collection5.remove()
df5 = pd.read_csv("C:\\Users\\Lunch\\Documents\\Financial_Wellness\\static\\data\\rejected_credit.csv")
records_ = df5.to_dict(orient = 'records')
result = collection5.insert_many(records_ )