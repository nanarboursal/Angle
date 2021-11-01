from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
import os
import db

from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token
from flask_pymongo import PyMongo 
from bson.objectid import ObjectId 
from flask_bcrypt import Bcrypt 

app = Flask(__name__, static_folder='../angle-ui/build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MONGO_DBNAME'] = 'Angle'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/Angle' # get rid of this before pushing
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@app.route('/')
def index():
    return "Angle is here!"


@app.route('/users/register', methods=["POST"])
def register():
    users = db.angleUsers
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(
        request.get_json()['password']).decode('utf-8')

    response = users.find_one({'email': email})
    if response:
        result = {"error": "Account already exists"}
    else:
        user_id = users.insert(
            {'first_name': first_name, 'last_name': last_name, 'email': email, 'password': password})
        new_user = users.find_one({'_id': user_id})
        result = {'email': new_user['email'] + ' registered'}

    return jsonify({'result': result})


@app.route('/users/login', methods=['POST'])
def login():
    users = db.angleUsers
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
    error_message = "Invalid email and/or password."

    response = users.find_one({'email': email})

    if response:
        if bcrypt.check_password_hash(response['password'], password.encode('utf-8')):
            access_token = create_access_token(identity={
                'first_name': response['first_name'],
                'last_name': response['last_name'],
                'email': response['email']
            })
            result = jsonify({"token": access_token})
        else:
            result = jsonify({"error": error_message})
    else:
        result = jsonify({"result": "No results found"})

    return result

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
