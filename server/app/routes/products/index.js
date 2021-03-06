'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');

router.param('productId', function(req,res,next,id){
	Product.findById(id).populate("store").populate("categories").exec()
	.then(function(foundProduct){
		req.foundProduct = foundProduct;
		next();
	}, function(err){
		err.status = 404;
		throw err;
	})
	.then(null, next);
});

// router.use("/reviews", require("../reviews/"));

router.get('/', function(req,res,next){
	// var query = {};
	// if (req.query.categoryId) {
	// 	query.category = req.query.categoryId;
	// }
	Product.find(req.query).populate("categories").populate("store").exec()
	.then(function(products){
		res.json(products);
	}).then(null, next);
});

router.get("/:productId", function (req, res){
	res.json(req.foundProduct);
});

//create a product
router.post('/', function(req,res,next){
  // Product.createWithDefault(req.body) //this was causing a 500 error
	Product.create(req.body)
  .then(function(createdProduct){
  	return createdProduct.populate('categories').populate('store').execPopulate();
  })
  .then(function (popProduct) {
    res.status(201).json(popProduct);
  })
  .then(null, next);
});

//update a product
router.put('/:productId', function(req,res,next){
	for (var k in req.body){
		req.foundProduct[k] = req.body[k];
	}
	return req.foundProduct.save()
	.then(function(savedProduct){
		res.status(201).json(savedProduct);
	}).then(null, next);
});



module.exports = router;
