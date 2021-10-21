import ssl
import pymongo


# CONNECTION_STRING = ""

# client = pymongo.MongoClient(CONNECTION_STRING, ssl_cert_reqs=ssl.CERT_NONE)

CONNECTION_STRING = ""
client = pymongo.MongoClient(CONNECTION_STRING, ssl_cert_reqs=ssl.CERT_NONE)
db = client["Angle"]
angleUsers = db["User"]

# coll.insert_one({"life": "cool"})
