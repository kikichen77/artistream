import React, { useState } from 'react';

export default function ChatFooter({socket}) {
  const [message, setMessage] = useState('');

  const handleTyping = () =>
    socket.emit('typing', `${localStorage.getItem('username')} is typing`);


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
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">Send</button>
      </form>
    </div>
  );
};