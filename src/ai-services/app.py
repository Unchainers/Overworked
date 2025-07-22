from flask import Flask, request, jsonify, render_template
import openllm
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Initialize the LLM
# We're using Facebook's OPT model which is open and free
model_id = "facebook/opt-1.3b"
llm = openllm.LLM(model_id=model_id, backend="pt")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    chat_history = data.get('history', [])
    
    if not message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        # Generate response
        response = llm.generate(message)
        
        # Format the response
        bot_response = {
            'message': response.outputs[0].text,
            'history': chat_history + [{'user': message, 'bot': response.outputs[0].text}]
        }
        
        return jsonify(bot_response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)