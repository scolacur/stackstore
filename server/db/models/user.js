'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var validator = require('email-validator');
// var _ = require('lodash');


var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
	cart: [mongoose.Schema.Types.Mixed]
});

schema.path('email').validate(function (value) {
    return validator.validate(value);
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

schema.method('saveCart', function(cart){
	this.cart = cart;
	return this.save();
});

//this method removes any possible duplicates from the combined cart
schema.method('consolidateCart', function(cart){
	var sessionCartIds = cart.map(function(item){
		return item.product._id.toString();
	});
	for (var i = 0; i<this.cart.length; i++){
		var duplicateIndex = sessionCartIds.indexOf(this.cart[i].product._id.toString());
			//if we find a duplicate,
			if (duplicateIndex > -1) {
				cart[duplicateIndex].quantity += this.cart[i].quantity;
			}
			else { //combine the carts normally
				cart.push(this.cart[i]);
			}
	}
	return cart;
});



mongoose.model('User', schema);
