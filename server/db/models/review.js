'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    title: String,
    rating: {
        type: Number,
        enum: [1,2,3,4,5]
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: ObjectId,
        ref: "Product",
        required: true
    }
});

schema.plugin(deepPopulate);

schema.path('description').validate(function (value) {
    return value.length > 50;
});

mongoose.model('Review', schema);
