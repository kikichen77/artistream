<<<<<<< HEAD
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
  //canvas backend
  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });
  socket.on("add-rectangle", (data) => {
    socket.broadcast.emit("add-rectangle", data);
  });

  socket.on("add-circle", (data) => {
    socket.broadcast.emit("add-circle", data);
  });

  socket.on("add-triangle", (data) => {
    socket.broadcast.emit("add-triangle", data);
  });

  socket.on("undo", (data) => {
    socket.broadcast.emit("undo", data);
  });

  socket.on("clear", () => {
    socket.broadcast.emit("clear");
  });

  socket.on("add-text", (data) => {
    socket.broadcast.emit("add-text", data);
  });
  socket.on("text-updated", (data) => {
    socket.broadcast.emit("text-updated", data);
  });
  socket.on("object-moving", (data) => {
    socket.broadcast.emit("object-moving", data);
  });
});

server.listen(3000, () => {
  console.log(`Server listening on 3000`);
});
=======
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {cors: {
  origin: "http://localhost:5173"
}})

io.on('connection', socket => {

  socket.on('message', (data) => {
    io.emit('messageResponse', data);
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
>>>>>>> def742ef236e614425bc3d32a85e09605938febc
