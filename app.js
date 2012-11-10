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
  //app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.studio_index);
app.get('/player', routes.phone_index);


server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

var scores = {};
io.sockets.on('connection', function (socket) {
	/* Debug */
	socket.on('debug_data', function(data) {
		console.dir(data);
	});

	socket.on('clientsconnect', function() {
    scores['socket'] = {"score": 0};
	});

	/* Talk to Phone */
//	socket.on('motion', function (data) {
		//var pretty = "MOTION x: " + data.x + "\t\ty: " + data.y + "\t\tz: " + data.z;
	//	var pretty = data;
//		console.log(pretty);
//	});

	socket.on('direction', function(direction) {
    //console.dir(data);
    
		// Ask music player if we are right!
		socket.emit('check_hit', direction);
    /*
      scores[socket].score = scores[socket].score + points;

      console.log(points);
		});*/
	});

  socket.on('sent_score', function(points) {
    console.log("derp");
      scores[socket].score = scores[socket].score + points;

      console.log(points);
  });
	
//	socket.on('orientation', function(data) {
//		var pretty = "ORIENTATION alpha: " + data.alpha + "\t\tbeta: " + data.beta + "\t\tgamma: " + data.gamma;
	//	console.log(pretty);
//	});
	/* Talk to Phone End */


	/* Talk to Studio*/
/*	socket.on('point_gain', function(data) {
		var user = data.user;
	});
*/	/* Talk to Studio End */



});
