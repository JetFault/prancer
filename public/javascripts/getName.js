$(document).ready(function (){
    var url = "http://" + window.location.host;
    var socket = io.connect(url);
    socket.emit('clientsconnect');
});
