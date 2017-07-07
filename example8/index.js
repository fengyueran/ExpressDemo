var express = require('express');
var app = express();

var myRouter = require('./routes/articlerooter');

app.use('/', myRouter);



app.listen(8000,function(){
   console.log('Example app listening on port 8000.');
});
