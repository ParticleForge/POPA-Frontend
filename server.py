from flask import Flask, request, jsonify
import time
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
port = 5001

@app.route('/', methods=['get'])
def home():
    return jsonify({"message" : "Working.", "status": "success"})

@app.route('/register', methods=['POST'])
def register():
    user_email = request.form.get('user_email')
    with open('early_registrations.json', 'r') as file:
        users = json.load(file)

    if user_email in users:
        return jsonify({"message" : "Email already registered.", "status": "failure"})
    else:
        users[user_email] = int(time.time())
        with open('early_registrations.json', 'w') as file:
            json.dump(users, file)
        return jsonify({"message" : "Email registered.", "status": "success"})

if __name__ == '__main__':
    app.run(port=port)
