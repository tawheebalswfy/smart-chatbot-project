import React, { useState } from "react";
import "./App.css";
import Chatbot from "./Components/Chatbot";

function App() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleStartChatbot = () => {
    setIsChatbotVisible(true);
  };

  const handleCloseChatbot = () => {
    setIsChatbotVisible(false);
  };

  return (
    <div className="app-container">
    
      <div className="left-container">
        <div className="about-chatbot">
          <h1>CHAT BOT - Roque Industries</h1>
          <p>(powered by GPT-3.5 Turbo)</p>
          <i>
            Hint: Type anything in the textfield and hit the send button/enter.
            <br />
            Hit clear button to clear chats.
            <br />
            Click Here To{" "}
            <a href="https://docs.google.com/document/d/1_UMI_fwUX_iwT4Dlp3Nuwmk1T_443X9NjiTaQjFJ36I/edit?usp=sharing">
              learn More
            </a>
          </i><br></br><br></br><br></br>
          {isChatbotVisible ? (
            <button onClick={handleCloseChatbot}>Close Chatbot</button>
          ) : (
            <button onClick={handleStartChatbot}>Open Chatbot</button>
          )}
        </div>
      </div>
      <div className="left-form-container">
        <div className="left-form">
          <h3 id="formleft">Please Enter Details</h3>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          /><br></br><br></br>
          <button onClick={handleStartChatbot}>Start Chatbot</button>
        </div>
      </div>

      {isChatbotVisible && (
        <div className="right-container">
          <Chatbot userName={userName} />
        </div>
      )}
    </div>
  );
}

export default App;
