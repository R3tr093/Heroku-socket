var socket = io();


var el = document.getElementById('server-time');

let getMessage = document.getElementById('sentBtn');

let userName;

// SERVER EVENTS

// Display server time
socket.on('time', function(timeString) {
    el.innerHTML = 'Server time: ' + timeString;
});

socket.on('hello', function(message){
  document.getElementById('serverMessages').textContent = "" + message;
  
})

// Get the pseudo of the client from the server.
socket.on('newUser', function(val) {
  userName = val;
  
})

// LogOn && logOff refresh list of user, and amount of user, display a message who said an user has been connected or disconnected to everyone

socket.on('logOn', function(count) {
  
  let info = document.createElement("p");
  
  info.setAttribute("class", "infoOn");
  
  info.textContent = count.content + " joined the party !";
  
  document.getElementById("chat").prepend(info)
  
  document.getElementById('amountUsers').textContent = "Users connected : " + count.amount;
  
  let result = ""

  for (let i = 0; i < count.users.length; i++) {
    
    result = result + "<br><span class='ell'>"+ count.users[i] + "</span><br>";
    
  }

  document.getElementById("usersList").innerHTML = "<p id='amountUsers'> Users connected : " + count.amount + "</p>" + result;

})

socket.on('logOff', function(userName) {

  let info = document.createElement("p");
  
  info.setAttribute("class", "infoOff");
  
  info.textContent = userName.content + " Has been disconnected.";

  document.getElementById("chat").prepend(info)
  
  document.getElementById('amountUsers').textContent = "Users connected : " + userName.amount;
  
  let result = ""

  for (let i = 0; i < userName.users.length; i++) {
    
      result = result + "<br><span class='ell'>"+ userName.users[i] + "</span><br>";
    
  }

  document.getElementById("usersList").innerHTML = "<p id='amountUsers'> Users connected : " + userName.amount + "</p>" + result;

})


// CLIENTS MESSAGES EMISSIONS

getMessage.addEventListener('click', () => {

  let message = document.getElementById('textArea').value

  if(message.length > 1)
  {
    socket.emit("newMessage",{pseudo:userName, userMsg:message})
  }

  

  document.getElementById('textArea').value = "";

})

socket.on('typeMsg', function(values) {

  let dateElt = document.createElement("p");
  
  dateElt.setAttribute("class", "msgDates");

  dateElt.textContent = "Sent at " + values.date;
 
  document.getElementById("chat").prepend(dateElt)

  let messageElt = document.createElement("p");
  
  messageElt.setAttribute("class", "messages");

  messageElt.textContent = values.userName + " : " + values.message
 
  document.getElementById("chat").prepend(messageElt)
  


})

// Rewrite history

socket.on("rewrite", function(values){


  let messages = values.messages;
  let users = values.users;
  let date = values.date;


  if(messages.length > 0 && users.length > 0)
  {
    let i = 0;

    for (let i = 0; i < users.length; i++) 
    {
      let dateElt = document.createElement("p");
  
      dateElt.setAttribute("class", "msgDates");

      dateElt.textContent = "Sent at " + date[i];

      document.getElementById("chat").prepend(dateElt)
    
      let messageElt = document.createElement("p");
  
      messageElt.setAttribute("class", "messages");
    
      messageElt.textContent = users[i] + " : " + messages[i]
     
      document.getElementById("chat").prepend(messageElt)
    
    }
  }



})
