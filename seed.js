/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Category = Promise.promisifyAll(mongoose.model('Category'));
var Review = Promise.promisifyAll(mongoose.model('Review'));

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

var seedProducts = function (category) {

    var products = [
        {
           name: "surfbort",
           price: 20,
           quantity: 10,
           description: "a surfbort"
        },
        {
           name: "sand shooter",
           price: 5,
           quantity: 100,
           description: "shooting sand shooting sand shooting sand shooting sand"
        }
    ];
    products.forEach(function(current) {
        current.category = category;
    });

    return Product.createAsync(products);
};

var seedReviews = function (userId, productId) {

    var reviews = [
        {
            title: "this surfboard rules",
            rating: 5,
            description: "like i said, like i said,like i said, like i said, like i said"
        },
        {
            title: "this surfboard is terrrible",
            rating: 1,
            description: "like i said, dude -like i said, dude -like i said, dude"
        }
    ];
    reviews.forEach(function(current) {
        current.product = productId;
        current.user = userId;
    });
    return Review.createAsync(reviews);
};

var seedCategories = function () {

        var categories = [
        {
           title: "surf things"
        },
        {
           title: "sand things"
        }
    ];
    return Category.createAsync(categories);
};


var productId,
    userId,
    categoryId;

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function(createdUsers) {
        userId = createdUsers[0]._id;
    }).then(function(){
        return Category.findAsync({});
    }).then(function (categories) {
        if (categories.length === 0) {
            return seedCategories();
        } else {
            console.log(chalk.magenta('Seems to already be category data, exiting!'));
            process.kill(0);
        }    
    }).then(function(createdCategories) {
        categoryId = createdCategories[0]._id;
    }).then(function () {
        return Product.findAsync({});
    }).then(function (products) {
        if (products.length === 0) {
            return seedProducts(categoryId);
        } else {
            console.log(chalk.magenta('Seems to already be product data, exiting!'));
            process.kill(0);
        }
    }).then(function(createdProducts) {
        productId = createdProducts[0]._id;
    }).then(function(){
        return Review.findAsync({});
    }).then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews(userId, productId);
        } else {
            console.log(chalk.magenta('Seems to already be review data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
