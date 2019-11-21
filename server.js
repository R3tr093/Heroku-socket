'use strict';

const express = require('express');
const socketIO = require('socket.io');
const ent = require('ent');

const path = require('path');

process.env.PWD = process.cwd();
const PORT = process.env.PORT || 3000;
const server = express()


.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
})

.use(express.static(path.join(process.env.PWD, 'public')))


.listen(PORT, () => console.log(`Listening on ${ PORT}`))

const io = socketIO(server);



let amountUser = 0;

let hello = "Hello, welcome on our chat service have a good talking !";

// Server provide a random name :

let nameList = ["Strawberry","Pineapple","Pink","Tiger","Wolf","Hero","Legend","Otter","Kitten"];

let nameStuffList = ["Angry","Anxious","Curious","Sleeping","Incredible","Tiny","Big","Invisible"];

let users = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


io.on('connection', (socket) => {
  
  // Provide random userName, and push it into an array.

  let userName = nameStuffList[getRandomInt(nameStuffList.length)]

  userName = userName + nameList[getRandomInt(nameList.length)]

  userName = userName + String(getRandomInt(999))

  users.push(userName)

 

  // Increment users amount 
  
  amountUser++;
  
  amountUser = String(amountUser)


  // Greetings to arrival
  io.emit("hello",{ content: hello, amount: amountUser })
  
  // Emit for the client an event newUser
  io.emit("newUser",(userName))

  // On client disconnection
  socket.on('disconnect', () => {
  
  // Running the array and remove is name.  
  for (let i = 0; i < users.length; i++) {
    
    if(users[i] === userName)
      {
        users.pop(i);
      }
    }

    console.log(users)

  // Decrement user
  amountUser--;

  io.emit("logOff",{ content: userName, amount: amountUser })
  
  });

});



setInterval(() => io.emit('time', new Date().toTimeString()), 1000);