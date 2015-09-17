'use strict';
var router = require('express').Router();
module.exports = router;
// var _ = require('lodash');

var mongoose = require('mongoose');
var Category = mongoose.model('Category');


router.get('/', function (req, res) {
  Category.find().exec()
  .then(function (categories) {
    res.json(categories);
  });
});

router.post('/', function (req, res) {
  Category.create(req.body)
  .then(function (review) {
    res.status(201).json(review);
  });
});

