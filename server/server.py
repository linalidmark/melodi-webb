from __future__ import print_function
from pymongo import MongoClient
from serversecrets import connectionstring
from flask import Flask, json, g, request, jsonify
from flask_cors import CORS

import sys

app = Flask(__name__)

CORS(app)

#
#   first run 'export FLASK_APP=server.py' where server.py is located
#   run application with 'flask run'
#
client = MongoClient(connectionstring)
db = client['Mellofest']

@app.route('/api/v1', methods=['POST'])
def postTest():
    jsondata = request.get_json()
    print(jsondata, file=sys.stderr)
    return "json post succeeded", 200

@app.route('/vote', methods=['POST'])
def vote():
    print("Vote")
    comment = None 
    collection = db['Mellofest']
    #user informaiton
    jsondata = request.get_json()
   
    print(jsondata, file=sys.stderr)
    groupID = 5 #request.args.get('groupID')
    user = 'Betty' #request.args.get('user')

    #vote
    artistNr = 1 #request.args.get('artistNr')
    song = jsondata['song']
    show = jsondata['show']
    comment = jsondata['comment']

    mydict = { "user": user,
               "groupID": groupID,
               "artistNr": artistNr,
               "song": song,
               "show": show,
               "comment": comment }


    x = collection.find_and_modify({"user": user, "groupID": groupID,"artistNr": artistNr},
                                   mydict,
                                   upsert=True)

    return str(x)

@app.route('/group/<groupID>')
def group(groupID):
    collection = db['Mellofest']
    cursor = collection.find({'groupID' : int(groupID)}, {'_id':0})
    a = []
    for document in cursor:
        a.append(document)

    return str(a)

@app.route("/all")
def All():
    collection = db['Mellofest']

    pipeline = [{"$unwind": "$artistNr"},
                {"$group": 
                    {"_id": "$artistNr",
                     "song": {"$avg": "$song"},
                     "show": {"$avg": "$show"}}
                }
               ]
    print(str(list(collection.aggregate(pipeline))), file=sys.stderr)
    return str(list(collection.aggregate(pipeline)))

@app.route("/artist")
def Artist():
    collection = db["Tabell"]
    cursor = collection.find({}, {'_id':0})
    
    a = []

    for document in cursor:
        a.append(document)
    
    return jsonify(a)