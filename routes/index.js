var models  = require('../models');
var config = require('../config/config');
var express = require('express');
var router  = express.Router();
var prod = true;

router.get('/', function(req, res) {
  models.User.findAll().then(
    function(users) {
      var user;
      if(req.session.user){
        user = req.session.user;
      }
      res.render('home', {
        title: 'Real time chat',
        users: users,
        user: user,
        prod: config.env
      });
    });
});

module.exports = router;
