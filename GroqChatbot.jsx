import React, { useState, useRef, useEffect } from "react";
import { sendToGroq } from "../api/Groq.js";
import "./GroqChatbot.css";
import ReactMarkdown from "react-markdown";


function GroqChatbox() {

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

        const reply = await sendToGroq(userInput);
        const botMessage = { role: "assistant", content: reply };

        setMessages(prev => [...prev, botMessage]);
        setLoading(false);

    };

    return (

        <div className="chat-app">
            <div className="chat-wrapper">
                <div className="chat-header">
                    Groq AI Chatbot
                </div>

                <div className="chat-messages">

                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={msg.role === "user" ? "user-msg" : "bot-msg"}
                        >
                            <ReactMarkdown>
                                {msg?.content?.toString() || ""}
                            </ReactMarkdown>
                        </div>
                    ))}

                    {loading && <div className="bot-msg">Typing...</div>}

                    <div ref={chatEndRef}></div>

                </div>

                <div className="chat-input">

                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />

                    <button onClick={sendMessage}>
                        Send
                    </button>

                </div>

            </div>

        </div>

    );
}

export default GroqChatbox;