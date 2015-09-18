'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    url: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
});

schema.path('url').validate(function(value){
    return /^\/[\w\-]+/.test(value);
})

mongoose.model('Store', schema);
