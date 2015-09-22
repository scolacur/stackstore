'use strict';
var mongoose = require('mongoose');
var Category = mongoose.model('Category');


var schema = new mongoose.Schema({
    name: {type: String, unique: true},
    price: Number,
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


mongoose.model('Product', schema);
