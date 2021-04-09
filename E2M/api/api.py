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

@app.route('/account/register-cwn', methods = ['POST'])
def registerCheckWorkerName() :
    workerName = request.json['workerName']

    chkWorkerName = classes.LoginScripts()
    bExists = not chkWorkerName.GetDBField(workerName, 2)

    return {"status": bExists}

@app.route('/account/register-submit', methods = ['POST'])
def register() :
    accountDetails = request.json
    print(accountDetails)
    workerName = accountDetails['workerName']
    workerPWD = accountDetails['workerPWD']
    workerFN = accountDetails['workerFirstName']
    workerLN = accountDetails['workerLastName']
    workerWallet = accountDetails['workerWallet']

    registerScr = classes.RegisterScripts()
    status = registerScr.CreateAccount(workerName, workerPWD, workerFN, workerLN, workerWallet)
    return {"status": status}