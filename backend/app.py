from flask import Flask, jsonify, request
from flask_cors import CORS
from helpers.response import generate_response, summarize_text
from helpers.connect import mongod_connect
from helpers.models import get_video_description, get_transcript, time_format
from uuid import uuid4
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)

# """root route"""
# @app.route('/')
# def index():
#     test_message = {"message":"root route reached"}
#     return jsonify(test_message)

# """chat route"""
# @app.route('/chat', methods=['POST'])
# def chat():
#     data = request.get_json()
#     bot_response = generate_response(data['prompt'])
#     return jsonify({"response": bot_response})

"""get video data route"""
@app.route('/video-data', methods=['POST'])
def video_data():
    ...
    # connect to db
    client = mongod_connect()
    db = client["test"]
    collection = db["videos"]

    data = request.get_json()
    v_desc = get_video_description(data['video_id'])
    v_summ = summarize_text(v_desc)
    transcript = get_transcript(data['video_id'])

    current_time = str(datetime.now())
    re_time = time_format(current_time)

    new_id = collection.find_one(sort=[("_id", -1)])  # Get the latest document
    if new_id is not None:
        new_id = new_id["_id"] + 1  # Increment the latest _id
    else:
        new_id = 1  # First entry

    video = {"_id":new_id, "transcript": transcript, "summarization": v_summ, "createdAt": re_time}
    result = collection.insert_one(video)
    if result.inserted_id:
        return jsonify(video)

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

@app.route('/video-conversation-history', methods=['GET'])
def video_conversation_history():
    # get messages for a specific conversation id
    user_id = int(request.args.get("user_id"))
    target_conversation_id = request.args.get("target_conversation_id")

    client = mongod_connect()
    db = client["test"]
    collection = db["users"]
    user = collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"message": "User not found"}), 404    
    
    for conversation in user.get("conversations", []):
        if conversation.get("_id") == target_conversation_id:
            # print((conversation['messages']))
            return jsonify({"video-history": conversation['messages']}), 200

    return jsonify({"message": "Conversation ID not found for the user"}), 404

@app.route('/user-conversation-history', methods=['GET'])
def user_conversation_history():
    ...
    # get all conversation key value pairs
    user_id = int(request.args.get("user_id"))

    client = mongod_connect()
    db = client["test"]
    collection = db["users"]
    user = collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"message": "User not found"}), 404 

    conversation_list = []
    for conversation in user.get("conversations", []):
        # print(conversation)
        conversation_list.append({"_id":conversation["_id"], "lead_message":conversation["messages"][0]['message']})
    return jsonify({"user-history":conversation_list})

@app.route('/send-message', methods=['POST'])
def send_message():
    ...
    client = mongod_connect()
    db = client["test"]
    collection = db["users"]

    # need users_id, conversations_id
    data = request.get_json()

    client = mongod_connect()
    db = client["test"]
    collection = db["users"]
    user = collection.find_one({"_id": int(data['user_id'])})
    if not user:
        return jsonify({"message": "User not found"}), 404    
    
    conversations = user.get("conversations", [])

    for conversation in conversations:
        if conversation.get("_id") == data['conversation_id']:
            current_time = str(datetime.now())
            re_time = time_format(current_time)

            user_doc = {
                "_id": str(uuid4()),
                "createdAt": re_time,
                "message": data['message'],
                "speaker": "user"
            }
            conversation["messages"].append(user_doc)
            
            bot_doc = {
                "_id": str(uuid4()),
                "createdAt": re_time,
                "message": generate_response(data['message']),
                "speaker": "bot"
            }
            conversation["messages"].append(bot_doc)
            break

            
    # Update the user's document in the MongoDB collection
    collection.update_one({"_id": int(data['user_id'])}, {"$set": {"conversations": conversations}})

    return jsonify({"message": "Message added to the conversation"})
        
@app.route("/clear", methods=["POST"])
def clear():
    # Connect to the database
    client = mongod_connect()
    db = client["test"]
    collection = db["users"]

    data = request.get_json()
    user_id = int(data.get("user_id"))

    user = collection.find_one({"_id": user_id})

    if not user:
        return jsonify({"message": "User not found"}), 404

    result = collection.update_one({"_id": user_id}, {"$set": {"conversations": []}})

    if result.modified_count > 0:
        return jsonify({"message": "Conversations cleared"})
    else:
        return jsonify({"message": "No conversations to clear"})

# """sign in and user validation"""
# @app.route("/signup", methods=["POST"])
# def signup():
#     ...
#     # connect to db
#     client = mongod_connect()
#     db = client["test"]
#     collection = db["users"]

#     new_id = collection.find_one(sort=[("_id", -1)])  # Get the latest document
#     if new_id is not None:
#         new_id = new_id["_id"] + 1  # Increment the latest _id
#     else:
#         new_id = 1  # First entry
    
#     data = request.get_json()

#     # check database for existing users
#     existing_user = collection.find_one({"email": data['email']})

#     if existing_user:
#         return jsonify({"error": "Email already exists"}), 400
    
#     user = {
#         "_id" : new_id,
#         "userToken" : str(uuid4()),
#         "email" : data['email'],
#         "password" : data['password'],
#         "name" : data['name']
#     }
    
#     # Insert the new entry into the MongoDB collection
#     result = collection.insert_one(user)
    
#     if result.inserted_id:
#         return jsonify({"message": "Entry created successfully", "inserted_id": str(result.inserted_id)})
#     else:
#         return jsonify({"message": "Entry creation failed"}, 500)

# @app.route("/login", methods=["POST"])
# def login():
#     ...
#     client = mongod_connect()
#     db = client["test"]
#     collection = db["users"]

#     data = request.get_json()
#     existing_user = collection.find_one({"email": data['email']})
#     if not existing_user:
#         return jsonify({"error": "Email not found"}), 400
#     if existing_user["password"] != data['password']:
#         return jsonify({"error": "Incorrect Email and Password combination"}), 400
#     return jsonify({"userToken" : existing_user["userToken"]})


if __name__ == '__main__':
    app.run(debug=True)