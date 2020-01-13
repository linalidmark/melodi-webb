from __future__ import print_function
from pymongo import MongoClient
from serversecrets import connectionstring
from flask import Flask, json, g, request
from flask_cors import CORS

import sys

client = MongoClient(connectionstring)
db = client['Mellofest']


app = Flask(__name__)

CORS(app)

#
#   first run 'export FLASK_APP=server.py' where server.py is located
#   run application with 'flask run'
#


@app.route('/api/v1', methods=['POST'])
def postTest():

    print(request.form, file=sys.stderr)
    return "json post succeeded", 200

@app.route('/vote')
def vote():
    print("Vote")
    collection = db['Mellofest']
    #user informaiton
    groupID = 5 #request.args.get('groupID')
    user = 'Betty' #request.args.get('user')

    #vote
    artistNr = 1 #request.args.get('artistNr')
    song = 3 #request.args.get('song')
    show = 3 #request.args.get('show')
    comment = 'G' #request.args.get('comment')


    mydict = { "user": user,
               "groupID": groupID,
               "artistNr": artistNr,
               "song": song,
               "show": show,
               "comment": comment }


    x = collection.find_and_modify({"user": user, "groupID": groupID,"artistNR": artistNr},
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
    pipeline = [{"$unwind": "$artistNR"},
                {"$group": 
                    {"_id": "$artistNR",
                     "song": {"$avg": "$song"},
                     "show": {"$avg": "$show"}}
                }
               ]
    return str(list(collection.aggregate(pipeline)))

@app.route("/artist")
def Artist():
    collection = db["Tabell"]
    cursor = collection.find({}, {'_id':0})
    a = []
    for document in cursor:
        a.append(document)

    return str(a)