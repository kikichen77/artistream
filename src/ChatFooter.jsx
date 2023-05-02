import styles from "./ChatBoxStyles.module.css"
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function ChatFooter({socket}) {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('username')) {
        socket.emit('message', {
            text: message,
            name: localStorage.getItem('username'),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className={styles.chatboxFooter}>
      <form className={styles.chatboxForm} onSubmit={handleSendMessage}>
        <TextField 
          className={styles.textField} 
          label="Message the room" 
          variant="filled" 
          size="small"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.chatboxBtn}>Send</button>
      </form>
    </div>
  );
};