var express = require('express');
var exphbs = require('express-handlebars');
var socket = require('socket.io');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./models');

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
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Configure the local strategy for use by Passport.
passport.use(new Strategy(
  function(username, password, cb) {
    db.User.findByUsername(username).then(function(user) {
      if (user == null) {
        return cb(null, false, { message: 'Incorrect credentials.' });
      }
      if(user.password == password){
        return cb(null, user);
      }

      return cb(null, false, { message: 'Incorrect credentials.' })
    });
  }));


// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.User.findById(id).then(function (user) {
    if (user == null) { 
      cb(null, false, { message: 'User not found.' }); 
    }
    cb(null, user);
  });
});

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
      socket.emit('message', {
        message: 'welcome to the chat',
        user: 'system'
      });
      socket.on('send', function (data) {
          io.sockets.emit('message', data);
      });
  });
}

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function () {
  start_server();
});
