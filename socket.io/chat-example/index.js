var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var dict = {};

app.get('/', function(req, res){
    console.log(__dirname);
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    //io.emit('chat message', msg);
    socket.broadcast.emit('chat message', dict[socket] + " : " + msg);
    
  });

  socket.on('new user', function(msg){
    console.log('user joined: ' + msg);
    dict[socket] = msg;
    io.emit('user joined', msg + " joined");
  });

  socket.broadcast.emit('hi');  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});