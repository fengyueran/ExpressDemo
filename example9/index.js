var express = require('express');
var app = express();
var formidable = require('formidable');

app.get('/',function(req,res){
   res.sendfile('./index.html');
});
app.get('/app',function(req,res){
   res.sendfile('./app.html');
});
app.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "uploads/";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end();
        console.log("parse done");
        //console.log(files);
    });
});

app.listen(8000,function(){
   console.log('Example app listening on port 8000.');
});
