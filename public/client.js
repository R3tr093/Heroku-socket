var socket = io();

var el = document.getElementById('server-time');



socket.on('time', function(timeString) {
    el.innerHTML = 'Server time: ' + timeString;
});

socket.on('hello', function(message){
  document.getElementById('serverMessages').textContent = "" + message;
  
})


socket.on('newUser', function(userName) {
  alert(userName);
})

socket.on('logOn', function(count) {
  alert(count.content + " Has logged in !")
  
  document.getElementById('amountUsers').textContent = "Users connected : " + count.amount;
  
  let result = ""

  for (let i = 0; i < count.users.length; i++) {
    
      result = result + "<br>"+ count.users[i] + "<br>";
    
  }

  document.getElementById("usersList").innerHTML = "<p id='amountUsers'> Users connected : " + count.amount + "</p>" + result;


})

socket.on('logOff', function(userName) {
  alert(userName.content + " Has been disconnected")
  
  document.getElementById('amountUsers').textContent = "Users connected : " + userName.amount;
  
  let result = ""

  for (let i = 0; i < userName.users.length; i++) {
    
      result = result + "<br>"+ userName.users[i] + "<br>";
    
  }

  document.getElementById("usersList").innerHTML = "<p id='amountUsers'> Users connected : " + userName.amount + "</p>" + result;

})
