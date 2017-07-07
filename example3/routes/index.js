module.exports = function (app) {
  app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
  });

  app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello world!\n");
  });

  app.get('/', function (req, res) {
    res.send('Hello world1');
  });
  app.get('/customer', function(req, res){
    res.send('customer page');
  });
  app.get('/admin', function(req, res){
    res.send('admin page');
  });
};
