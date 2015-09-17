// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Product = mongoose.model('Product');


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

  var testReview = {
    title: "I like basketball",
    rating: 5,
    description: "This product is the best thing in the world for me to play basketball with.",
    user: "insertUserIdHere",
    product: "thisisafakeproductid123213"
  };

  describe('GET /api/reviews/', function () {

    var agent,
        userId,
        productId,
        productId2,
        userId2;

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });

    beforeEach('Make 2 users', function (done) {
      User.create({email: "sean@sean.com", password: "mypass"})
      .then(function (user) {
        userId = user._id;
        return User.create({email: "sean2@sean2.com", password: "mypass"});
      })
      .then(function (user) {
          userId2 = user._id;
          done();
      })
      .then(null, done);
    });

    beforeEach('Create 2 product for the review', function(done){
        Product.create({name: 'extreme toupee'})
        .then(function(product){
            productId = product._id;
            return Product.create({name: 'luxury north korean car'});
        })
        .then(function(product){
            productId2 = product._id;
            done();
        })
        .then(null, done);
    })

    beforeEach('Write a review', function (done) {
      testReview.user = userId;
      testReview.product = productId;
      Review.create(testReview)
      .then(function (review) {
        done();
      })
      .then(null, function (err) {
        done();
      });
    });

    it('should get all reviews', function (done) {
      agent.get('/api/reviews/')
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body).to.be.length(1);
          done();
        });
    });

    it('should filter by user', function (done) {
      agent.get('/api/reviews/')
        .query({user: userId.toString()})
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body).to.be.length(1);
          done();
        });
    });

    it('should filter by user 2', function (done) {
      agent.get('/api/reviews/')
        .query({user: userId2.toString()})
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body).to.be.length(0);
          done();
        });
    });

    it('should filter by product', function (done) {
      agent.get('/api/reviews/')
        .query({product: productId.toString()})
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body).to.be.length(1);
          done();
        });
    });

    it('should filter by product 2', function (done) {
      agent.get('/api/reviews/')
        .query({product: productId2.toString()})
        .expect(200)
        .end(function (err, response) {
        //   if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body).to.be.length(0);
          done();
        });
    });

  });

  describe('POST /api/reviews', function () {

    var agent, userId;

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


    it('should make a review', function (done) {
      testReview.user = userId;
      agent.post('/api/reviews/')
        .send(testReview)
        .expect(201)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body.title).to.equal("I like basketball");
          Review.find().exec()
          .then(function (reviews) {
            expect(reviews).to.have.length(1);
            expect(reviews[0].title).to.equal("I like basketball");
            done();
          });
        });
    });

  });

  describe('GET /api/reviews/:reviewId', function () {

    var agent,
        reviewId,
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

    beforeEach('Write a review', function (done) {
      testReview.user = userId;
      Review.create(testReview)
      .then(function (review) {
        reviewId = review._id;
        done();
      })
      .then(null, function (err) {
        done();
      });
    });


    it('should get the review', function (done) {
      agent.get('/api/reviews/' + reviewId)
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body.title).to.equal('I like basketball');
          done();
        });
    });

  });

  describe('PUT /api/reviews/:reviewId', function () {

    var agent,
        reviewId,
        productId,
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

    beforeEach('Create a product for the review', function(done){
        Product.create({name: 'extreme toupee'})
        .then(function(product){
            productId = product._id;
            done();
        })
        .then(null, done);
    });

    beforeEach('Write a review', function (done) {
      testReview.user = userId;
      testReview.product = productId;
      Review.create(testReview)
      .then(function (review) {
        reviewId = review._id;
        done();
      })
      .then(null, function (err) {
        done();
      });
    });


    it('should edit a review', function (done) {
      agent.put('/api/reviews/' + reviewId)
        .send({title: "I hate basketball"})
        .expect(201)
        .end(function (err, response) {
          if (err) return done(err);
          Review.findById(reviewId)
          .then(function (review) {
            expect(review.title).to.equal("I hate basketball");
            done();
          });
        });
    });

  });

});
