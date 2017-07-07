import express from 'express';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from './webpack.config.js';
import webpack from 'webpack';
var formidable = require('formidable');


var app = express();

const compiler = webpack(webpackDevConfig);
app.use(express.static('public'));
app.use(express.static('dist'));


// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));


app.get('/',function(req,res){
   res.sendFile(path.join(__dirname,'./src/app.html'));
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
