import ssl
import pymongo


# CONNECTION_STRING = ""

# client = pymongo.MongoClient(CONNECTION_STRING, ssl_cert_reqs=ssl.CERT_NONE)

CONNECTION_STRING = "mongodb+srv://nanar:whatsyourangle@cluster0.rnojj.mongodb.net/Angle?retryWrites=true&w=majority" # get rid of this before pushing
client = pymongo.MongoClient(CONNECTION_STRING, ssl_cert_reqs=ssl.CERT_NONE)
db = client["Angle"]
angleUsers = db["User"]
libraries = db["Library"]
playlists = db["Playlist"]

# coll.insert_one({"life": "cool"})
