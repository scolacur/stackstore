'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var validator = require('email-validator');
var _ = require('lodash');


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
})

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
    cart = cart.map(function (item) {
        if (!item.product._id) return item;
        item.product = item.product._id;
        return item;
    });

	this.cart = this.cart.concat(cart);

	return this.save();
});



mongoose.model('User', schema);
