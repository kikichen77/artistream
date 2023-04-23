import styles from "./WhiteboardStyles/ChatBoxStyles.module.css"
import ChatBody from "./ChatBody"
import ChatFooter from "./ChatFooter"
import React, { useEffect, useState } from 'react';

export default function ChatBox({socket}) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    return (
        <div className={styles.chatboxBox}>
            <div className={styles.chatDisplay}>
                <ChatBody messages={messages}/>
            </div>
            <div className={styles.textField}>
                <ChatFooter  socket={socket}/>
            </div>
        </div>
    )
}