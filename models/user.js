"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
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
      }
    }
  });

  return User;
};
