from flask import Flask, request, jsonify
from flask_cors import CORS

from summarize_text import summarize_text

app = Flask(__name__)
CORS(app)  # Enable CORS for Chrome extension

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data.get('text', '')
    
    summary = summarize_text(text)
    
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(port=5000)