var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

describe('Product model', function () {

    var categoryId;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach("Create test category", function (done) {
      return Category.create({title: "Books"})
      .then(function(category){
          categoryId = category._id;
          done();
      });
    });

    beforeEach("Create test product", function () {
      return Product.create({name: "surfbort", category: categoryId});
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    describe('name', function () {

      it('should exist', function (done) {
        Product.find({}).then(function(results){
          expect(results.length).to.equal(1);
          done();
        });
      });

      it('should be unique', function (done) {
          return Product.create({name: "surfbort", category: categoryId})
          .then(function(product){
            // shouldnt get here, sad
            done();
          })
          .then(null, function(err){
            expect(err.code).to.equal(11000);
            done();
          });
      });

    });

});
