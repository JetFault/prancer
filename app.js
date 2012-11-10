/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);


server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

io.sockets.on('connection', function (socket) {
	//socket.emit('news', { hello: 'world' });
	socket.on('motion', function (data) {
		//var pretty = "MOTION x: " + data.x + "\t\ty: " + data.y + "\t\tz: " + data.z;
		var pretty = data;
		console.log(pretty);
	});
	socket.on('debug_data', function(data) {
		console.dir(data);
	});
	socket.on('direction', function(data) {
		console.dir(data);
	});
	socket.on('orientation', function(data) {
//		var pretty = "ORIENTATION alpha: " + data.alpha + "\t\tbeta: " + data.beta + "\t\tgamma: " + data.gamma;
	//	console.log(pretty);
	});
});
