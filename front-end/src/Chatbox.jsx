import React, { useState } from 'react';
//import './Chatbox.css'; // Import the CSS file

const Chatbox = ({chats}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitted:', text);
  };

  return (
    <div className="justify-content flex flex-col items-center">
      <h1 className="text-black">✨ You've already found your adventure! How about a guide... ✨</h1>

      {/* Chat History */}
      <ul>
        {chats.map((chat, index) => (
          <li key={index}>
            <strong>You:</strong> {chat.text_input}<br />
            <strong>Gemini:</strong> {chat.gemini_output}
          </li>
        ))}
      </ul>

      {/* Chat Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="text"
          name="text"
          placeholder="Ask a magical question..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbox;