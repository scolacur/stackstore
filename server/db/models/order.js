'use strict';
var mongoose = require('mongoose');
var Promise = require('bluebird');

var ObjectId = mongoose.Schema.Types.ObjectId;

var deepPopulate = require('mongoose-deep-populate')(mongoose);
var validator = require('email-validator');


var schema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['shipped', 'confirmed', 'pending', 'cancelled'],
        required: true,
        default: 'confirmed'
    },
    items: {
        type: [{
            quantity: {
                type: Number,
                required: true
            },
            product: {
                type: ObjectId,
                ref: 'Product',
                required: true
            }
        }],
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    session: {
        type: String,
        required: true
    },
    address: {
        address1: String,
        address2: String,
        city: String,
        zip: Number,
        state: String
    },
    email: {
        type: String
    },
    name: String,
    total: Number

});

schema.path('email').validate(function (value) {
    return validator.validate(value);
});

schema.plugin(deepPopulate);

schema.statics.populateItems = function (_orders) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.deepPopulate(_orders, 'items.product items.product.store items.product.category', function (err, orders) {
            console.log("constructor", err, orders);
            if (err) return reject(err);
            return resolve(orders);
        });
    });
};

schema.methods.populateItem = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.deepPopulate('items.product items.product.store items.product.category', function (err, post) {
            console.log("POST", post.items[0].product);
            if (err) return reject(err);
            return resolve(post);
        });
    });
};



mongoose.model('Order', schema);
