var url = "http://" + window.location.host;
var socket = io.connect(url);

socket.on('check_hit', function(direction, fn) {
	var correct_dir = correctDirection;
	var points = 0;
	if(direction.up && correctDirection.indexOf('up') ) {
		points += 50;
	}
	if(direction.right && correctDirection.indexOf('right') ) {
		points +=50;
	}
	if(direction.left && correctDirection.indexOf('left') ) {
		points +=50;
	}
	if(direction.down && correctDirection.indexOf('down') ) {
		points +=50;
	}
	fn(points);
});
