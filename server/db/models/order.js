'use strict';
var mongoose = require('mongoose');
var Promise = require('bluebird');

var ObjectId = mongoose.Schema.Types.ObjectId;

var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['shipped', 'confirmed', 'pending', 'cancelled'],
        required: true,
        default: 'pending'
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
        type: String
    }

});

schema.plugin(deepPopulate);

// schema.path('user').validate(function (value) {
//     return !this.session;
// }, 'session stuff');
//
// schema.path('session').validate(function (value) {
//     return !this.user;
// });

schema.pre('validate', function(next){
    if(this.session || this.user) return next();
    else {
        throw Error('needs either session or user');
    }
});

schema.statics.populateItems = function (_orders) {
    return new Promise(function (resolve, reject) {
        this.constructor.deepPopulate(_orders, 'items.product', function (err, orders) {
            if (err) return reject(err);
            return resolve(orders);
        });
    });
};

schema.methods.populateItem = function () {
    return new Promise(function (resolve, reject) {
        this.deepPopulate('items.product', function (err, post) {
            if (err) return reject(err);
            return resolve(post);
        });
    });
};



mongoose.model('Order', schema);
