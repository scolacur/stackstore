var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');
var User = mongoose.model('User');

describe('Order model', function () {

    var createUser = function () {
        return User.create({ email: 'obama@gmail.com', password: 'potus' });
    };

    var userId;

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

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe('Validations', function () {

        it('should err without session or user', function () {
            function createOrder (){
                Order.create({});
            }
            expect(createOrder).to.throw(Error);
        })

        it('should err with both session and user', function () {
            function createOrder (){
                Order.create({user: userId, session: "somefakesession1"});
            }
            expect(createOrder).to.throw(Error);
        })

        it('should err without items', function (done) {
            Order.create({user: userId})
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
