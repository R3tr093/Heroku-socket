# Heroku-socket - Connections

<img src="repo.png">

<hr>

<h3>  :notebook: purpose of this branch </h3>

<p>On this branch we will take care of the following points : </p>

<p><i> :memo: Reacting to the arrival of a user. </i></p>

<p><i> :memo: Display a greeting in our client template. </i></p>

<p><i> :memo: Display an account of the total number of users connected. </i></p>

<p><i> :memo: And finally deploy our changes on Heroku. </i></p>


<p>Here we will see how to connect socket.io and synchronize our client with our server. </p>

<p> This part will be more informative than the previous one, I will try to explain each new line of code, to understand how socket.io works line by line, we already have a good example of that, let's take a first look on our <a href="server.js" target="_blank">server.js</a> file. </p>

<p> :warning: A little thing I will let you know, if you have not followed the construction guide of the starting environment, and you have download the repository, you can skip the sections concerning Heroku, and above all do not forget to make a <b>npm install </b> in the root of the directory to install the dependecies of our project.</p>

<h3> :computer: Understanding how work our socket server side. </h3>

``` javascript

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

let usersCount = 0;

io.on('connection', (socket) => {
  

  socket.on('disconnect', () => console.log('Client disconnected'));
});



setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

```