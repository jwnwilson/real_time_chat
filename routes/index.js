var models  = require('../models');
var express = require('express');
var router  = express.Router();

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
        user: user
      });
    });
});

module.exports = router;
