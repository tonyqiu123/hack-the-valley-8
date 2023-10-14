from flask import Flask, jsonify, request
from flask_cors import CORS
from helpers.response import generate_response
from helpers.connect import mongod_connect
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)

"""root route"""
@app.route('/')
def index():
    test_message = {"message":"root route reached"}
    return jsonify(test_message)

"""chat route"""
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    bot_response = generate_response(data['prompt'])
    return jsonify({"response": bot_response})

"""connect to DB and CRUD routes"""
@app.route('/connect', methods=['GET'])
def connect():
    ...
    client = mongod_connect()
    db = client["test"]
    collection = db["users"]
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

    data = request.get_json()

    # use regex to format cur time
    current_time = str(datetime.now())
    re_time = re.sub(r'(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})\.\d{6}', r'\1T\2', current_time)

    new_id = collection.find_one(sort=[("_id", -1)])  # Get the latest document
    if new_id is not None:
        new_id = new_id["_id"] + 1  # Increment the latest _id
    else:
        new_id = 1  # First entry

    new_entry = {
        "_id": new_id,
        "userId": data['userId'],
        "videoId": data['videoId'],
        "entry": data['entry'],
        "speaker": data['speaker'],
        "createdAt": re_time
    }
    
    # Insert the new entry into the MongoDB collection
    result = collection.insert_one(new_entry)
    
    if result.inserted_id:
        return jsonify({"message": "Entry created successfully", "inserted_id": str(result.inserted_id)})
    else:
        return jsonify({"message": "Entry creation failed"}, 500)


"""sign in and user validation"""
@app.route("/signup", methods=["POST"])
def signup():
    ...
    # connect to db
    client = mongod_connect()
    db = client["test"]
    collection = db["users"]

    new_id = collection.find_one(sort=[("_id", -1)])  # Get the latest document
    if new_id is not None:
        new_id = new_id["_id"] + 1  # Increment the latest _id
    else:
        new_id = 1  # First entry
    
    data = request.get_json()

    # TODO check database for existing users
    existing_user = collection.find_one({"email": data['email']})

    if existing_user:
        return jsonify({"error": "Email already exists"}), 400
    
    user = {
        "_id" : new_id,
        "email" : data['email'],
        "name" : data['name'],
        "image" : data['image']
    }
    
    # Insert the new entry into the MongoDB collection
    result = collection.insert_one(user)
    
    if result.inserted_id:
        return jsonify({"message": "Entry created successfully", "inserted_id": str(result.inserted_id)})
    else:
        return jsonify({"message": "Entry creation failed"}, 500)

@app.route("/login", methods=["POST"])
def login():
    ...
    


if __name__ == '__main__':
    app.run(debug=True)