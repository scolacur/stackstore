var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');

describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach("Create test user", function () {
        var createUser = function () {
            return Product.create({name: "surfbort"});
        };
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    describe('name', function () {

        it('should exist', function () {
            Product.findOne().then(function(result) {
                return;
            }).then(null, function(error){
                expect(error.message).to.be("already a user with that name");    
            });
        });

        it('should be unique', function () {
            Product.create({name: "surfbort"}).then(function(result){
               expect.error;
            });
        });

    });

});
