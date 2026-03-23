import React, { useState, useRef, useEffect } from "react";
import { sendToGemini } from "../api/gemini";
import "./GeminiChatbot.css";


function GeminiChatbot() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages(prev => [...prev, userMessage]);

    const userInput = input;

    setInput("");
    setLoading(true);

    // const reply = await sendToGemini(userInput);
    const reply = await sendToGemini(userInput);

    const botMessage = { role: "assistant", content: reply };

    setMessages(prev => [...prev, botMessage]);

    setLoading(false);
  };

return (
  <div className="app">

    <div className="chat-wrapper">

      <div className="chat-header">
        Gemini AI Chat
      </div>

      <div className="chat-container">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "user-msg" : "bot-msg"}
          >
            {msg.content}
          </div>
        ))}

        {loading && <div className="bot-msg">Typing...</div>}

        <div ref={chatEndRef}></div>

      </div>

      <div className="input-area">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>Send</button>

      </div>

    </div>

  </div>
);
}

export default GeminiChatbot;