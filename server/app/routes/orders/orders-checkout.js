'use strict';
var router = require('express').Router();
module.exports = router;
// var _ = require('lodash');

var Order = require('mongoose').model('Order');

router.get('/checkout', function (req, res) {
	Order.create(req.session.cart)
	.then(function (order) {
		res.status(201).json(order);
	});
});
