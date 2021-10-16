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

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
