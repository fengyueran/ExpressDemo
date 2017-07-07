var express = require('express');
var app = express();
//var routes = require('./routes')(app);
var routes = require('./routes/userroute')(app);

app.listen(8000,function(){
   console.log('Example app listening on port 8000.');
});
