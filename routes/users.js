var models  = require('../models');
var express = require('express');
var router  = express.Router();
var passport = require('../auth');

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
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.post('/signin', function(req, res) {
  models.User.find({
    username: req.body.username
  }).then(function(user) {
    if(user){
      req.session.user = user;
      req.session.save();
      user.active = 1;
      user
        .save()
        .then(function(user){
          res.redirect('/');
        })
        .error(function(user){
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            'error': 'User not active.'
          }));
        });
    }
    else{
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        'error': 'User not found.'
      }));
    }
  });
});

router.post('/signout', function(req, res) {
  models.User.find({
    username: req.body.username
  }).then(function(user) {
    if(user){
      req.session.user = undefined;
      user.active = 0;
      user
        .save()
        .then(function(user){
          res.redirect('/');
        })
        .error(function(user){
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            'error': 'User still active.'
          }));
        });
    }
    else{
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        'error': 'User not found.'
      }));
    }
  });
});

module.exports = router;
