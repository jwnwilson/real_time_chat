process.env.DATABASE_URL = 'mysql://root:@localhost:3306/test_real_time_chat';
var chai = require('chai');
var routes = require('./../routes');
var expect = chai.expect;
var request = require('supertest');

describe('GET / response', function () {
  var app;
  beforeEach(function () {
    app = require('./../app').listen();
  });
  afterEach(function () {
    app.close();
  });
  it('responds to /', function testSlash(done) {
  request(app)
    .get('/')
    .expect(200, done);
  });
});