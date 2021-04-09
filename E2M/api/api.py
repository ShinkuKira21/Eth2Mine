from flask import Flask, request, jsonify
import db
import classes

app = Flask(__name__)

dbc = db.DatabaseConnection()

@app.route('/ping')
def get_ping():
    return {"ping":dbc.ConnectToDatabase()}

@app.route('/account/login-submit', methods = ['POST'])
def login():
    userID = request.json

    username = userID['username']
    password = userID['password']

    loginScr = classes.LoginScripts()
    result = loginScr.CheckLogin(username, password)

    return {"authentication": result['auth'], "execAuthentication": result['execAuth']}