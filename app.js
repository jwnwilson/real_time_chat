var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var exphbs = require('express-handlebars');
var flash = require('express-flash');
var passport = require('passport');
var session = require('express-session');

var auth = require('./core/auth');
var db = require('./models');
var routes = require('./routes/index');
var users  = require('./routes/users');
var websocket = require('./core/websocket');

var app = express();
var port = (process.env.PORT || 5000);

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
app.use(flash());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

auth.setUpPassport(passport);

//app.enable('view cache');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(__dirname + '/static'));
app.use('/', routes);
app.use('/users', users);

// sync() will create all table if they doesn't exist in database
db.sequelize.sync().then(function () {
  // Setup websockets for chat
  websocket.startServer(app, port);
});

module.exports = app;
