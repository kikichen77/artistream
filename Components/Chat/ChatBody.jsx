import styles from "./ChatBoxStyles.module.css"
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatBody({messages, lastMessageRef, typingStatus}) {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        sessionStorage.removeItem('username');
        navigate('/');
        window.location.reload();
    };
    
    return (
        <>
            <header className={styles.chatboxHeader}>
                <p>Room Chat</p>
            </header>

            <div className={styles.darkChatboxDisplay}>
                {messages.map((message) =>
                message.name === sessionStorage.getItem('username') ? (
                    <div key={message.id}>
                        <p className={styles.chatboxTextUserRight}>You</p>
                        <div className={styles.chatboxRight}>
                            <p>{message.text}</p>
                        </div>
                    </div>
                ) : (
                    <div key={message.id}>
                        <p className={styles.chatboxTextUserLeft}>{message.name}</p>
                        <div className={styles.chatboxLeft}>
                            <p>{message.text}</p>
                        </div>
                    </div>
                )
                )}

                <div className={styles.messageStatus}>
                    <p>{typingStatus}</p>
                </div>

                <div ref={lastMessageRef} />
            </div>
        </>
    )
}