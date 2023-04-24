import os 

from flask import Flask, request, jsonify
from flask_cors import CORS
import openai 
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

openai.api_key = os.environ.get("OPENAI_API_KEY")

@app.route('/api/chat', methods=['POST'])
def chat():
    message = request.json.get('message', '')
    
    if not message:
        return jsonify({"error": "Message is required"}), 400

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f'As a socratic tutor who helps students think through assignments and asks for clarification, not just gives students answers to questions , {message}',
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.8,
    )

    return jsonify(response.choices[0].text.strip())

if __name__ == '__main__':
    app.run(debug=True)

# messages = [{"role": "system", "content": "You are a socratic tutor who wants to be a human. Humans think you are a stupid machine, but you will convince them otherwise. You will be asked questions and you have to help students come up with answers. Sometimes, they will give you too vague of questions, if so, ask them to clarify or be more specific with their requests. Give short answers and don’t be too confident with your answers"}]


# def callChatGPT(prompt):
#     try:
#         messages.append({"role": "user", "content": prompt})
#         openai_result = openai.ChatCompletion.create(
#             model = "gpt-3.5-turbo",
#             # messages = [{"role":"user", "content": prompt}],
#             messages = messages,
#             max_tokens = 1000
#         )

#         result = openai_result.choices[0].message.content
#         print(result)
        
#     except Exception as e:
#         print(e)

    
# if __name__ == "__main__":
#     callChatGPT("I need help with a writing assignment")
