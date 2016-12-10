var express = require('express');
var exphbs = require('express-handlebars');
var io = require('socket.io');

var app = express();
var port = 3000;

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: 'views/layouts/',
  partialsDir: 'views/partials/'
}));
app.set('view engine', '.hbs');
//app.enable('view cache');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
    res.render('home');
});

//app.listen(port);
io.listen(app.listen(port));
console.log('Listening on port ' + port);
