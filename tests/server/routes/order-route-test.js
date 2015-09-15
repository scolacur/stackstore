// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Order = mongoose.model('Order');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Orders Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('GET /api/orders/', function () {

		var agent;

		beforeEach('Create agent', function () {
			agent = supertest.agent(app);
		});

		beforeEach('Make an order', function (done) {
			Order.create({items:[{quantity: 314, product: 'surfboard'}], status: 'pending', date: new Date(), session: 'someFakeSession' })
			.then(function (order) {
				done();
			})
			.then(null, function(err){
				console.error(err)
				done();
			});
		});

		it('should get orders with 200 response', function (done) {
			agent.get('/api/orders/')
				.expect(200)
				.end(function (err, response) {
					if (err) return done(err);
					expect(response.body).to.be.an('array');
					expect(response.body).to.be.length(1);
					done();
				});
		});

	});

	describe('POST /api/orders', function () {

		var agent;

		beforeEach('Create agent', function () {
			agent = supertest.agent(app);
		});


		it('should make an order', function (done) {

			agent.post('/api/orders/')
				// .field('session.cart', "{items:[{quantity: 314, product: 'extremeboard'}], status: 'pending', date: new Date(), session: 'someFakeSession' }")
				.send({items:[{quantity: 314, product: 'extremeboard'}], status: 'pending', date: new Date(), session: 'someFakeSession' })
				.expect(201)
				.end(function (err, response) {
					if (err) return done(err);
					expect(response.body.items[0].product).to.equal('extremeboard');
					Order.find({}).exec()
					.then(function(orders){
						expect(orders).to.have.length(1);
						expect(orders[0].items[0].product).to.equal('extremeboard');
						done();
					})
				});
		});

	});

	describe('GET /api/users/:userId', function () {

		var agent,
			orderId;

		beforeEach('Create agent', function () {
			agent = supertest.agent(app);
		});

		beforeEach('Make an order', function (done) {
			Order.create({items:[{quantity: 314, product: 'surfboard'}], status: 'pending', date: new Date(), session: 'someFakeSession' })
			.then(function (order) {
				orderId = order._id;
				done();
			})
			.then(null, done);
		});


		it('should get the order', function (done) {
			agent.get('/api/orders/' + orderId)
				.expect(200)
				.end(function (err, response) {
					if (err) return done(err);
					expect(response.body.items[0].product).to.equal('surfboard');
					done()
				});
		});

	});

	describe('PUT /api/users/:userId', function () {

		var agent,
			orderId;

		beforeEach('Create agent', function () {
			agent = supertest.agent(app);
		});

		beforeEach('Make an order', function (done) {
			Order.create({items:[{quantity: 314, product: 'surfboard'}], status: 'pending', date: new Date(), session: 'someFakeSession' })
			.then(function (order) {
				orderId = order._id;
				done();
			})
			.then(null, done);
		});


		it('should edit an order', function (done) {
			agent.put('/api/orders/' + orderId)
				.send({items:[{quantity: 314, product: 'extremeboard'}], status: 'pending', date: new Date(), session: 'someFakeSession' })
				.expect(201)
				.end(function (err, response) {
					if (err) return done(err);
					Order.findById(orderId)
					.then(function (order) {
						expect(order.items[0].product).to.equal('extremeboard');
						done();
					});
				});
		});
	});

});
