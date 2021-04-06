from flask import Flask
import db
app = Flask(__name__)

@app.route('/ping', methods=['GET'])
def get_ping():
    return {"ping":""}

@app.route('/login-submit')
def login():
    return 0

