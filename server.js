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

let messagesBackup = []

let userMessageBackup = []

let dateBackup = []

function getRandomInt(max) {

  return Math.floor(Math.random() * Math.floor(max));

}








io.on('connection', (socket) => {
  
  // Provide random userName, and push it into an array.

  let userName = nameStuffList[getRandomInt(nameStuffList.length)]

  userName = userName + nameList[getRandomInt(nameList.length)]

  userName = userName + String(getRandomInt(999))

 // Ensure we can't get two equals userName. ( Even if the probability is really weak ! )
  for (let i = 0; i < users.length; i++) {
    
    if(users[i] === userName)
      {
        userName = nameStuffList[getRandomInt(nameStuffList.length)]

        userName = userName + nameList[getRandomInt(nameList.length)]

        userName = userName + String(getRandomInt(999))
      }
  }

  socket.pseudo = userName;

  users.push(userName)

  hello = "Hello, your logged in as : " + userName + " welcome on our chat service have a good talking !";

 

  // Increment users amount 
  
  amountUser++;
  
  amountUser = String(amountUser)

  // Emit data with user name add new amountUser value to EVERYONE.
  io.emit("logOn",{content: userName, amount: amountUser, users: users })

  // Greetings to arrival for the client
  socket.emit("hello",socket.pseudo)

  socket.on('updateName',function(value){

    value = ent.encode(value)

    let check = false;

    for( var i = 0; i < users.length; i++){ 
   
      if ( users[i] === value) {
     
        check = true
        socket.emit('returnName',"X")
        
     
      }

     }

     if(check === false)
     {

      for( var i = 0; i < users.length; i++){ 
   
        if ( users[i] === socket.pseudo) {
       
          users.splice(i, 1);
          users.push(value)
           
         
       
        }
  
       }
       
       
       socket.emit('returnName',{List: users, Name: value})
       io.emit("newList",{list: users,amount: amountUser,oldName: socket.pseudo,Name: value})
       socket.pseudo = value  
     }



    

    

  })
  
  // Emit for the client an event newUser
  socket.emit("newUser",(socket.pseudo))

 



  // Broadcast messages
  socket.on('newMessage',(socket) => {
    
      socket.userMsg = ent.encode(socket.userMsg)

      var d = new Date();
      var n = d.toLocaleTimeString();

    io.emit("typeMsg",{userName: socket.pseudo, message: socket.userMsg, date: n})


        // If the arrays contains more than 100 entry remove the last entry 
        if(messagesBackup.length > 100 && userMessageBackup.length > 100 && dateBackup.length > 100)
        {
          messagesBackup.pop()
          userMessageBackup.push(pop)
          dateBackup.push(pop)
        }
    
        // And then push the new entry at last position in the array
          messagesBackup.push(socket.userMsg)
          userMessageBackup.push(socket.pseudo)
          dateBackup.push(n)

  })

  socket.emit("rewrite",{messages: messagesBackup, users: userMessageBackup, date: dateBackup})

  // On client disconnection
  socket.on('disconnect', () => {
  


  // Running the array and remove is name. 
  
  for( var i = 0; i < users.length; i++){ 
   
    if ( users[i] === socket.pseudo) {
   
      users.splice(i, 1); 
   
    }
   }

  // Decrement user
  amountUser--;

  // Emit data with user name add new amountUser value to EVERYONE.
  io.emit("logOff",{ content: socket.pseudo, amount: amountUser, users: users})

  
  
  });


});




setInterval(() => io.emit('time', new Date().toTimeString()), 1000);