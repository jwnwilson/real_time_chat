var express = require('express');
var exphbs = require('express-handlebars');
var socket = require('socket.io');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var models = require("./models");
var routes = require('./routes/index');
var users  = require('./routes/users');

var app = express();
var port = 3000;

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: 'views/layouts/',
  partialsDir: 'views/partials/'
}));
app.set('view engine', '.hbs');
app.set('trust proxy', 1); // trust first proxy
app.use(cookieParser());
app.use(session({
  secret: 'super_secret_squrriel',
  cookie: {
    maxAge: 60000
  }
}));
//app.enable('view cache');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(__dirname + '/static'));
app.use('/', routes);
app.use('/users', users);

function start_server(){
  //app.listen(port);
  var io = socket.listen(app.listen(port));
  console.log('Listening on port ' + port);

  io.sockets.on('connection', function (socket) {
      socket.emit('message', { message: 'welcome to the chat' });
      socket.on('send', function (data) {
          io.sockets.emit('message', data);
      });
  });
}

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function () {
  start_server();
});
