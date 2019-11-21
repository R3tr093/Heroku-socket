var socket = io();

var el = document.getElementById('server-time');


socket.on('time', function(timeString) {
    el.innerHTML = 'Server time: ' + timeString;
});

socket.on('hello', function(message){
  document.getElementById('serverMessages').textContent = "" + message.content;
  document.getElementById('amountUsers').textContent = "Users connected : " + message.amount;

})
