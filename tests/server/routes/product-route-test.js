// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Products Route', function () {

    var categoryId;

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach("Create category", function (done) {
    return Category.create({title: "NSFW"})
    .then(function(category){
        categoryId = category._id;
        done();
    });
  });

  beforeEach("Create category", function (done) {
    return Category.create({title: "Default"})
    .then(function(category){
        done();
    });
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('GET /api/products', function () {

    var agent;

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });

    beforeEach('Make a product', function (done) {
      Product.create({name: "extreme anal beads", category: categoryId})
      .then(function (product) {
        done();
      })
      .then(null, done);
    });

    it('should get return products with 200 response', function (done) {
      agent.get('/api/products/')
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body).to.be.length(1);
          done();
        });
    });

  });

  describe('POST /api/products', function () {

    var agent;

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });


    it('should make a product', function (done) {
      agent.post('/api/products/')
        .send({name: 'sand-sniffer'})
        .expect(201)
        .end(function (err, response) {
            console.log('LOOK AT ME ', response.body);
          if (err) return done(err);
          expect(response.body.name).to.equal('sand-sniffer');
          Product.find({name: "sand-sniffer"}).exec().then(function (result){
              console.log('result', result)
            expect(result).to.have.length(1);
            expect(result[0].name).to.equal("sand-sniffer");
            done();
        }).then(null, done);

        });
    });

  });

  describe('GET /api/products/:productId', function () {

    var agent,
        productId;

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });

    beforeEach('Make a product', function (done) {
      Product.create({name: 'sand-snarker', category: categoryId})
      .then(function (product) {
        productId = product._id;
        done();
      })
      .then(null, done);
    });

  });

  describe('PUT /api/products/:productId', function () {

    var agent,
        productId;

    beforeEach('Create agent', function () {
      agent = supertest.agent(app);
    });

    beforeEach('Make a product', function (done) {
      Product.create({name: 'turdboard', category: categoryId})
      .then(function (product) {
        productId = product._id;
        done();
      })
      .then(null, done);
    });


    it('should edit a product', function (done) {
      agent.put('/api/products/' + productId)
        .send({description: 'it shoots sand'})
        .expect(201)
        .end(function (err, response) {
          if (err) return done(err);
          Product.findById(productId)
          .then(function (product) {
            expect(product.description).to.equal('it shoots sand');
            done();
          });
        });
    });
  });

});
