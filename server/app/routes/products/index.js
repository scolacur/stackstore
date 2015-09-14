'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
//get all products

router.param('productId', function(req,res,next,id){
	Product.findById(id).exec()
	.then(function(foundProduct){
		req.foundProduct = foundProduct;
		next();
	}, function(err){
		err.status = 404;
		throw err;
	})
	.then(null, next);
});

router.get('/', function(req,res,next){
  Product.find().exec()
  .then(function(products){
    res.json(products);
  }).then(null, next);
});

//create a book
router.post('/', function(req,res,next){
  Product.create(req.body)
  .then(function(createdProduct){
    res.status(201).json(createdProduct);
  }).then(null, next);
});

//update a chapter
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
