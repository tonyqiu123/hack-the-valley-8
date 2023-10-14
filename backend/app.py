from flask import Flask, jsonify, request
from flask_cors import CORS
from helpers.cohere import generate_response
from helpers.connect import mongod_connect
from datetime import datetime
from bson import ObjectId
import re

app = Flask(__name__)
CORS(app)

"""root route"""
@app.route('/')
def index():
    test_message = {"message":"root route reached"}
    return jsonify(test_message)

"""chat route"""
@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if request.method == 'POST':
        user_prompt = request.form['user_prompt']
        
        return jsonify({"user_prompt": user_prompt})
    else:
        test_message = {"message":"chat route reached by GET"}
        return jsonify(test_message)

"""connect to DB and CRUD routes"""
@app.route('/connect', methods=['GET'])
def connect():
    ...
    client = mongod_connect()
    db = client["test"]
    collection = db["conversations"]
    result = list(collection.find({}))      
    # return list of curr data, TESTING PURPOSES
    return jsonify(result)

@app.route('/get-chat-history', methods=['GET'])
def chat_history():
    # get the createdAt
    # body is userId and videoId
    userId = request.args.get("userId")
    videoId = request.args.get("videoId")

    client = mongod_connect()
    db = client["test"]
    collection = db["conversations"]
    
    documents = list(collection.find({"userId": int(userId), "videoId": videoId}))
    if documents:
        return jsonify({"documents": documents})
    else:
        return jsonify({"message": "Document not found for the provided userId and videoId"}, 404)

@app.route('/send-message', methods=['POST'])
def send_message():
    ...
    # connect to db
    client = mongod_connect()
    db = client["test"]
    collection = db["conversations"]

    # use regex to format cur time
    current_time = str(datetime.now())
    re_time = re.sub(r'(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})\.\d{6}', r'\1T\2', current_time)

    new_entry = {
        "_id": ObjectId(),
        "userId": int(''.join(filter(str.isdigit, request.args.get("userId")))),
        "videoId": request.args.get("videoId").strip(),
        "entry": request.args.get("entry").strip(),
        "speaker": request.args.get("speaker").strip(),
        "createdAt": re_time
    }
    
    # Insert the new entry into the MongoDB collection
    result = collection.insert_one(new_entry)
    
    if result.inserted_id:
        return jsonify({"message": "Entry created successfully", "inserted_id": str(result.inserted_id)})
    else:
        return jsonify({"message": "Entry creation failed"}, 500)



if __name__ == '__main__':
    app.run(debug=True)