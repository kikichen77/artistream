const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

app.use(cors());

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
      
    //Listens and logs the message to the console
    socket.on('message', (data) => {
      console.log(data);
    });

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
    
    //sends the message to all the users on the server 
    socket.on('message', (data) => {
      socketIO.emit('messageResponse', data);
    });
    
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});