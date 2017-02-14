process.env.DATABASE_URL = 'postgres://postgres:ostmodern@localhost:5432/test_real_time_chat';
var chai = require('chai');
var db = require('./../models');
var expect = chai.expect;

describe('userModel', function () {
  var mockResponse = function (callback) { return { send: callback }; };
  var newUser = { username: 'Johne', password:'imjohne' };

  beforeEach(function (done) {
    db.sequelize.sync({ force: true}).then(function () { done(); });
  });

  it('should find created users', function (done) {
    //arrange
    db.User.create(newUser).then(function () {
      //act
      var user = db.User.findByUsername(newUser.username).then(function(user){
        //assert
        expect(user).to.not.equal(null);
        expect(user.username).to.equal(newUser.username);
        done();
      });
    });
  });
  it('should create user', function (done) {
    //arrange
    var req = { body: newUser };
    //act
    db.User.create(newUser).then(function(user) {
      //assert
      expect(user).to.not.equal(null);
      expect(user.username).to.equal(newUser.username);
      done();
    });
  });
});
