import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create the context
const ChatbotContext = createContext();

// Create a provider component
export const ChatbotProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [hasNewMessage, setHasNewMessage] = useState(false);

    const handleSend = async (messageText, restart = false) => {
        if (restart) {
            setMessages([]);
        }

        const newMessages = restart ? [{ from: 'user', text: messageText }] : [...messages, { from: 'user', text: messageText }];
        setMessages(newMessages);

        try {
            const response = await axios.post('http://20.127.207.107:11434/api/chat', {
                model: 'llama3',
                messages: [
                    ...newMessages.map(msg => ({ role: msg.from, content: msg.text })),
                    { role: 'user', content: messageText },
                ],
                stream: false,
            });

            const aiResponse = response.data.message;
            setMessages([...newMessages, { from: aiResponse.role, text: aiResponse.content }]);
            setHasNewMessage(true); // Set new message state to true
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setMessages([...newMessages, { from: 'assistant', text: 'Sorry, something went wrong.' }]);
        }
    };

    const clearMessages = () => {
        setMessages([]);
        setHasNewMessage(false);
    };

    return (
        <ChatbotContext.Provider value={{ messages, hasNewMessage, handleSend, clearMessages, setHasNewMessage }}>
            {children}
        </ChatbotContext.Provider>
    );
};

// Create a custom hook to use the context
export const useChatbot = () => {
    return useContext(ChatbotContext);
};
