from flask import Flask, request, jsonify
import db
app = Flask(__name__)

dbc = db.DatabaseConnection()

@app.route('/ping')
def get_ping():
    return {"ping":dbc.ConnectToDatabase()}

@app.route('/account/login-submit', methods = ['POST'])
def login():
    userID = request.json
    username = userID['properties']['username']
    password = userID['properties']['password']
    
    return {"authentication": True}