const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {cors: {
  origin: "http://localhost:5173"
}})

io.on('connection', socket => {
  
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('message', (data) => {
    console.log(data);
  });

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  })
})

server.listen(3000, () => {
  console.log(`Server listening on 3000`);
});