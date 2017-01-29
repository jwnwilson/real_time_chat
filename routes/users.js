var models  = require('../models');
var express = require('express');
var router  = express.Router();
var passport = require('passport');

router.post('/create', function(req, res) {
  models.User.findByUsername(req.body.username).then(function(user){
    if(user == null){
      models.User.create({
        username: req.body.username,
        activeDate: null
      }).then(function(user) {
        user.setPassword(req.body.password);
        req.flash('info', 'New user successfully created.');
        res.redirect('/');
      });
    }
    else{
      req.flash('info', 'User already exists.');
      res.redirect('/');
    }
  });
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    req.flash('info', 'User deleted.');
    res.redirect('/');
  });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    models.User.setActive(req.user.username, new Date());
    res.redirect('/');
  });

router.get('/logout',
  function(req, res){
    models.User.setActive(req.user.username, null);
    req.logout();
    res.redirect('/');
  });

module.exports = router;
