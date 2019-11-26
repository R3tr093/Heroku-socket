var socket = io();


var el = document.getElementById('server-time');

let getMessage = document.getElementById('sentBtn');

let userName;

let users = []


// SERVER EVENTS

// Display server time
socket.on('time', function(timeString) {
    el.innerHTML = 'Server time: ' + timeString;
});

socket.on('hello', function(message){
  document.getElementById('serverMessages').innerHTML = "Hello, your logged in as : <button id='nameBtn'> " + message + " </button> welcome on our chat service have a good talking !";

  document.getElementById("nameBtn").addEventListener("click", ()=>{
  
    let newName = prompt("Enter a new name : ")
  
    while(newName.length < 2 || newName.length >20 )
    {
       newName = prompt("Enter a new name : ")
    }
  
    socket.emit('updateName',newName)
    
  
  })


})

socket.on('returnName',function(value){
  if(value === "X")
  {
    alert('nope')
  }

  else
  {

    let info = document.createElement("p");
  
    info.setAttribute("class", "infoOff");

  
    info.textContent = userName + " change his name for " + value.Name;
    
    document.getElementById("chat").prepend(info)


    userName = value.Name;

    let amount = String(value.List.length)

    document.getElementById('amountUsers').textContent = "Users connected : " + amount;
  
    let result = ""
  
    for (let i = 0; i < value.List.length; i++) {
      
      result = result + "<br><span class='ell'>"+ value.List[i] + "</span><br>";
      
    }
    document.getElementById('nameBtn').textContent =value.Name;
    document.getElementById("usersList").innerHTML = "<p id='amountUsers'> Users connected : " + amount + "</p>" + result;


  }
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


// When user click on the send btn in template

getMessage.addEventListener('click', () => {

  // We look if the message have more than 2 characters
  let message = document.getElementById('textArea').value

  // if yes we emit a newMessage for the server with the user pseudo and user message
  if(message.length > 1)
  {
    socket.emit("newMessage",{pseudo:userName, userMsg:message})
  }

  
  // And we clean the textarea of the message.
  document.getElementById('textArea').value = "";

})


// When server emit a request to type new message in the template
socket.on('typeMsg', function(values) {

  // We create a 'p' tag for the date we set some attribute to it, and adding the text content with the date value from the server.
  let dateElt = document.createElement("p");
  
  dateElt.setAttribute("class", "msgDates");

  dateElt.textContent = "Sent at " + values.date;
 
  // We add this in first position in the chat 
  document.getElementById("chat").prepend(dateElt)

  // Now we do the same for the message 
  let messageElt = document.createElement("p");
  
  messageElt.setAttribute("class", "messages");

  messageElt.innerHTML = "<span class='pseudos'>" + values.userName + " </span> : " + values.message + "</b>";
  
  document.getElementById("chat").prepend(messageElt)
  


})

// Rewrite history, make the client able to see the 100 last messages on the chat at the connections.
// This event is emitted by the server on user connection.
socket.on("rewrite", function(values){

  // Request the array with the value of the user name, date, and message content of the 100 last messages from the server.
  let messages = values.messages;
  users = values.users;
  let date = values.date;


  // If we got some data in the arrays we get from the server
  if(messages.length > 0 && users.length > 0)
  {
    let i = 0;

    // We running the array and for each entry we do this.
    for (let i = 0; i < users.length; i++) 
    {
      
      // Create a 'p' tag and set some attributes and give at textcontent value the date of the message
      let dateElt = document.createElement("p");
  
      dateElt.setAttribute("class", "msgDates");

      dateElt.textContent = "Sent at " + date[i];

      // Insert this in first postion on the chat
      document.getElementById("chat").prepend(dateElt)
    
      // Do the same for message and user name
      let messageElt = document.createElement("p");
  
      messageElt.setAttribute("class", "messages");
    
      messageElt.textContent = users[i] + " : " + messages[i]
     
      document.getElementById("chat").prepend(messageElt)
    
    }
  }



})