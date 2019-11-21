var socket = io();

var el = document.getElementById('server-time');


socket.on('time', function(timeString) {
    el.innerHTML = 'Server time: ' + timeString;
});

socket.on('hello', function(message){
  document.getElementById('serverMessages').textContent = "" + message.content;
  document.getElementById('amountUsers').textContent = "Users connected : " + message.amount;
})

socket.on('newUser', function(userName) {
  alert(userName)
})

socket.on('logOff', function(userName) {
  alert(userName.content + " Has been disconnected")
  document.getElementById('amountUsers').textContent = "Users connected : " + message.amount;
})
