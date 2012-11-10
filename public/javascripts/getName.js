$(document).ready(function (){

  $('#name').click(function(){
    name = $('#user').val();
  });

  var url = "http://" + window.location.host;
  var socket = io.connect(url);

  socket.on('connect', function(){
    socket.emit('clientsconnect', name);
/*    socket.on('ready', function () {
      console.log('Connected !');
    }); */
  });
});
