'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var mongoose = require('mongoose');
var Store = mongoose.model('Store');


router.get('/', function (req, res) {
  Store.find(req.query).populate('user')
  .then(function (stores) {
    res.json(stores);
  });
});

router.post('/', function (req, res) {
  Store.create(req.body)
  .then(function (store) {
    res.status(201).json(store);
  });
});

router.put('/:storeId', function (req, res) {

    req.store = _.assign(req.store, req.body)
    req.store.save()
    .then(function (editedStore) {
        res.status(201).json(editedStore);
    });
});

router.get('/:storeId', function (req, res) {
  res.json(req.store);
});

router.param('storeId', function (req, res, next, storeId) {
  Store.findById(storeId).populate("user")
  .then(function (store) {
    req.store = store;
    next();
  })
  .then(null, next);
});
