import styles from "./WhiteboardStyles/ChatBoxStyles.module.css"
import ChatBody from "./ChatBody"
import ChatFooter from "./ChatFooter"
import React, { useEffect, useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ChatBox({socket, handleToggleDrawer}) {
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
        <div className={styles.chatboxBox}>
            <div className={styles.chatboxClose}>
                <IconButton onClick={handleToggleDrawer(false)}>
                    <CloseIcon/>
                </IconButton>
            </div>
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