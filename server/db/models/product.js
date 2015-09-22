'use strict';
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var ee = require('../../app/configure/event.js').ee;


var schema = new mongoose.Schema({
    name: {type: String, unique: true},
    price: Number,
    realPrice: Number,
    description: String,
    inventory: Number,
    photoUrl: {type: String, default: "http://budapestretro.weebly.com/uploads/2/1/6/9/21695204/8297955_orig.jpg?182"},
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }],
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
});

schema.path('categories').validate(function(value){
    return value.length > 0;
})

schema.statics.createWithDefault = function (reqBody) {
    var self = this;
    return Category.findOne({title: reqBody.category.title})
    .then(function (cat) {
        if (!cat) return Category.findOne({title: 'Default'})
        else return cat;
    })
    .then(function (cat) {
        reqBody.category = cat._id;
        return self.create(reqBody)
    });
}

schema.statics.randomDiscount = function () {
    console.log('random discount called');
    return mongoose.model('Product').find()
    .exec()
    .then (function (products) {
        return products[Math.floor(Math.random()*products.length)];
    })
    .then (function (discountedProduct) {
        discountedProduct.realPrice = discountedProduct.price;
        discountedProduct.price = 0;
        console.log('the new product is: ', discountedProduct);
        return discountedProduct.save();
    });
}

schema.statics.resetOldPrice = function () {
    console.log('reset old price');

    return mongoose.model('Product').findOne({ realPrice: {$ne: null} })
    .exec()
    .then (function (product) {
        if (!product) return;
        product.price = product.realPrice;
        product.realPrice = null;
        console.log('old discount product found ', product);
        return product.save();
    });
}

ee.on("randomize", function () {
    console.log('randomize event listened');
    return mongoose.model('Product').resetOldPrice()
    .then(function(){
        mongoose.model('Product').randomDiscount();
    });
});


mongoose.model('Product', schema);
