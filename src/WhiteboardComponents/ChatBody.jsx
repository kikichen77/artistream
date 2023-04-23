import styles from "./WhiteboardStyles/ChatBoxStyles.module.css"
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatBody({messages, lastMessageRef, typingStatus}) {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem('username');
        navigate('/');
        window.location.reload();
    };
    
    return (
        <>
            <header className="chat__mainHeader">
            </header>

            <div className="message__container">
                {messages.map((message) =>
                message.name === localStorage.getItem('username') ? (
                    <div className="message__chats" key={message.id}>
                    <p className="sender__name">You</p>
                    <div className="message__sender">
                        <p>{message.text}</p>
                    </div>
                    </div>
                ) : (
                    <div className="message__chats" key={message.id}>
                    <p>{message.name}</p>
                    <div className="message__recipient">
                        <p>{message.text}</p>
                    </div>
                    </div>
                )
                )}

                <div className="message__status">
                    <p>{typingStatus}</p>
                </div>

                <div ref={lastMessageRef} />
            </div>
        </>
    )
}