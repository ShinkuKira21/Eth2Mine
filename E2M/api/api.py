from flask import Flask
import db
app = Flask(__name__)

@app.route('/ping', methods = ['POST'])
def get_ping():
    return {"ping":"pong"}

@app.route('/login-submit')
def login():
    return 0

