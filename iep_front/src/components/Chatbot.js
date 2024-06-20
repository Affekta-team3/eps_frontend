import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import { Box } from '@chakra-ui/react';
const API_KEY = "sk-proj-MeG79koNStBq6GjU24tfT3BlbkFJwTXOeGxjxwnolDlyjnO4";

const systemMessage = {
    "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
        setHasNewMessage(false);
    };

    const handleSend = async (message) => {
        if (message.trim() === '') return;

        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setInput('');

        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message}
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        };

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
            return data.json();
        }).then((data) => {
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
            setIsTyping(false);
            setHasNewMessage(true);
        });
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="chatbot-container">
            <div className={`chatbot-avatar ${isOpen ? 'hidden' : ''}`} onClick={toggleChatbot}>
                <img src="https://res.cloudinary.com/hht4avzbk/image/upload/v1718366049/h9gjhzpkmhjbxi6vcnrh.png" alt="Chatbot Avatar" />
                {hasNewMessage && <Box className="new-message-dot" />}
            </div>
            <div className={`chatbot-popup ${isOpen ? 'visible' : 'hidden'}`}>
                <div className="chatbot-header" onClick={toggleChatbot}>
                    <h4>AI ChatBot</h4>
                </div>
                <div className="chatbot-body">
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === "ChatGPT" ? "assistant" : "user"}`}>
                                <div className="bubble">{msg.message}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="typing-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleSend(input);
                            }}
                            placeholder="Type your message..."
                        />
                        <button onClick={() => handleSend(input)}>Send</button>
                    </div>
                    {isTyping && <div className="typing-indicator">ChatGPT is typing...</div>}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
