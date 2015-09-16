var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Product = mongoose.model('Product');


describe('Order model', function () {

    var createUser = function () {
        return User.create({ email: 'obama@gmail.com', password: 'potus' });
    };

    var createProduct = function () {
        return Product.create({name: '99 red balloons'});
    };

    var userId,
        productId;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('create a new user', function(done){
        createUser({}).then(function(newUser){
            userId = newUser._id;
            done();
        })
        .then(null, done);
    })

    beforeEach('create a new product', function(done){
        createProduct().then(function(newProduct){
            productId = newProduct._id;
            done();
        })
        .then(null, done);
    })

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe('Validations', function () {

        it('should err without session', function (done) {
            Order.create({items: [{quantity: 0, product: productId}]})
            .then(null, function (error){
                expect(error.errors.session).to.exist;
                expect(error.errors.items).to.not.exist;
                done();
            })
        })

        it('should err without items', function (done) {
            Order.create({session: 'fakeSessionThing'})
            .then(null, function (error) {
                expect(error.errors.items).to.exist;
                done();
            })
        })

        it('should err with items without quantity, product', function (done) {
            Order.create({
                user: userId,
                items: [{}]
            })
            .then(function(order){
                done();
            })
            .then(null, function (error) {
                expect(error.errors['items.0.product']).to.exist;
                expect(error.errors['items.0.quantity']).to.exist;
                done();
            })
        })
    })
});
