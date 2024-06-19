// src/components/Chatbot.js

import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import './Chatbot.css';
import { useChatbot } from '../context/ChatbotContext';

const Chatbot = () => {
    const { messages, handleSend, hasNewMessage, setHasNewMessage } = useChatbot();
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend(input);
            setInput('');
        }
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
        setHasNewMessage(false); // Reset new message state when opening the chatbot
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chatbot-container">
            <div className={`chatbot-avatar ${isOpen ? 'hidden' : ''}`} onClick={toggleChatbot}>
                <img src="https://res.cloudinary.com/hht4avzbk/image/upload/v1718366049/h9gjhzpkmhjbxi6vcnrh.png" alt="Chatbot Avatar" />
                {hasNewMessage && <Box className="new-message-dot" />} {/* Add red dot for new messages */}
            </div>
            <div className={`chatbot-popup ${isOpen ? 'visible' : 'hidden'}`}>
                <div className="chatbot-header" onClick={toggleChatbot}>
                    <h4>AI ChatBot</h4>
                </div>
                <div className="chatbot-body">
                    <div className="messages">
                        {messages.slice(1).map((msg, index) => ( // Ignore the initial prompt message
                            <div key={index} className={`message ${msg.from}`}>
                                <div className="bubble">{msg.text}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="typing-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                        />
                        <button onClick={() => handleSend(input)}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
