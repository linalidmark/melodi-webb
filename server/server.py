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

@app.route('/vote', methods=['POST'])
def vote():
    collection = db['Mellofest']
    #user informaiton
    jsondata = request.get_json()
   
    print(jsondata, file=sys.stderr)
    groupID = 5 #request.args.get('groupID')
    user = 'Testar' #request.args.get('user')

    #vote
    artist = jsondata['artist']
    title = jsondata['title']
    song = jsondata['song']
    show = jsondata['show']
    comment = jsondata['comment']
    number = jsondata['number']

    mydict = { "user": user,
               "groupID": groupID,
               "artist": artist,
               "title": title,
               "song": song,
               "show": show,
               "comment": comment,
               "number": int(number) }

    x = collection.find_and_modify({"user": user, "groupID": groupID,"artist": artist, "title": title},
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
        print(document, file=sys.stderr)
    print(jsonify(a), file=sys.stderr)
    return jsonify(a)


@app.route("/all")
def All():
    collection = db['Mellofest']

    pipeline = [{ "$group": 
                    {"_id": "$number", 
                    "song": {"$avg": "$song"},
                    "show": {"$avg": "$show"},
                    "artist": {"$addToSet": "$artist"},
                    "title": {"$addToSet": "$title"}}},
               { "$project": {"Name": "$_id", "artist": 1, "title": 1, "song": 1, "show": 1}} ]
    return jsonify(list(collection.aggregate(pipeline)))

@app.route("/artist")
def Artist():
    collection = db["Tabell"]
    cursor = collection.find({}, {'_id':0})
    
    a = []
    for document in cursor:
        a.append(document)
    
    return jsonify(a)