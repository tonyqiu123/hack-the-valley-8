from flask import Flask, jsonify, request
from flask_cors import CORS
from helpers.cohere import generate_response
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://lmx5912004:ssdVXpH7P1VGoiUF@cluster0.d3sdlsl.mongodb.net/?retryWrites=true&w=majority"

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    test_message = {"message":"root route reached"}
    return jsonify(test_message)

@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if request.method == 'POST':
        user_prompt = request.form['user_prompt']
        
        return jsonify({"user_prompt": user_prompt})
    else:
        test_message = {"message":"chat route reached by GET"}
        return jsonify(test_message)

@app.route('/connect', methods=['GET'])
def connect():
    ...
    client = MongoClient(uri, server_api=ServerApi('1'))
    try:
        client.admin.command('ping')
        # print("Pinged your deployment. You successfully connected to MongoDB!")
        db = client["test"]
        collection = db["conversations"]
        result = list(collection.find({}))
    except Exception as e:
        print(e)    

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)