'use strict';
var router = require('express').Router();
module.exports = router;
// var _ = require('lodash');

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Review = mongoose.model('Review');


router.get('/', function (req, res) {
  Review.find(req.query).populate('user').populate('product')
  .then(function (reviews) {
    res.json(reviews);
  });
});

router.post('/', function (req, res) {
  Review.create(req.body)
  .then(function (review) {
    res.status(201).json(review);
  });
});

router.put('/:reviewId', function (req, res) {
  req.review = Object.keys(req.body).reduce(function (oldReview, newProp) {
    oldReview[newProp] = req.body[newProp];
    return oldReview;
  }, req.review);
  req.review.save()
  .then(function (editedReview) {
    res.status(201).json(editedReview);
  });
});

router.get('/:reviewId', function (req, res) {
  res.json(req.review);
});

router.param('reviewId', function (req, res, next, reviewId) {
  Review.findById(reviewId).deepPopulate("user product.store")
  .then(function (review) {
    req.review = review;
    next();
  })
  .then(null, next);
});
