var express = require("express");
var http = require("http");
var app = express();
var path = require('path')

app.set("views", __dirname + "/views");

app.set("view engine", "jade");

app.all("*", function(request, response, next) {
  console.log('all');
  //response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

//response.redirect方法
app.get("/baidu", function(request, response) {
  //redirect会调用 res.writeHead()）
  response.redirect("https://www.baidu.com/");
});
//response.sendFile方法
app.get("/image", function(request, response) {
   response.sendFile(path.join(__dirname,"public/images/flow.png"));
});

//response.sendFile方法
app.get("/render", function(request, response) {
    response.render("index", { message: "Hello World" });
});

app.get("/hello/:who", function(req, res) {
res.end("Hello, " + req.params.who + ".");
});

app.get('/eat/:who?',function(req,res) {
	if(req.params.id) {
    	res.end("eat, " + req.params.who + ".");
	}
    else {
    	res.send("eat, Guest.");
	}
});

app.get("*", function(request, response) {
  response.end("404!");
});
app.listen(8000,function(){
   console.log('Example app listening on port 8000.');
});
