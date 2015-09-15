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
                // type: ObjectId,
                // ref: 'Product'
                type: String, //string until product is working
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
    };
})

// schema.path('items').validate(function(next){
//     var itemArray = ['quantity', 'product'];
//     return this.items.every(function(item){
//             return itemArray.every(function(prop){
//                 if (Object.getOwnPropertyNames(item).indexOf(prop) !== -1) return true;
//                 else return false;
//             })
//     })
// }, 'invalid items in order')

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