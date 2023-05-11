import styles from "./ChatBoxStyles.module.css"
import React, { useState } from 'react';

export default function ChatFooter({socket}) {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(socket.id)
    if (message.trim() && sessionStorage.getItem('username')) {
        socket.emit('message', {
            text: message,
            name: sessionStorage.getItem('username'),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className={styles.chatboxFooter}>
      <form className={styles.chatboxForm} onSubmit={handleSendMessage} autoComplete="off">
        <input 
          id="textfield" 
          name="textfield" 
          type="text" 
          placeholder="Message the room..."
          className={styles.chatboxForm}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.chatboxBtn}>Send</button>
      </form>
    </div>
  );
};
