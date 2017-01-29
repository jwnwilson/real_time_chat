var models  = require('../models');
var config = require('../config/config');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.User.findAll({
    where: {
      activeDate: {
        $gt: new Date(new Date() - 5 * 60 * 1000)
      }
    }
  }).then(
    function(users) {
      var user;
      if(req.user){
        user = req.user;
      }
      res.render('home', {
        title: 'Real time chat',
        users: users,
        user: user,
        prod: config.prod
      });
    });
});

module.exports = router;
