'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
//get all products
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


module.exports = router;
