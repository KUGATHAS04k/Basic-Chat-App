const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));


io.on("connection", (socket) => {
  
  console.log("a user connected");

  socket.emit("message", 'Welcome to MERN');
  socket.broadcast.emit('message' , "A new User Joined!")

  socket.on("sendMessage", (msg,callback) => {
    io.emit('message', msg)
    callback('delivered!')
  });

  socket.on('sendLocation',(coords) => {
    io.emit('message',`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`)
  })

  socket.on('disconnect', ()=> {
    io.emit('message', 'A user Log Out')
  })
});

server.listen(port, () => {
  console.log(`server is up on port ${port} `);
});
