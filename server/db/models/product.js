'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    name: {type: String, unique: true},
    price: Number,
    description: String,
    inventory: Number,
    photoUrl: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"}
});

schema.pre('save', function (next) {

    //add pre-save hook here
    next();

});


mongoose.model('Product', schema);