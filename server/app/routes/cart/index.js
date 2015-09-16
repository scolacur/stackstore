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
		if (item.product._id.toString() === bodyItem.product)
			updated = true;
			item.quantity += bodyItem.quantity;
	});
	if (!updated) cart.push(bodyItem);
};

//adding to cart
router.post('/', function (req, res) {
	if (!req.session.cart) req.session.cart = [];

	dealWithSameItem(req.body, req.session.cart);

	prepareCart(req.session.cart).then(function(cart){
		res.status(201).json(cart);
	});
});

//editing an item in the cart
router.put('/', function (req, res) {
	// var itemToEdit = req.session.cart.indexOf(req.body);
});

//empty cart
router.delete('/', function(req,res){
	req.session.cart = [];
	res.status(200).json(req.session.cart);
});
