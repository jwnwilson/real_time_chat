var db = require('../models');
var socket = require('socket.io');

module.exports = {
  startServer: function startServer(app, port){
    //app.listen(port);
    var io = socket.listen(app.listen(port));
    console.log('Listening on port ' + port);

    io.sockets.on('connection', function (socket) {
        socket.emit('message', {
          message: 'Welcome to the chat',
          username: 'System'
        });
        socket.on('send', function (data) {
          if(data.username){
            db.User.setActive(data.username, new Date());
          }
          io.sockets.emit('message', data);
        });
    });
  }
}
