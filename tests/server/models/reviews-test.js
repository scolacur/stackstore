var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');


describe('Review model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Review).to.be.a('function');
    });

    describe('Review model', function () {

        describe('Validation', function () {

            var userId,
                productId,
                categoryId;

            beforeEach('make an user', function (done) {
                User.create({email: "sean@sean.com", password: "mypass"})
                .then(function (user) {
                    userId = user._id;
                    done();
                })
                .then(null, done);
            });

            beforeEach('make a category', function (done) {
                Category.create({title: "NSFW"})
                .then(function (category) {
                    categoryId = category._id;
                    done();
                })
                .then(null, done);
            })

            beforeEach('make a product', function (done) {
                Product.create({name: "extreme jockstrap", category: categoryId})
                .then(function (product) {
                    productId = product._id;
                    done();
                })
                .then(null, done);
            })

            it('should err without user, product, and description', function (done) {

                Review.create({})
                .then(function (review) {
                    //shouldn't go here
                    console.log(review);
                    done();
                })
                .then(null, function (error) {
                    expect(error.errors).to.have.property('description');
                    expect(error.errors).to.have.property('user');
                    expect(error.errors).to.have.property('product');
                    done();
                });

            });

            it('should err with a description with less than 50 chars', function (done) {

                Review.create({
                    description: "Hello my name is Sean"
                })
                .then(function (review) {
                    //shouldn't go here
                    done();
                })
                .then(null, function (error) {
                    expect(error.errors).to.have.property('description');
                    done();
                });

            });

            it('should accept a correct review', function (done) {

                Review.create({
                    title: "I like basketball",
                    rating: 5,
                    description: "This product is the best thing in the world for me to play basketball with.",
                    user: userId,
                    product: productId
                })
                .then(function (review) {
                    //shouldn't go here
                    expect(review.title).to.equal("I like basketball");
                    done();
                })
                .then(null, function (error) {
                    console.log(error);
                    done();
                });

            });

        });

    });

});
