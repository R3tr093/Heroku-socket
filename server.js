'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const server = express()


.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
})

.use(express.static('public'))

.listen(PORT, () => console.log(`Listening on ${ PORT}`))

const io = socketIO(server);

let amountUser = 0;

let hello = "Hello, welcome on our chat service have a good talking !"

io.on('connection', (socket) => {
  
  amountUser++;
  amountUser = String(amountUser)

  io.emit("hello",{ content: hello, amount: amountUser })

  socket.on('disconnect', () => {
  
  amountUser--;
  io.emit("hello",{ content: hello, amount: amountUser })
  
  });

});



setInterval(() => io.emit('time', new Date().toTimeString()), 1000);