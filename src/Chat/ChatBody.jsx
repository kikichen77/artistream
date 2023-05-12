import styles from "./ChatBoxStyles.module.css"
import React from 'react';

// ChatBody holds the chat from users
export default function ChatBody({messages, lastMessageRef, typingStatus}) {
    return (
        <>
            <div className={styles.chatboxDisplay}>
                {messages.map((message) =>
                message.socketID === sessionStorage.getItem("id") ? (
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
