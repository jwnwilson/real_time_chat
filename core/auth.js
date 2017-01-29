var db = require('../models');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

module.exports = {
  setUpPassport: function(passport){
    // Configure the local strategy for use by Passport.
    passport.use(new Strategy(
      function(username, password, cb) {
        db.User.findByUsername(username).then(function(user) {
          if (user == null) {
            return cb(null, false, { message: 'Incorrect credentials.' });
          }
          if(user.checkPassword(password)){
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
  }
};
