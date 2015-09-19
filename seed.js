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

    var users = [{
        email: 'testing@fsa.com',
        password: 'password'
    }, {
        email: 'testing@nsa.com',
        password: 'password'
    }, {
        email: 'obama@gmail.com',
        password: 'potus'
    }];

    return Promise.resolve(User.create(users));
};

var seedStores = function () {


    return Promise.all([
        User.findOne({email: 'testing@nsa.com'}).exec(),
        User.findOne({email: 'obama@gmail.com'}).exec()
    ])
    .then(function (users) {
        var stores = [{
            name: "We're Watching You",
            description: "Look We're Still Looking At You",
            urlName: "NSA",
            user: users[0]._id
        }, {
            name: "Uncle Sam's Cabin",
            description: "Loving the way you live your freedom.",
            urlName: "gobama",
            user: users[1]._id
        }];
        return Promise.resolve(Store.create(stores));
    });
};

var seedCategoriesAndProducts = function () {

    return Promise.all([
        Category.create({title: 'Fighting Equipment'}),
        Category.create({title: 'Terrorist Tools'}),
        Category.create({title: 'Watersports Gear'}),
        Store.findOne({urlName: "NSA"}).exec(),
        Store.findOne({urlName: "gobama"}).exec()
    ])
    .spread(function (fightCat, terrCat, waterCat, nsa, gobama) {
        var products = [{
            name: "surfbort",
            description: "a surfbort which is obviously coolest",
            quantity: 8,
            price: 12,
            category: waterCat._id,
            store: nsa._id,
            photoUrl: 'https://s-media-cache-ak0.pinimg.com/736x/d7/f2/6c/d7f26cd70a54599ba3515ac42ce26a9c.jpg'
        }, {
            name: "sand shooter",
            description: "shooting sand shooting sand shooting sand shooting sand and also maybe people???? never",
            quantity: 89,
            price: 12932,
            category: waterCat._id,
            store: nsa._id,
            photoUrl: 'http://www.gravelshooter.net/images/Commercialservices.jpg'
        }, {
            name: "Improvised Explosive Device",
            description: "Please buy one of these. It will make our job much easier.",
            quantity: 89,
            price: 1,
            category: terrCat._id,
            store: nsa._id,
            photoUrl: 'http://s.hswstatic.com/gif/ied-2.jpg',
        }, {
            name: "American Flag",
            description: "Go for the full American. Get this giant flag.",
            quantity: 89,
            price: 1,
            category: fightCat._id,
            store: gobama._id,
            photoUrl: 'http://cdn.meme.am/instances/54484550.jpg'
        }];
        return Promise.resolve(Product.create(products));
    });
};

var seedReviews = function (userId, productId) {

    return Promise.all([
        Product.findOne({name: "sand shooter"}).exec(),
        Product.findOne({name: "American Flag"}).exec(),
        Product.findOne({name: "Improvised Explosive Device"}).exec(),
        Product.findOne({name: "surfbort"}).exec(),
        User.findOne({email: "obama@gmail.com"}).exec(),
        User.findOne({email: "testing@nsa.com"}).exec()
    ])
    .spread(function (ss, af, ied, sb, obama, nsa) {
        var reviews = [{
            title: "this surfboard rules",
            rating: 5,
            description: "like i said, like i said,like i said, like i said, like i said",
            user: obama._id,
            product: sb._id
        }, {
            title: "this surfboard is terrrible",
            rating: 1,
            description: "like i said, dude -like i said, dude -like i said, dude",
            user: obama._id,
            product: sb._id
        }, {
            title: "This IED worked for me",
            rating: 4,
            description: "Not so sure about others, so YMMV. Whut up playassssssssssssssss",
            user: nsa._id,
            product: ied._id
        }, {
            title: "AMURICA",
            rating: 5,
            description: "dis here flag is the bestest dis here flag is the bestest dis here flag is the bestest dis here flag is the bestest",
            user: obama._id,
            product: af._id
        }];
        return Promise.resolve(Review.create(reviews));   
    });
};


var seedOrders = function (userId, productId) {
    return Promise.all([
        Product.findOne({name: "sand shooter"}).exec(),
        Product.findOne({name: "American Flag"}).exec(),
        Product.findOne({name: "Improvised Explosive Device"}).exec(),
        Product.findOne({name: "surfbort"}).exec(),
        User.findOne({email: "obama@gmail.com"}).exec(),
        User.findOne({email: "testing@nsa.com"}).exec()
    ])
    .spread(function (ss, af, ied, sb, obama, nsa) {
        var orders = [{
            items: [{
                quantity: 200,
                product: ied._id
            }, {
                quantity: 12,
                product: af._id
            }],
            user: obama._id,
            session: "fakesession1",
            address: {
                address1: "1121 E Tallahassee Blvd",
                address2: "Apt 12",
                city: "Gary",
                zip: "12345",
                state: "IN"
            },
            email: obama.email,
            name: "obama",
            total: 123
        }, {
            items: [{
                quantity: 200,
                product: ss._id
            }, {
                quantity: 12,
                product: sb._id
            }],
            user: nsa._id,
            session: "fakesession2",
            address: {
                address1: "1121 E Tallahassee Blvd",
                address2: "Apt 12",
                city: "Gary",
                zip: "12345",
                state: "IN"
            },
            email: obama.email,
            name: "obama",
            total: 123425
        }];
        return Promise.resolve(Order.create(orders));
    });
};
    
connectToDb.then(function () {
    return Promise.resolve(User.find().exec())
    .then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        return Store.find().exec();
    }).then(function (stores) {
        if (stores.length === 0) {
            return seedStores();
        } else {
            console.log(chalk.magenta('Seems to already be store data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        return Promise.all([Category.find().exec(), Product.find().exec()]);
    }).then(function (catsProds) {
        if (catsProds[0].length === 0 && catsProds[1].length === 0) {
            return seedCategoriesAndProducts();
        } else {
            console.log(chalk.magenta('Seems to already be category/product data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        return Review.find().exec();
    }).then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews();
        } else {
            console.log(chalk.magenta('Seems to already be review data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        return Order.find().exec();
    }).then(function (orders) {
        if (orders.length === 0) {
            return seedOrders();
        } else {
            console.log(chalk.magenta('Seems to already be review data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.dir(err);
        process.kill(1);
    });
});
