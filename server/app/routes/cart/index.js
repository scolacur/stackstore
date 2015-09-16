'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Product = require('mongoose').model('Product');
var Promise = require('bluebird');

//returns a promise for a cart with populated products
var prepareCart = function(cart){
	return Promise.map(cart, function (item) {
		return Product.findById(item.product);
	}).then(function(productArray){
		// console.log("product array: ", productArray);
		productArray.forEach(function(product, index){
			cart[index].product = product;
		});
		return cart;
	});
};

//getting cart
router.get('/', function (req, res) {
	if (!req.session.cart) req.session.cart = [];
	prepareCart(req.session.cart).then(function(cart){
		res.json(cart);
	});
});

var dealWithSameItem = function (bodyItem, cart) {
	var updated = false;
	cart.forEach(function (item) {
		if (item.product._id.toString() === bodyItem.product._id){
			updated = true;
			item.quantity += bodyItem.quantity;
		}
	});
	if (!updated) cart.push(bodyItem);
};

//adding to cart
router.post('/', function (req, res) {
	if (!req.session.cart) req.session.cart = [];
	console.log('req.session.cart', req.session.cart);
	dealWithSameItem(req.body, req.session.cart);
	console.log('req.session.cart AFTER', req.session.cart);

	prepareCart(req.session.cart).then(function(cart){
		res.status(201).json(cart);
	});
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
