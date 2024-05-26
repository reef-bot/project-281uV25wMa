// File: DirectMessage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DirectMessage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Function to fetch messages from the server
    const fetchMessages = async () => {
        try {
            const response = await axios.get('api/messages');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages: ', error);
        }
    };

    // Function to send a new message
    const sendMessage = async () => {
        try {
            await axios.post('api/messages', { message: newMessage });
            setNewMessage('');
            fetchMessages(); // Refresh messages after sending a new message
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };

    // useEffect hook to fetch messages on component mount
    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div>
            <h2>Direct Messages</h2>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <input 
                type="text"
                placeholder="Type your message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default DirectMessage;