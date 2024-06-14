import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        try {
            const response = await axios.post('http://localhost:11434/api/chat', {
                model: 'llama3',
                messages: [
                    ...newMessages.map(msg => ({ role: msg.from, content: msg.text })),
                    { role: 'user', content: input },
                ],
                stream: false,
            });

            const aiResponse = response.data.message;
            setMessages([...newMessages, { from: aiResponse.role, text: aiResponse.content }]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setMessages([...newMessages, { from: 'assistant', text: 'Sorry, something went wrong.' }]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
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
            </div>
            <div className={`chatbot-popup ${isOpen ? 'visible' : 'hidden'}`}>
                <div className="chatbot-header" onClick={toggleChatbot}>
                    <h4>AI ChatBot</h4>
                </div>
                <div className="chatbot-body">
                    <div className="messages">
                        {messages.map((msg, index) => (
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
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
