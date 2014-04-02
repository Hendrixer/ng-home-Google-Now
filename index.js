var app       = require('./server/server.js'),
    server    = app.listen(app.get('port')),
    io        = require('socket.io').listen(server);

io.set('log level', 1);
io.sockets.on('connection', function(socket){
  require('./server/sockets/socketRoutes.js')(socket, io);
});



console.log('Listening on ' + app.get('url') + ':' + app.get('port'));