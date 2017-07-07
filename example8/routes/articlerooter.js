var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});
router.param('name', function(req, res, next, name) {
	// 对name进行验证或其他处理……
	console.log(name);
	req.name = name;
	next();
});

router.get('/', function(req, res) {
  res.send('首页');
});

router.get('/about', function(req, res) {
  res.send('关于');
});



router.get('/hello/:name', function(req, res) {
	res.send('hello ' + req.name + '!');
});

module.exports = router;
