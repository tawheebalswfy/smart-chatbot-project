// react App.js
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./App.css";



const API_BASE_URL = "http://localhost:5000";



function App() {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(`${API_BASE_URL}/ask`, {
      user_input: userInput,
    });

    const assistantResponse = response.data.assistant_response;

    setConversation([
      ...conversation,
      { role: "user", content: userInput },
      { role: "assistant", content: assistantResponse },
    ]);

    setUserInput("");
  };

  const handleClearChat = () => {
    setConversation([]);
  };

  return (
    <div className="chat-container">
      <div className="top-container">
        <div className="heading">CHAT BOT - MeetUniversity</div>
        <div className="subheading">(powered by GPT-3.5 Turbo)</div>
        <div className="learnmore"><i>Hint: Type anything in textfield and hit send button/enter. Ask any question, Trained on latest ChatGPT 3.5 Turbo model.
        <br></br>Click Here To <a href="https://docs.google.com/document/d/1_UMI_fwUX_iwT4Dlp3Nuwmk1T_443X9NjiTaQjFJ36I/edit?usp=sharing">learn More</a></i></div>
      </div>
      <div>
        {conversation.map((message, index) => (
          <div key={index} className="chat-message-container">
            <div className={`message-content ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
              <div className="message-label">{message.role === 'user' ? 'You' : 'Chatbot'}</div>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      {conversation.length > 0 && (
        <div className="button-container">
          <div className="clear-button" onClick={handleClearChat}>
            <FontAwesomeIcon icon={faTrash} className="clear-icon" />
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;