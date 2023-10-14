from flask import Flask, jsonify, request
from flask_cors import CORS
from helpers.cohere import generate_response

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



if __name__ == '__main__':
    app.run(debug=True)