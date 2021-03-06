'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    title: {
        type: String,
        default: "Default",
        required: true
    }
});

schema.pre('save', function (next) {

    //add pre-save hook here
    next();

});


mongoose.model('Category', schema);
