// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Cart Route', function () {

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  var productId;

  beforeEach('Make a product', function (done) {
    Product.create({
      name: "surfbort",
      inventory: 5,
      description: 'my favorite bort'
    })
    .then(function (product) {
      productId = product._id;
      done();
    })
    .then(null, done);
  });

  var userId,
      user = {email: "sean@sean.com", password: "mypass"};
  beforeEach('Make a user', function (done) {
    User.create(user)
    .then(function (user) {
      userId = user._id;
      done();
    })
    .then(null, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('Unauthenticated behavior', function () {

    describe('GET /api/cart/', function () {

      var agent;

      beforeEach('Create agent', function () {
        agent = supertest.agent(app);
      });

      it('should get cart when empty', function (done) {
        agent.get('/api/cart')
          .expect(200)
          .end(function (err, response) {
            if (err) return done(err);
            expect(response.body).to.be.an('array');
            expect(response.body).to.be.length(0);
            done();
          });
      });

      it('should get cart with stuff', function (done) {
        agent.post('/api/cart')
          .send({
            quantity: 5,
            product: productId.toString()
          })
          .expect(201)
          .end(function (err, response) {
            if (err) return done(err);
            agent.get('/api/cart')
              .expect(200)
              .end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body).to.be.length(1);
                done();
              });
            
          });
      });

      it('should persist across requests', function (done) {
        agent.post('/api/cart')
          .send({
            quantity: 5,
            product: productId.toString()
          })
          .expect(201)
          .end(function (err, response) {
            if (err) return done(err);
            agent.get('/api/cart')
              .expect(200)
              .end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body).to.be.length(1);
                agent.get('/api/cart')
                  .expect(200)
                  .end(function (err, response) {
                    if (err) return done(err);
                    expect(response.body).to.be.an('array');
                    expect(response.body).to.be.length(1);
                    done();
                  });
              });
            
          });
      });


    });

    describe('POST /api/cart', function () {

      var agent;

      beforeEach('Create agent', function () {
        agent = supertest.agent(app);
      });

      it('should add a thing to the cart', function (done) {
        agent.post('/api/cart')
          .send({
            quantity: 5,
            product: productId.toString()
          })
          .expect(201)
          .end(function (err, response) {
            if (err) return done(err);
            expect(response.body).to.be.an('array');
            expect(response.body).to.be.length(1);
            expect(response.body[0].product.name).to.equal("surfbort");
            agent.get('/api/cart')
              .expect(200)
              .end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body).to.be.length(1);
                done();
              });
            
          });
      });

      it('should update quantity on the cart', function (done) {
        agent.post('/api/cart')
          .send({
            quantity: 5,
            product: productId.toString()
          })
          .end(function (err, response) {
            if (err) return done(err);
            agent.post('/api/cart')
              .send({
                quantity: 201,
                product: productId.toString()
              })
              .end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body).to.be.length(1);
                expect(response.body[0].product._id.toString()).to.equal(productId.toString());
                expect(response.body[0].quantity).to.equal(206);
                done();
              });
            
          });
      });
    });  

    describe('DELETE /api/cart', function () {

      var agent;

      beforeEach('Create agent', function () {
        agent = supertest.agent(app);
      });

      beforeEach('add an item to cart', function (done) {
        agent.post('/api/cart')
          .send({
            quantity: 5,
            product: productId.toString()
          })
          .end(function (err, response) {
            if (err) return done(err);
            done();
          });
      });

      beforeEach('add an item to cart', function (done) {
        agent.post('/api/cart')
          .send({
            quantity: 1491,
            product: productId.toString()
          })
          .end(function (err, response) {
            if (err) return done(err);
            done();
          });
      });

      it('delete should remove all items', function (done) {
        agent.delete('/api/cart')
          .expect(200)
          .end(function (err, response) {
            if (err) return done(err);
            agent.get('/api/cart')
              .expect(200)
              .end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body).to.be.length(0);
                done();
              });
            
          });
      });

    });
  });

  describe('Authenticated behavior', function () {

    var agent;

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });

    beforeEach('login', function (done) {
      agent.post('/login')
        .send(user)
        .end(function (err, response) {
          if (err) return done(err);
          done();
        });
    });

    beforeEach('add an item to cart', function (done) {
      agent.post('/api/cart')
        .send({
          quantity: 1491,
          product: productId.toString()
        })
        .end(function (err, response) {
          if (err) return done(err);
          done();
        });
    });

    it('should empty upon logout', function (done) {

      agent.get('/logout')
        .end(function (err, response) {
          if (err) return done(err);
          agent.get('/api/cart')
            .end(function (err, response) {
              if (err) return done(err);
              expect(response.body).to.have.length(0);
              done();
            })
        })
    });

    it('should populate upon login', function (done) {

      var test = function () {
        agent.post('/login')
          .send(user)
          .end(function (err, response) {
            if (err) return done(err);
            agent.get('/api/cart')
            .end(function (err, response) {
              expect(response.body).to.have.length(1);
              if (err) return done(err);
              done();
            })
          });
      }

      agent.get('/logout')
        .end(function (err, response) {
          if (err) return done(err);
          agent.get('/api/cart')
            .end(function (err, response) {
              if (err) return done(err);
              test();
            })
        })
    });

  });

  // describe('POST /api/reviews', function () {

  //   var agent, userId;

  //   beforeEach('Create agent', function () {
  //     agent = supertest.agent(app);
  //   });

  //   beforeEach('Make a user', function (done) {
  //     User.create({email: "sean@sean.com", password: "mypass"})
  //     .then(function (user) {
  //       userId = user._id;
  //       done();
  //     }) 
  //     .then(null, done);
  //   });


  //   it('should make a review', function (done) {
  //     testReview.user = userId;
  //     agent.post('/api/reviews/')
  //       .send(testReview)
  //       .expect(201)
  //       .end(function (err, response) {
  //         if (err) return done(err);
  //         expect(response.body.title).to.equal("I like basketball");
  //         Review.find().exec()
  //         .then(function (reviews) {
  //           expect(reviews).to.have.length(1);
  //           expect(reviews[0].title).to.equal("I like basketball");
  //           done();
  //         });
  //       });
  //   });

  // });

  // describe('GET /api/reviews/:reviewId', function () {

  //   var agent,
  //       reviewId,
  //       userId;

  //   beforeEach('Create agent', function () {
  //     agent = supertest.agent(app);
  //   });

  //   beforeEach('Make a user', function (done) {
  //     User.create({email: "sean@sean.com", password: "mypass"})
  //     .then(function (user) {
  //       userId = user._id;
  //       done();
  //     }) 
  //     .then(null, done);
  //   });

  //   beforeEach('Write a review', function (done) {
  //     testReview.user = userId;
  //     console.log(testReview);
  //     Review.create(testReview)
  //     .then(function (review) {
  //       reviewId = review._id;
  //       done();
  //     })
  //     .then(null, function (err) {
  //       console.log(err);
  //       done();
  //     });
  //   });


  //   it('should get the review', function (done) {
  //     agent.get('/api/reviews/' + reviewId)
  //       .expect(200)
  //       .end(function (err, response) {
  //         if (err) return done(err);
  //         expect(response.body.title).to.equal('I like basketball');
  //         done();
  //       });
  //   });

  // });

  // describe('PUT /api/reviews/:reviewId', function () {

  //   var agent,
  //       reviewId,
  //       userId;

  //   beforeEach('Create agent', function () {
  //     agent = supertest.agent(app);
  //   });

  //   beforeEach('Make a user', function (done) {
  //     User.create({email: "sean@sean.com", password: "mypass"})
  //     .then(function (user) {
  //       userId = user._id;
  //       done();
  //     }) 
  //     .then(null, done);
  //   });

  //   beforeEach('Write a review', function (done) {
  //     testReview.user = userId;
  //     console.log(testReview);
  //     Review.create(testReview)
  //     .then(function (review) {
  //       reviewId = review._id;
  //       done();
  //     })
  //     .then(null, function (err) {
  //       console.log(err);
  //       done();
  //     });
  //   });


  //   it('should edit a review', function (done) {
  //     agent.put('/api/reviews/' + reviewId)
  //       .send({title: "I hate basketball"})
  //       .expect(201)
  //       .end(function (err, response) {
  //         if (err) return done(err);
  //         Review.findById(reviewId)
  //         .then(function (review) {
  //           expect(review.title).to.equal("I hate basketball");
  //           done();
  //         });
  //       });
  //   });

  // });

});