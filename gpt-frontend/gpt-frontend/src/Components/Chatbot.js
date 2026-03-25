import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./Chatbot.css"; 

const speechSynthesis = window.speechSynthesis;
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "http://10.1.0.4:5000";
const API_BASE_URL = "http://192.168.1.160:5000";
// http://192.168.1.160:3000

function speakResponse(responseText) {
  // SpeechSynthesisUtterance object
  const utterance = new SpeechSynthesisUtterance(responseText);
  utterance.voice = speechSynthesis.getVoices()[0];
  speechSynthesis.speak(utterance);
}

function Chatbot(props) {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const chatContentRef = useRef(null);

  const lastAssistantMessageRef = useRef(null);

  const recognition = new speechRecognition();

  recognition.continuous = true;

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setUserInput((prevInput) => prevInput + transcript + ' ');
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sentMessage = { role: "user", content: userInput, hidden: false };

    // sent text to the conversation immediately
    setConversation((prevConversation) => [...prevConversation, sentMessage]);

    // Clear the input field
    setUserInput("");

    const response = await axios.post(`${API_BASE_URL}/ask`, {
      user_input: userInput,
    });

    const assistantResponse = response.data.assistant_response;

    // Update the conversation with the sent message and assistant's response
    setConversation((prevConversation) => [
      ...prevConversation,
      { role: "assistant", content: assistantResponse, hidden: true },
    ]);

    // Scroll to the last assistant message
    lastAssistantMessageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleClearChat = () => {
    setConversation([]);
  };

  const handleSpeakClick = () => {
    if (!isSpeaking) {
      setIsSpeaking(true);
      const lastAssistantMessage = conversation[conversation.length - 1];
      if (lastAssistantMessage && lastAssistantMessage.role === "assistant") {
        const responseText = lastAssistantMessage.content;
        speakResponse(responseText);
      }
    } else {
      setIsSpeaking(false);
      // Stop speaking if needed (this depends on the TTS library/API you are using)
      // For Web Speech API, you can use: speechSynthesis.cancel();
    }
  };

  const handleMicClick = () => {
    if (!isListening) {
      setIsListening(true);
      recognition.start();
    } else {
      setIsListening(false);
      recognition.stop();
    }
  };

  // Use useEffect to trigger the fade-in effect
  useEffect(() => {
    const messages = document.querySelectorAll(".chat-bubble");

    messages.forEach((message, index) => {
      // Use a timeout to stagger the animations
      setTimeout(() => {
        message.style.opacity = 1; // Set opacity to 1 to trigger the fade-in effect
      }, index * 100); 
    });
  }, [conversation]);

  useEffect(() => {
  
    setConversation([
      ...conversation,
      {
        role: "assistant",
        content: `Hello ${props.userName}, how can I help you?`,
        hidden: true,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">Chatbot</div>
        <div className="clear-button" onClick={handleClearChat}>
          Clear
        </div>
      </div>
      {/* Attach the ref to the chat content */}
      <div ref={chatContentRef} className="chat-content">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              message.role === "user" ? "user-bubble" : "assistant-bubble"
            }`}
            style={{ opacity: message.hidden ? 0 : 1 }} 
          >
            {message.role === "user" && (
              <div className="message-label">User</div>
            )}
            {message.role === "assistant" && (
              <div
                className="message-label"
                ref={message.role === "assistant" ? lastAssistantMessageRef : null} // Set ref for the last assistant message
              >
                AI
              </div>
            )}
            {message.content}
          </div>
        ))}
        {/* Add an empty div with a ref to scroll to the last assistant message */}
        <div ref={lastAssistantMessageRef}></div>
      </div>
      <div className="mic-on">
        <button
          type="speak"
          className={`speak-button ${isSpeaking ? 'speaking' : ''}`}
          onClick={handleSpeakClick}
        >
          <span class="material-symbols-outlined">
            {isSpeaking ? 'volume_off' : 'volume_up'}
          </span>
        </button>
        <button
          type="mic-enabled"
          className={`mic-button ${isListening ? 'listening' : ''}`}
          onClick={handleMicClick}
        >
          <span class="material-symbols-outlined">
            {isListening ? 'mic_off' : 'settings_voice'}
          </span>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="chat-input-container">
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

export default Chatbot;
