# Heroku-socket - Emissions

<p> :warning: A little thing I will let you know, <b>if you have not followed the construction guide of the starting environment, and you have download the repository </b>, you can skip the sections concerning Heroku, and above all do not forget to make a <b>npm install </b> in the root of the directory to install the dependecies of our project.</p>

<img src="repo.png">

<hr>


<h3>  :notebook: purpose of this branch </h3>

<p>On this branch we will take care of the following points : </p>

<p><i> :memo: Receive messages on server</i></p>

<p><i> :memo: Secure all messages, and add a date for every messages sent. </i></p>

<p><i> :memo: Broadcasting every messages by rewriting the dom. </i></p>

<p><i> :memo: And finally, deploy our change on Heroku. </i> </p>

<p> Welcome on this branch, we gonna write the most importants functions of our applications, and also redefining a little bit our template elements organisation.</p>



<h3>  :question:  How it works ? </h3>

<hr>

<p>It's really easy, we listen to a message from an user, and we gonna use <b> ent </b> a new package that allow us to secure message from malicious javascript insertion on server.</p>

<p>When the message is receveived securely we use array to keep an eye on the 100 last messages, then we can show to an user who just has come what is been saying in the 100 messages before his connection, sound good right ?</p>

<p>A last thing, we want to create a date for each messages, and when we got all of this we can broadcast a rewriting of the dom ! </p>

<p>So let's code !, my entire folder and the files which is contain is actually the same from the branch name : <a href="https://github.com/R3tr093/Heroku-socket/tree/emissions">emissions</a></p>


<h3>  :construction_worker: Build and Build</h3>

<p>Okay, so now we know what we want to do, and for that we have to create a new area in our html template, so open <a href="index.html">index.html</a></p>

<p>After the div named chat i added a new element named userFrame, take a lokk on it. </p>

``` html

<html>

    <head>

        <link href="index.css" rel="stylesheet" type="text/css" >
        <link href="bootstrap-4.3.1-dist/css/bootstrap-grid.min.css" rel="stylesheet" type="text/css">
        
    </head>

  <body>

    <div class="d-none d-md-block col-1" id="usersList">

        <p id="amountUsers"></p>

    </div>
    

    <div class="container">
          
      <div class="row">
           

      
            <div class="col-lg-10 col-md-10 col-xs-12 col-sm-12" id="main">
               
                <p id='server-time'></p>
      
                <p id="serverMessages"></p>

                <hr>

                <div id="chat">

                </div>
             
                <!-- Here the new element we insert -->

                <hr>
                
                <div id="userFrame">


                  <label for="textArea">Write your message here : </label>
                  <textarea class="form-control" id="textArea" rows="3"></textarea>
                  <button type="button" class="btn btn-primary btn-lg btn-block" id="sentBtn">Sent the message</button>

                </div>

                
      
            </div>

      
      </div>
  
    </div>

  
    <!-- JAVASCRIPT -->
    
    <script src="/socket.io/socket.io.js"></script>
    <script src="client.js"></script>
  
</body>
</html>


```

<p> And surprise theses new changes on our template come with new changes for our css too ! Nothing really important to explain there i just give the code who setting my template for working on the same view.</p>

``` css

body
{
    margin: 0px;
    height: 100vh;
    overflow: hidden;
    display: flex;
}

#main
{
  
  border: 1px solid black;
  text-align: center;

}

#userList
{
    position: absolute;
    left: 10px;
    top: 0vh;
    overflow-y: auto;
    width: 5%;


}

.ell
{
    font-size: normal;
    word-break: break-word;
}

.userMessages
{
    text-align: left;
}

p.infoOn
{
    text-align: left;
    font-style: italic;
    color: green;
}

p.infoOff
{
    text-align: left;
    font-style: italic;    
    color: red;

}

textarea
{
    max-width: 90%;
    width: 90%;
    min-width: 90%;
    margin: 5%;
    margin-top: 3%;
    height: 20vh;
    max-height: 20vh;
    padding: 8px;
}

#sentBtn
{
    background-color: #1a73e8;
    color: white;
    text-align: center;
    width: 90%;
    position: relative;
    top: -30px;
    padding-bottom: 10px;
    padding-top: 10px;
    border-color:  #1a73e8;
    border-radius: 6px;

}

#sentBtn:hover
{
    background-color: #1a73e8;
    color: white;
    box-shadow: 1px 2px 1px 2px lightgray;
    text-align: center;
    width: 90%;
    position: relative;
    top: -30px;
    padding-bottom: 10px;
    padding-top: 10px;
    cursor: pointer;
    -webkit-box-shadow: 10px 10px 73px -17px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 73px -17px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 73px -17px rgba(0,0,0,0.75);

}

```