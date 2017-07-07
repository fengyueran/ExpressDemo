
var express = require('express');
var app = express();

// 加载hbs模块
var hbs = require('hbs');
// 加载数据模块
var blogEngine = require('./blog');
// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);

app.get('/', function(req, res) {
   res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});

app.get('/about', function(req, res) {
   res.render('about', {title:"自我介绍"});
});

app.get('/article/:id', function(req, res) {
   var entry = blogEngine.getBlogEntry(req.params.id);
   res.render('article',{title:entry.title, blog:entry});
});


app.listen(8000,function(){
   console.log('Example app listening on port 8000.');
});
