"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    classMethods: {
      nextTick: function(id, cb) {
        return this.findById(id).then(function(user) {
          cb(null, user);
        });
      },
      findByUsername: function(username, cb) {
        return this.findOne({ where: { username: username}}).then(function(user) {
          cb(null, user);
        });
      }
    }
  });

  return User;
};
