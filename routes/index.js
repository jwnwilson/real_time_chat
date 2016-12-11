var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.User.findAll().then(
    function(users) {
      res.render('home', {
        title: 'Real time chat',
        users: users
      });
    });
});

module.exports = router;
