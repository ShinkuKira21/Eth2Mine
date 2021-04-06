from flask import Flask
import db
app = Flask(__name__)

@app.route('/ping')
def get_ping():
    return {"ping":"pong"}

@app.route('/login-submit', methods = ['POST'])
def login():
    return 0

