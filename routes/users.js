var models  = require('../models');
var express = require('express');
var router  = express.Router();
var passport = require('passport');

router.post('/create', function(req, res) {
  models.User.create({
    username: req.body.username,
    password: req.body.password,
    active: 0
  }).then(function(user) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      'message': 'success'
    }));
  });
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      'message': 'success'
    }));
  });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;
