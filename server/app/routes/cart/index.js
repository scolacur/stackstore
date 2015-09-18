'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Product = require('mongoose').model('Product');
var Promise = require('bluebird');

//getting cart
router.get('/', function (req, res) {
	if (!req.session.cart) req.session.cart = [];
	res.json(req.session.cart);
});

var dealWithSameItem = function (bodyItem, cart) {
	var dupeItem = _.find(cart, function (item, index) {
		return item.product._id.toString() === bodyItem.product._id;
	});
	if (dupeItem) dupeItem.quantity += bodyItem.quantity;
	else cart.push(bodyItem);
};

//adding to cart
router.post('/', function (req, res) {
	if (!req.session.cart) req.session.cart = [];
	dealWithSameItem(req.body, req.session.cart);
	res.status(201).json(req.session.cart);
});

//editing an item in the cart
router.put('/:productId', function (req, res) {
	var editedItemIndex = _.findIndex(req.session.cart, function (item) {
		return item.product._id.toString() === req.params.productId;
	});

	_.assign(req.session.cart[editedItemIndex], req.body);
	req.session.cart = req.session.cart.filter(function(item){
		return item.quantity > 0;
	});

	res.status(201).json(req.session.cart);
});

//empty cart
router.delete('/', function(req,res){
	req.session.cart = [];
	res.status(200).json(req.session.cart);
});
