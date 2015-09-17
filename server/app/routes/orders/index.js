'use strict';
var router = require('express').Router();
module.exports = router;
// var _ = require('lodash');

var Order = require('mongoose').model('Order');

router.get('/', function (req, res) {
    var query = {};
    if (req.query.status) {
        query.status = req.query.status;
    }
	Order.find(query)
	.then(function (orders) {
		res.json(orders);
	});
});

router.post('/', function (req, res, next) {
	Order.create(req.body) //replace with req.session.cart
	.then(function (order) {
		res.status(201).json(order);
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
		res.status(201).json(editedOrder);
	});
});

router.get('/:orderId', function (req, res) {
	res.json(req.foundOrder);
});

router.param('orderId', function (req, res, next, orderId) {
	Order.findById(orderId)
	.then(function (order) {
		req.foundOrder = order;
		next();
	})
	.then(null, next);
});
