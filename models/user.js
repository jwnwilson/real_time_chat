"use strict";
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    activeDate: DataTypes.DATE,
  },
  {
    classMethods: {
      nextTick: function(id) {
        return this.findById(id).then(function(user) {
          return user;
        });
      },
      findByUsername: function(username) {
        return this.findOne({ where: { username: username}}).then(function(user) {
          return user;
        });
      },
      setActive: function(username, active){
        return this.findOne({
          where: { username: username}
        }).then(function(user) {
          user.activeDate = active;
          user.save();
        });
      }
    },
    instanceMethods: {
      setPassword: function(password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        this.password = hash;
        this.salt = salt;
        this.save();
      },
      checkPassword: function(password){
        if(bcrypt.compareSync(password, this.password)){
          return true;
        }
        return false;
      }
    }
  });

  return User;
};
