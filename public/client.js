var socket = io();

var el = document.getElementById('server-time');


// Display server time
socket.on('time', function(timeString) {
    el.innerHTML = 'Server time: ' + timeString;
});



socket.on('hello', function(message){
  document.getElementById('serverMessages').textContent = "" + message;
  
})

// Get the pseudo of the client from the server.
socket.on('newUser', function(userName) {
  console.log(userName);
})

// LogOn && logOff refresh list of user, and amount of user, display a message who said an user has been connected or disconnected to everyone

socket.on('logOn', function(count) {
  console.log(count.content + " Has logged in !")
  
  document.getElementById('amountUsers').textContent = "Users connected : " + count.amount;
  
  let result = ""

  for (let i = 0; i < count.users.length; i++) {
    
      result = result + "<br>"+ count.users[i] + "<br>";
    
  }

  document.getElementById("usersList").innerHTML = "<p id='amountUsers'> Users connected : " + count.amount + "</p>" + result;


})

socket.on('logOff', function(userName) {
  console.log(userName.content + " Has been disconnected")
  
  document.getElementById('amountUsers').textContent = "Users connected : " + userName.amount;
  
  let result = ""

  for (let i = 0; i < userName.users.length; i++) {
    
      result = result + "<br>"+ userName.users[i] + "<br>";
    
  }

  document.getElementById("usersList").innerHTML = "<p id='amountUsers'> Users connected : " + userName.amount + "</p>" + result;

})
