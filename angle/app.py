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
app.config['MONGO_URI'] = 'mongodb://localhost:27017/Angle'
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
    libraries = db.libraries
    playlists = db.playlists
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    books = [] # for adding to libraries
    movies = [] # for adding to libraries
    userPlaylists = [] # for adding to playlists
    password = bcrypt.generate_password_hash(
        request.get_json()['password']).decode('utf-8')

    response = users.find_one({'email': email})
    if response:
        result = {"error": "Account already exists"}
    else:
        user_id = users.insert(
            {'first_name': first_name, 'last_name': last_name, 'email': email, 'password': password})
        libraries.insert({'email': email, 'books': books, 'movies': movies})
        playlists.insert({'email': email, 'playlists': userPlaylists})
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

@app.route('/libraries/addmedia', methods=["POST"])
def add_media():
    libraries = db.libraries
    email = request.get_json()['email']
    mediaType = request.get_json()['mediaType']
    title = request.get_json()['title']
    author = request.get_json()['author']
    notes = request.get_json()['notes']
    rating = request.get_json()['rating']

    response = libraries.find_one({'email': email})
    if response:
        if mediaType == "Book":
            media = {'mediaType': "book", 'mediaID': title+"&&&&"+author, 'title': title, 'author': author, 'notes': notes, 'rating': rating}
            libraries.update(
                {'email': email},
                {'$push': {'books': media}}
            )
        elif mediaType == "Movie":
            media = {'mediaType': "movie", 'mediaID': title+"&&&&"+author, 'title': title, 'author': author, 'notes': notes, 'rating': rating}
            libraries.update(
                {'email': email},
                {'$push': {'movies': media}}
            )
        result = {"success": "new media added"}
    else:
        result = {"error": "an error was encountered"}

    return jsonify({'result': result})

@app.route('/libraries/getbooks', methods=["GET"])
def get_books():
    libraries = db.libraries
    # email = request.get_json()['email']

    email = "nanarb@gmail.com"
    response = libraries.find_one({'email': email})
    if response:
        result = response['books']
    else:
        result = {"error": "an error was encountered"}

    return jsonify({'result': result})

@app.route('/libraries/getmovies', methods=["GET"])
def get_movies():
    libraries = db.libraries
    # email = request.get_json()['email']

    email = "nanarb@gmail.com"
    response = libraries.find_one({'email': email})
    if response:
        result = response['movies']
    else:
        result = {"error": "an error was encountered"}

    return jsonify({'result': result})

@app.route('/libraries/deletemedia', methods=["POST"])
def delete_media():
    libraries = db.libraries
    email = request.get_json()['email']
    mediaType = request.get_json()['mediaType']
    mediaID = request.get_json()['title'] + "&&&&" + request.get_json()['author']

    response = libraries.find_one({'email': email})
    if response:
        if mediaType == "book":
            libraries.update(
                {'email': email},
                {'$pull': {'books': {'mediaID': mediaID}}}
            )
        elif mediaType == "movie":
            libraries.update(
                {'email': email},
                {'$pull': {'movies': {'mediaID': mediaID}}}
            )
        result = {"success": "media removed"}
    else:
        result = {"error": "an error was encountered"}

    return jsonify({'result': result})

@app.route('/libraries/updatemedia', methods=["POST"])
def update_media():
    libraries = db.libraries
    email = request.get_json()['email']
    mediaType = request.get_json()['mediaType']
    oldTitle = request.get_json()['oldTitle']
    oldAuthor = request.get_json()['oldAuthor']
    oldMediaID = oldTitle + '&&&&' + oldAuthor

    title = request.get_json()['title']
    author = request.get_json()['author']
    mediaID = title + '&&&&' + author
    notes = request.get_json()['notes']
    rating = request.get_json()['rating']

    response = libraries.find_one({'email': email})
    if response:
        if mediaType == "book":
            libraries.update(
                {'email': email, 'books.mediaID': oldMediaID},
                {'$set': {'books.$.title': title, 'books.$.author': author, 'books.$.notes': notes, 'books.$.rating': rating, 'books.$.mediaID': mediaID}},
            )
        elif mediaType == "movie":
            libraries.update(
                {'email': email, 'movies.mediaID': oldMediaID},
                {'$set': {'movies.$.title': title, 'movies.$.author': author, 'movies.$.notes': notes, 'movies.$.rating': rating, 'movies.$.mediaID': mediaID}},
            )
        result = {"success": "media updated"}
    else:
        result = {"error": "an error was encountered"}

    return jsonify({'result': result})

@app.route('/playlists/addplaylist', methods=["POST"])
def add_playlist():
    playlists = db.playlists
    email = request.get_json()['email']
    playlistName = request.get_json()['playlistName']
    books = request.get_json()['books']
    movies = request.get_json()['movies']

    response = playlists.find_one({'email': email})
    if response:
        playlist = {'playlistName': playlistName, 'books': books, 'movies': movies}
        playlists.update(
            {'email': email},
            {'$push': {'playlists': playlist}}
        )
        result = {"success": "new media added"}
    else:
        result = {"error": "an error was encountered"}

    return jsonify({'result': result})

@app.route('/playlists/getplaylists', methods=["GET"])
def get_playlists():
    playlists = db.playlists
    # email = request.get_json()['email']

    email = "nanarb@gmail.com"
    response = playlists.find_one({'email': email})
    if response:
        result = response['playlists']
    else:
        result = {"error": "an error was encountered"}

    return jsonify({'result': result})

@app.route('/playlists/deleteplaylist', methods=["POST"])
def delete_playlist():
    playlists = db.playlists
    email = request.get_json()['email']
    playlistName = request.get_json()['playlistName']
    print("HERE IS THE PLAYLIST NAME")
    print(playlistName)

    response = playlists.find_one({'email': email})
    if response:
        playlists.update(
            {'email': email},
            {'$pull': {'playlists': {'playlistName': playlistName}}}
        )
        result = {"success": "playlist removed"}
    else:
        result = {"error": "an error was encountered"}

    return jsonify({'result': result})

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
