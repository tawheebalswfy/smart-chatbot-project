import React, { useState } from "react";
import "./Homepage.css"; 

function Homepage() {
  const [showChatbot, setShowChatbot] = useState(false);

  const startChatbot = () => {
    setShowChatbot(true);
  };

  return (
    <div className="homepage-container">
      <div className="left-side">
        {/* Information about the chatbot */}
        <h1>About This Chatbot</h1>
        <p>This is a chatbot that can help you with...</p>
      </div>
      <div className="right-side">
        {/* User input form */}
        <form>
          <input type="text" placeholder="Name" /><br></br>
          <input type="email" placeholder="Email" /><br></br>
          <button type="button" onClick={startChatbot}>
            Start Chatbot
          </button>
        </form>
        {/* Display the chatbot */}
        {showChatbot && (
          <div className="chatbot-container">
            {/* Add chatbot UI here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
