var isEmpty = function(obj) {
  var p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      return false;
    }
  }
  return true;
};

var url = "http://" + window.location.host;
var socket = io.connect(url);

var current_read = 0;
var interval_threshold = 200;
var avg_acc = {x:0, y:0, z:0};
var num_intervals = 0;

window.addEventListener('devicemotion', function(event) {
  var a = event.acceleration;

  /* Bound our acceleration */
  if(a.x > 0) {
    a.x = Math.min(a.x, 15);
  } else {
    a.x = Math.max(a.x, -15);
  }
  if(a.y > 0) {
    a.y = Math.min(a.y, 15);
  } else {
    a.y = Math.max(a.y, -15);
  }

  avg_acc.x += a.x;
  avg_acc.y += a.y;

  num_intervals++;

  var interval = event.interval * 1000;

  current_read = current_read + interval;

  // Only read every threshold milliseconds
  if(current_read >= interval_threshold) {
    current_read = 0

      a.x = avg_acc.x / num_intervals;
    a.y = avg_acc.y / num_intervals;

    num_intervals = 0;

    var direction = {};
    var threshold = 5;

    if(a.x > threshold) {
      direction.right = true;
    }
    if(a.x < -threshold) {
      direction.left = true;
    }
    if(a.y > threshold) {
      direction.up = true;
    }
    if(a.y < -threshold) {
      direction.down = true;
    }


    if(!isEmpty(direction)) {
      socket.emit('direction', direction);
    }

  }

});

window.addEventListener('deviceorientation', function(event) {
  socket.emit('orientation', 
    { "alpha": event.alpha, 
      "beta" : event.beta, 
    "gamma": event.gamma
    }
    );

}, true);
