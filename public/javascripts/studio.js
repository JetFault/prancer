var url = "http://jetfault.com:3000";
var socket = io.connect(url);

socket.on('check_hit', function(direction) {
	var correct_dir = correctDirection;
	var points = 50;
	if(direction.up && correct_dir.indexOf('up') !== -1 ) {
		points += 50;
	}
	if(direction.right && correct_dir.indexOf('right') !== -1) {
		points +=50;
	}
	if(direction.left && correct_dir.indexOf('left') !== -1) {
		points +=50;
	}
	if(direction.down && correct_dir.indexOf('down') !== -1) {
		points +=50;
	}
  console.log(points);
  socket.emit("sent_score", points);
});
