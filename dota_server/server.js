var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
    request = require('request');

var nicknames = [];

app.use(express.static('public'))
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

server.listen('8000');
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.sockets.on('connection', function(socket){
  console.log('conneciton made');
  console.log(socket.id);
   
  socket.on('new user', function(data, callback){
    if (nicknames.indexOf(data) != -1) {
      callback(false);
    } else  {
      callback(true);
      socket.nickname = data;
      nicknames.push(socket.nickname);
      io.sockets.emit('usernames', nicknames);
    }
  });

  socket.on('create lobby', function(data) {

  })

  socket.on('sending message', function(data) {
    console.log('msg recieved: ' + data);
    io.sockets.emit('new message', data);
  })

  socket.on('message', function(data) {
    console.log('emitting nextTurn');
    socket.broadcast.emit('nextTurn', data);
  })

  socket.on('disconnect', function(data) {
    var user = nicknames.indexOf(socket.nickname);
    nicknames.splice(user,1);
    io.sockets.emit('usernames', nicknames);
  })
})

var api_key = '&api_key=b4b035202448418d961ce1f1be0bcf2b&q=';
var api = 'http://api.giphy.com/v1/gifs/search?'



app.get('/gifs', function(req, res) {
  console.log(req.query);
  var url = api + api_key + req.query.q;    
  console.log(url);
  var data;

  request(url, function (error, response, body) {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log(body);
    // console.log(JSON.parse(body));
    // data = body;
    res.setHeader('Content-Type', 'application/json');
    res.send(body);
  });  
});



