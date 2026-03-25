import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from langchain.document_loaders.unstructured import UnstructuredFileLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import VectorDBQA
from langchain.chat_models import ChatOpenAI
from PyPDF2 import PdfReader

#for voice process
import pyttsx3
import speech_recognition as sr

app = Flask(__name__)
CORS(app)  # CORS for all routes

# Set your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Define the secret code to unlock the database
secret_code = "roque22"
database_unlocked = False

# Function to unlock the database
def unlock_database(user_input):
    global database_unlocked
    if user_input == secret_code:
        database_unlocked = True

# Function to access the secret data
def access_secret_data():
    with open('secretdb.txt', 'r', encoding='utf-8') as secret_file:
        secret_data = secret_file.read()
        return secret_data

# Initialize Langchain components
loader = UnstructuredFileLoader('my-data-document.txt')
documents = loader.load()

text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(documents)

embeddings = OpenAIEmbeddings()

db = Chroma.from_documents(texts, embeddings)

qa = VectorDBQA.from_chain_type(llm=ChatOpenAI(), chain_type="stuff", vectorstore=db, k=1)

# Initialize text-to-speech engine
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)

# Function to speak a response
def speak_response(response):
    engine.say(response)
    engine.runAndWait()

# Route for handling user input
@app.route("/ask", methods=["POST"])
def ask():
    global database_unlocked
    user_input = request.json.get("user_input", "")

    if user_input.lower() == "exit":
        return jsonify({"assistant_response": speak_response("Goodbye!")})

    if not database_unlocked:
        if user_input.lower() == "unlock":
            speak_response("Enter the secret code.")
            unlock_database(request.json.get("user_input", "").strip())
            if database_unlocked:
                return jsonify({"assistant_response": speak_response("Access Granted.")})
            else:
                return jsonify({"assistant_response": speak_response("Access Denied.")})
        else:
            return jsonify({"assistant_response": speak_response("Access Denied. Enter 'unlock' to access the database.")})

    if database_unlocked:
        if user_input.lower() == "get secret data":
            secret_data = access_secret_data()
            return jsonify({"assistant_response": speak_response(secret_data)})

    # Check if the user's input is in the question-answer pairs
    answer = qa.run(user_input)

    if answer:
        return jsonify({"assistant_response": speak_response(answer)})

    # If Langchain doesn't have an answer, use ChatGPT
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_input}],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    assistant_response = response["choices"][0]["message"]["content"]
    return jsonify({"assistant_response": speak_response(assistant_response)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
