'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var User = require('mongoose').model('User');

router.get('/', function (req, res) {
	console.log("req.user: ",req.body);
	User.find()
	.then(function (users) {
		users = users.map(function (user) {
			return _.omit(user.toJSON(), ['salt', 'password']);
		});
		res.json(users);
	});
});

router.post('/', function (req, res) {
	delete req.body.isAdmin;
	User.create(req.body)
	.then(function (user) {
		res.status(201).json(_.omit(user.toJSON(), ['salt', 'password']));
	});
});

router.put('/:userId', function (req, res) {
	console.log("session user",req.session.passport);
	console.log(req.foundUser);
	var admin;
	User.findById(req.session.passport.user)
	.then(function(sessionUser){
		admin = sessionUser.isAdmin;
	}).then(function(){
		req.foundUser = Object.keys(req.body).reduce(function (oldUser, newProp) {
			if (newProp === 'isAdmin' && !admin) return oldUser; // fix with support for admins
			oldUser[newProp] = req.body[newProp];
			return oldUser;
		}, req.foundUser);
	}).then(function(){
		req.foundUser.save()
		.then(function (editedUser) {
			res.status(201).json(_.omit(editedUser.toJSON(), ['salt', 'password']));
		});
	});
});

router.get('/:userId', function (req, res) {
	res.json(_.omit(req.foundUser.toJSON(), ['salt', 'password']));
});

router.delete('/:userId', function (req, res, next){
	req.foundUser.remove()
	.then(function(){
		res.status(204).end();
	}).then(null, next);
});

router.param('userId', function (req, res, next, userId) {
	User.findById(userId)
	.then(function (user) {
		req.foundUser = user;
		next();
	})
	.then(null, next);
});
