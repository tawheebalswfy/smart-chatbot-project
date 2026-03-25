# GPT-Dynamic-ChatBot-React-python

##### Live Demo (Website Chatbot): https://gpt-chatbot-react-python-assessment.pages.dev/
##### Live Demo (Personal AI): https://anuragpi.me/home-server-web-ui1/main-ui/

<img src="https://github.com/AnuragRoque/GPT-ChatBot-React-python-Assessment/assets/41073466/6db84742-ec4f-44bf-9340-4054e0b99cec" alt="bot-thumbnail" width="600" height="400" />

# Chatbot Application

This project is a chatbot application built with React and utilizes a Flask backend for interacting with the OpenAI GPT-3.5 Turbo model. It will answer as usual but will answer from user input data too.
Below are the key technologies used in this project:

## Technologies Used Frontend (React)

- **React**: A JavaScript library for building user interfaces.
- **useState**: React Hook for managing component state.
- **axios**: A promise-based HTTP client for making API requests.
- **CSS**: Cascading Style Sheets for styling the components.

### Frontend Component Files

-App.js
-Homepage.js
-Chatbot.js

## Technologies Used For Backend (Python)

- Python
- Flask
- Flask-CORS
- OpenAI GPT-3.5 Turbo Model

This is a Flask application that combines the power of Langchain and ChatGPT for question-answering. It enables you to answer questions based on a predefined knowledge base stored in `document.txt` and utilizes ChatGPT when answers are not available in the knowledge base.

## New Additions and Changes

### Langchain Integration

1. **Document Preprocessing:** The application now preprocesses a document stored in `document.txt` to ensure consistency and remove irrelevant information.
2. **Text Chunking:** The document is split into chunks of 1000 characters to optimize processing.
3. **Embeddings Generation:** Embeddings for each document or text passage in the corpus are computed using a pre-trained language model (ChatGPT) via Langchain.
4. **Vector Database:** A vector database is created and used to index the generated embeddings. This database enables efficient similarity searches.
5. **Langchain Question-Answering Setup:** A Langchain-based question-answering system is initialized, which utilizes the indexed embeddings to find relevant answers.

### Updated `ask` Route

1. **User Input Handling:** The `ask` route now handles user inputs by checking if they match predefined question-answer pairs. If a match is found, it retrieves the answer from the pairs.
2. **Exit Command:** The application responds with "Goodbye!" when the user enters "exit."
3. **Langchain Question-Answering:** If the user's input doesn't match any predefined pairs, Langchain is used for question-answering. If Langchain has an answer, it is returned.
4. **Fallback to ChatGPT:** If neither predefined pairs nor Langchain provide an answer, ChatGPT (model: gpt-3.5-turbo) is used to generate a response.

## Usage

1. **Ask Questions:** You can send POST requests to the `/ask` endpoint with the user's question in the JSON format. The application will provide answers based on the integrated question-answering system And if question's answer does not found in data then it will simply answer like normal ChatGPT' .
2. **Exit Command:** To exit the application, simply send a request with the user's input as "exit."

## Customization

You can customize the question-answer in the `document.txt` file to include your own data.

---

## Project Setup

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Node.js v18.16.1
- Python 3.11.4
- OpenAI API Key

### Frontend Setup

### Backend Setup

### Project RUN

```shell
cd gpt-backend2
python app.py
```

```shell
cd gpt-frontend
npm start
```

[@Anuragroque](https://github.com/AnuragRoque/)
