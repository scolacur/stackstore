'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var mongoose = require('mongoose');
var Store = mongoose.model('Store');


router.get('/', function (req, res) {
	console.log("this get routttte is", req.store)
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

router.put('/:storeName', function (req, res) {

	req.store = _.assign(req.store, req.body)
	req.store.save()
	.then(function (editedStore) {
		res.status(201).json(editedStore);
	});
});

router.get('/:storeName', function (req, res) {
	console.log("store is", req.store)
	if (!req.store) return next(new Error("no store found!"));
	res.json(req.store);
});

router.param('storeName', function (req, res, next, storeName) {
  Store.findOne({urlName: storeName}).populate("user")
  .then(function (store) {
	console.log("store is", store)
	if (!store) return next(new Error("no store found!"));
	req.store = store;
	next();
  })
  .then(null, next);
});
