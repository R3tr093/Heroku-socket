# Heroku-socket - Emissions

<p> :warning: A little thing I will let you know, <b>if you have not followed the construction guide of the starting environment, and you have download the repository </b>, you can skip the sections concerning Heroku, and above all do not forget to make a <b>npm install </b> in the root of the directory to install the dependecies of our project.</p>

<img src="repo.png">

<hr>


<h3>  :notebook: purpose of this branch </h3>

<p>On this branch we will take care of the following points : </p>

<p><i> :memo: Generate a random name to an user. </i></p>

<p><i> :memo: Display an user message with his date time Day/Month/Year Hour/minute. </i></p>

<p><i> :memo: Display a message on the chat where an user is connected or disconnected. </i></p>

<p><i> :memo: Display list of users connected. </i></p>

<p><i> :memo: And finally, deploy our change on Heroku. </i> </p>

<p> Welcome on this branch, we gonna write the most importants functions of our applications, and also redefining a little bit our template elements organisation.</p>



<h3> :file_folder: Reorganization of our file. </h3>

<p> Well for my design i use <a href="https://getbootstrap.com/docs/4.3/layout/grid/"> Bootstrap </a> which is a responsive library, I use CDN to import bootstrap on my project, that should explain the following new line in our <a href="index.html">index.html</a></p>

``` html

 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

```  

<p> I don't gonna explain to you my CSS logic, because is not the objective of the repository, feel free to build your own design. </p>

<p>We would like to put our client script in a file and create a CSS file for our index, it would be more pleasant for us to store this in a folder, so we will create a public folder in the root of our project. </p>

<code> mkdir public </code><br>
<code> cd public </code><br>
<code> touch index.css && touch index.js </code><br>

<p>The important thing, is that your structure looks like this: </p>

<img src="1.png">

<p> This beautiful new structure requires some modifications to our server.js file, let me show you what's new </p>

``` javascript

'use strict';



// Nothing change before this...


process.env.PWD = process.cwd();
const PORT = process.env.PORT || 3000;
const server = express()

// When user is connected on the index, we send index.html as template
.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
})

// And we provide a folder named as 'public' who contains our client.js and index.css
.use(express.static(path.join(process.env.PWD, 'public')))


.listen(PORT, () => console.log(`Listening on ${ PORT}`))

const io = socketIO(server);

// Nothing change after this...

```

<p> I hope the comment has been helpful so everything is say. If your lost take a look on <a href="server.js">server.js</a>.</p>