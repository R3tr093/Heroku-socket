# Heroku-socket

<img src="repo.png">

<hr>

<p> Hello, this repository talking about how to deploy and build a chat service working with <b>socket.io</b> on Heroku.</p>
<p> You should find some files with the .md extension for every upgrade, this read me will guide you to deploy your starting environment, but for that, there is some knowledge to have on <b>Javascript</b>, <b>NodeJS</b> and <b>NPM</b>, I will provide you all the information you need into this repository about socket.io </p>

<h3> :question: - What do you really need to know? </h3>

<br>

<ul>

<li> :thumbsup: The basics of Javascript</li>
<li> :thumbsup: The basics of Github</li>
<li> :thumbsup: The use of Node to create a backend, in our case with the help of express.</li>
<li> :thumbsup: Dependency management and what is a package.json</li>
<br><br>
<p><i> That's suppose you already installed Node and NPM on your computer, but if you wondering where you can get NodeJS, follow the link below.</i></p>
<p><i> :link: <a href="https://www.npmjs.com/get-npm" target="_blank">Download NodeJS and NPM </a> </i></p>


</ul>

<p> :hand: You also gonna need a heroku account, you can register yourself here <a href="https://signup.heroku.com/" target="_blank"> Register on Heroku </a></p>

<p>
Using <b>Heroku CLI</b> is really helpfull when you deploy your project on Heroku, I strongly recommend to use it, and in this tutorial all the instructions about deployement is made on the Heroku CLI, you can get the Heroku CLI by the command below.</p>

<code>sudo snap install --classic heroku </code>

<p> If your not using a Linux OS, I let you find an equals solution who make sense to you, you probably should take a look on <a href="https://devcenter.heroku.com/articles/heroku-cli" target="_blank"> Heroku CLI documentation</a>.</p>

# Let's deploy !


<p> Create a directory for your application, I named my directory <i>Heroku-socket </i> feel free to be more creative, and move into this directory.</p>

<p>Our first command  is : </p>

<code> npm init -y </code>

<p> Once this command is complete, you get a file named  <b>package.json</b> into your directory. </p>

<p> Now open your package.json with your favorite text editor, find the array " scripts " and add the following line <br>

<code> "start": "node server.js" </code>

<p> Check your NodeJS  version. </p>

<code> node -v </code>

<p> Insert this array and into it mention your own node and npm version </p>

<code>
"engines": {
  "node": "12.13.0"
}
</code>

<p>Ok, it's enough for the package.json, now create two files in the root of your directory named as <b>index.html</b> and <b>server.js</b></p>


<code> touch index.html && touch server.js </code>

<h3> :link: Install dependencies </h3>

<p>  :raised_hand: Before writing our code in these files we will some dependencies. </p>

<p>Open your terminal and type the instructions below </p>

<code>npm install --save express socket.io</code>

<p>Once this command is done express and socket.io is added to your dependencies into your package.json </p>

<h3> :link: Write first piece of code.</h3>

<img src="1.png">


<h3> index.html </h3>

```html
<p id='server-time'></p>
    
    <script src="/socket.io/socket.io.js"></script>
    
    <script>
      var socket = io();
      var el = document.getElementById('server-time');
      socket.on('time', function(timeString) {
        el.innerHTML = 'Server time: ' + timeString;
      });
    
    </script>
  
</body>
</html>
```

<hr>

<h3> server.js </h3>

```javascript
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
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
```

# :tada: First look ! 

<p>You can now test your application by running the node server.js command in your terminal. </p>

<code> npm start && node server.js </code>

<p>Your terminal must remain active and will stop and display information from the server,<br> when you connect to the address <a href="http://localhost:3000/" target="_blank">localhost: 3000</a> you will see your application and in your terminal a message appears indicating that a customer is connected If you log off, and you close the page, you will get a message stating that a client is offline.</p>


<p>Now we want to send our little page that will serve as a starting point for our chat on Heroku, it will be very simple and very short!</p>

# :rocket: Deploy on Heroku

<p> For this part, we suppose you have installed Heroku-CLI, if is not the case I let you find another way to this command that make sense to you.</p>

<p> Well, let's started with this command </p>

<code> heroku create </code>
<p><i> In this case, the name of your application is randomly generated and return an url such as https://hidden-crag-28698.herokuapp.com/ </i> </p>

<p><b>OR</b></p>

<code> heroku create example </code>
<p><i> In this case example is the name you want to provide to your application. This will return an url such as https://example.herokuapp.com/</i> </p>


<p>That should create an application on Heroku and return to you the URL where you can find your application, you also get an url for the repository of your new application.</p> 

<p>Let's follow with :  </p>

<code> git commit -am 'socket.io starting point' </code>

<p><i> Do a simple commit.</i></p>

<code>git push heroku master</code>

<p><i>Push your directory into the heroku repository of your application </i></p>

<p> At the end of this command you should see something like this : </p>

<img src="2.png">

#  :clap: Basic structure done !

<p> Now you have a basic structure to transform into an awesome chat service, the next step for you is to read the file named  <b>chat.md</b>

<p> You can find the state of the basic structure repository on the branch named <b>base</b> </p>
