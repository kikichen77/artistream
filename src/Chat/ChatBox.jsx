import styles from "./ChatBoxStyles.module.css"
import ChatBody from "./ChatBody"
import ChatFooter from "./ChatFooter"
import React, { useEffect, useState, useRef } from 'react';

// Layout of entire chatbox
export default function ChatBox({socket, theme}) {
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    useEffect(() => {
        // Scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data));
    }, [socket]);

    return (
        <div className={`${theme ? styles.darkChatboxBox : styles.chatboxBox}`}>
            <header className={styles.chatboxHeader}>
                <p>Room Chat</p>
            </header>
            <div className={styles.chatDisplay}>
                <ChatBody 
                    messages={messages} 
                    lastMessageRef={lastMessageRef}
                    typingStatus={typingStatus}
                />
            </div>
            <div className={styles.textField}>
                <ChatFooter  socket={socket}/>
            </div>
        </div>
    )
}