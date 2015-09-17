'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    name: {type: String, unique: true},
    price: Number,
    description: String,
    inventory: Number,
    photoUrl: {type: String, default: "http://budapestretro.weebly.com/uploads/2/1/6/9/21695204/8297955_orig.jpg?182"},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
});

schema.pre('save', function (next) {

    //add pre-save hook here
    next();

});


mongoose.model('Product', schema);
