'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

let hello = "Hello, welcome on our chat service have a good talking !"

io.on('connection', (socket) => {
  
  io.emit("hello",hello)

  socket.on('disconnect', () => console.log('Client disconnected'));
});



setInterval(() => io.emit('time', new Date().toTimeString()), 1000);