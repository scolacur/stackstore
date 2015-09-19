'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    urlName: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    css: mongoose.Schema.Types.Mixed
});

schema.path('urlName').validate(function(value){
    return /^[\w\-]+/.test(value);
})

mongoose.model('Store', schema);
