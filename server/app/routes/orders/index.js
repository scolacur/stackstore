'use strict';
var router = require('express').Router();
module.exports = router;
var emailer = require('../../configure/email');
// var _ = require('lodash');

var Order = require('mongoose').model('Order');

router.get('/', function (req, res) {
    // var query = {};
    // if (req.query.status) {
    //     query.status = req.query.status;
    // }
	Order.find(req.query)
	.then(function (orders) {
		res.json(orders);
	});
});

// gets a full "order" from frontend, adds session.id and user
// on backend (maybe even cart too)
router.post('/', function (req, res, next) {
	req.body.session = req.session.id;
	req.body.items = req.body.items || req.session.cart;
	req.body.total = req.body.items.reduce(function (mem, item) {
		return mem + item.product.price * item.quantity;
	}, 0);
	if (req.user) req.body.user = req.user._id;
	Order.create(req.body)
	.then(function (order) {
		return order.populateItem();
	}).then(function(populated) {
		emailer.confirmEmail(populated);
		res.status(201).json(populated);
	})
	.then(null, function (error) {
		console.log(error);
		next(error);
	});
});

router.put('/:orderId', function (req, res) {
	req.foundOrder = Object.keys(req.body).reduce(function (oldOrder, newProp) {
		oldOrder[newProp] = req.body[newProp];
		return oldOrder;
	}, req.foundOrder);
	req.foundOrder.save()
	.then(function (editedOrder) {
		return editedOrder.populateItem();
	}).then(function(populated) {
		emailer.confirmEmail(populated);
		res.status(201).json(populated);
	});
});

router.get('/:orderId', function (req, res) {
	res.json(req.foundOrder);
});

router.param('orderId', function (req, res, next, orderId) {
	Order.findById(orderId)
	.then(function (order) {
		return order.populateItem();
	}).then(function (populatedOrder) {
		req.foundOrder = populatedOrder;
		next();
	})
	.then(null, next);
});
