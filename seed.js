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
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var Review = mongoose.model('Review');
var Order = mongoose.model('Order');
var Store = mongoose.model('Store');

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

    return User.create(users);

};

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

    return User.create(users);

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
        },
        {
           name: "three products!",
           price: 7,
           quantity: 1,
           description: "it doesn't matter what it is"
        }

    ];
      var categoryId,
      userId,
      storeId;

      return User.create(user)
      .then(function(foundUser){
          userId = foundUser._id;
          return Store.create({
              name: "Princess Peach Kidnapping Tools",
              url: "/peach",
              user: userId
          })
      })
      .then(function(store){
          storeId = store._id;
          return Category.create({
              title: 'Extreme Watersports'
          })
      })
      .then(function (category) {
          categoryId = category._id;
          return Category.create({
              title: 'Default'
          })
      })
      .then(function (){
          return Product.create({
              name: 'surfbort',
              category: categoryId,
              price: 56,
              store: storeId
          })
      })
      .then(function () {
          products.forEach(function(current) {
                current.category = categoryId;
                current.store = storeId;
            });
          return Product.create(products);
      })
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
    return Review.create(reviews);
};

var seedCategories = function () {

        var categories = [
        {
           title: "Misc"
        },
        {
           title: "Weapons"
        }
    ];
    return Category.create(categories);
};


var seedOrders = function (userId, productId) {

        var orders = [
        {
            session: "fake session",
            date: new Date(),
            status: "pending",
            items: {
                quantity: 200,
                product: productId
            },
            user: userId
        },
        {
            session: "fake session",
            date: new Date(),
            status: "pending",
            items: {
                quantity: 1,
                product: productId
            },
            user: userId
        }
    ];
    return Order.create(orders);
};

var productId,
    userId,
    categoryId;

connectToDb.then(function () {
    User.find({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function(createdUsers) {
        userId = createdUsers[0]._id;
    }).then(function(){
        return Category.find({});
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
        return Product.find({});
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
        return Review.find({});
    }).then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews(userId, productId);
        } else {
            console.log(chalk.magenta('Seems to already be review data, exiting!'));
            process.kill(0);
        }
    }).then(function(){
        return Order.find({});
    }).then(function (orders) {
        if (orders.length === 0) {
            return seedOrders(userId, productId);
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
