import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        try {
            const response = await axios.post('http://localhost:11434/api/chat', {
                model: "llama3",
                messages: [
                    ...newMessages.map(msg => ({ role: msg.from, content: msg.text })),
                    { role: 'user', content: input }
                ],
                stream: false
            });

            const aiResponse = response.data.message;
            setMessages([...newMessages, { from: aiResponse.role, text: aiResponse.content }]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setMessages([...newMessages, { from: 'assistant', text: 'Sorry, something went wrong.' }]);
        }
    };

    return (
        <div className="chatbot-container">
            <h3>AI Chatbot</h3>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chatbot-message ${msg.from}`}>
                        <p><strong>{msg.from}:</strong> {msg.text}</p>
                    </div>
                ))}
            </div>
            <div className="chatbot-input">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
