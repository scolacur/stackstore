// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Review = mongoose.model('Review');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Reviews Route', function () {

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  xdescribe('GET /api/users/:userId/reviews', function () {

    var agent, 
        userId,
        productId = "thisisafakeproductid123213";

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });

    beforeEach('Make a user', function (done) {
      User.create({email: "sean@sean.com", password: "mypass"})
      .then(function (user) {
        userId = user._id;
        done();
      })
      .then(null, done);
    });

    beforeEach('Write a review', function (done) {
      Review.create({
        title: "I like basketball", 
        rating: 5,
        description: "This product is the best thing in the world for me to play basketball with.",
        user: userId,
        product: productId
      })
      .then(function (user) {
        done();
      })
      .then(null, done);
    });

    it('should get reviews for a specific user', function (done) {
      agent.get('/api/users/' + userId + '/reviews')
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body).to.be.length(1);
          done();
        });
    });

  });

  xdescribe('GET /api/products/:productId/reviews', function () {

    var agent, 
        userId,
        productId = "thisisafakeproductid123213";

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });

    beforeEach('Make a user', function (done) {
      User.create({email: "sean@sean.com", password: "mypass"})
      .then(function (user) {
        userId = user._id;
        done();
      })
      .then(null, done);
    });

    beforeEach('Write a review', function (done) {
      Review.create({
        title: "I like basketball", 
        rating: 5,
        description: "This product is the best thing in the world for me to play basketball with.",
        user: userId,
        product: productId
      })
      .then(function (user) {
        done();
      })
      .then(null, done);
    });

    it('should get reviews for a specific user', function (done) {
      agent.get('/api/products/' + productId + '/reviews')
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body).to.be.length(1);
          done();
        });
    });

  });

  xdescribe('POST /api/users', function () {

    var agent;

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });


    it('should make a user', function (done) {
      agent.post('/api/users/')
        .send({email: "sean@sean.com", password: "mypass"})
        .expect(201)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body.email).to.equal('sean@sean.com');
          done();
        });
    });

    it('should not give back passwords', function (done) {
      agent.post('/api/users/')
        .send({email: "sean@sean.com", password: "mypass"})
        .expect(201)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body.password).to.not.be.ok;
          done();
        });
    });

  });

  xdescribe('GET /api/users/:userId', function () {

    var agent,
        userId;

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });

    beforeEach('Make a user', function (done) {
      User.create({email: "sean@sean.com", password: "mypass"})
      .then(function (user) {
        userId = user._id;
        done();
      })
      .then(null, done);
    });


    it('should get the user without password', function (done) {
      agent.get('/api/users/' + userId)
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body.email).to.equal('sean@sean.com');
          
          done()
        });
    });

  });

  xdescribe('PUT /api/users/:userId', function () {

    var agent,
        userId;

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });

    beforeEach('Make a user', function (done) {
      User.create({email: "sean@sean.com", password: "mypass"})
      .then(function (user) {
        userId = user._id;
        done();
      })
      .then(null, done);
    });


    it('should edit a user', function (done) {
      agent.put('/api/users/' + userId)
        .send({email: "poop@poop.com"})
        .expect(201)
        .end(function (err, response) {
          if (err) return done(err);
          User.findById(userId)
          .then(function (user) {
            expect(user.email).to.equal('poop@poop.com');
            done();
          });
        });
    });

    it('should not give back passwords', function (done) {
      agent.put('/api/users/' + userId)
        .send({email: "poop@poop.com"})
        .expect(201)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body.password).to.not.be.ok;
          done();
        });
    });

  });

});