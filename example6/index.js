var express = require('express');
var app = express();
var path = require('path')
// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 8000);

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

// 设定view engine变量，意为网页模板引擎
app.set('view engine', 'jade');

//app.use(express.favicon());
//app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);

// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问
// 网址则显示为http://localhost:3000/images
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
   res.sendfile('./views/index.html');
});
app.get('/api', function(request, response) {
   response.send({name:"张三",age:40});
});
app.get('/about', function(req, res) {
   res.sendfile('./views/about.html');
});

app.get('/article', function(req, res) {
   res.sendfile('./views/article.html');
});


app.listen(app.get('port'),function(){
   console.log('Example app listening on port 8000.');
});
