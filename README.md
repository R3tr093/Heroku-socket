# Heroku-socket - Connections

<p> :warning: A little thing I will let you know, <b>if you have not followed the construction guide of the starting environment, and you have download the repository </b>, you can skip the sections concerning Heroku, and above all do not forget to make a <b>npm install </b> in the root of the directory to install the dependecies of our project.</p>

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

io.on('connection', (socket) => {
  

  socket.on('disconnect', () => console.log('Client disconnected'));
});



setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

```

<p> About the line who said : </p>

<code> const path = require('path'); </code><br>
<code> const socketIO = require('socket.io'); </code><br>
<code> const path = require('path'); </code><br>

<p> They import the modules we need and keep them in constants, which we will use to use the features of these modules. </p>

<hr>

<code> const PORT = process.env.PORT || 3000; </code> <br>
<code> const INDEX = path.join(__dirname, 'index.html');</code> <br>

<p> Store in two constants, on the one hand the port of entry of our server, which will be either process.env for heroku and for us in local the port 3000. <br>

and on the other hand the path to our template index.html </p>

<hr>

``` javascript

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

```

<p> These lines of codes simplified way, allow to load our file index.html as template client when a client will arrive on our application. </p>

<hr>

<code> const io = socketIO(server); </code>

<p> Simplified way anytime, this line generates an instance of socket.io for our server which is passed to it as parameter </p>

``` javascript

io.on('connection', (socket) => {
  
  console.log("Client connected")

  socket.on('disconnect', () => console.log('Client disconnected'));
});

``` 

<p>Contains the instructions to produce when a client connects to our server. </p>

<hr>