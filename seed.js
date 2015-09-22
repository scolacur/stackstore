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
    }, {
        email: 'd@d.com',
        password: 'd',
        isAdmin: true
    }, {
        email: 'joe@alves.com',
        password: 'salty'
    }, {
        email: 'omri@thatsinteresting.com',
        password: 'password'
    }, {
        email: 'nimit@timin.com',
        password: 'fullstack'
    }, {
        email: 'gabe@starvingartist.com',
        password: 'karaoke'
    }];

    return Promise.resolve(User.create(users));
};

var seedStores = function () {


    return Promise.all([
        User.findOne({email: 'testing@nsa.com'}).exec(),
        User.findOne({email: 'obama@gmail.com'}).exec(),
        User.findOne({email: 'joe@alves.com'}).exec(),
        User.findOne({email: 'omri@thatsinteresting.com'}).exec(),
        User.findOne({email: 'nimit@timin.com'}).exec(),
        User.findOne({email: 'gabe@starvingartist.com'}).exec()
    ])
    .then(function (users) {

        var stores = [{
            name: "We're Watching You",
            description: "Look We're Still Looking At You",
            urlName: "NSA",
            user: users[0]._id
        }, {
            name: "Uncle Sam's Cabin",
            description: "Loving the way you live your freedom",
            urlName: "gobama",
            user: users[1]._id
        }, {
            name: "Get Wet",
            description: "Been makin' you wet since 1990",
            urlName: "watertime",
            user: users[2]._id
        }, {
            name: "Omri's Well-Worn Clothes Store",
            description: "Dress your best with things I wore",
            urlName: "freshclothes",
            user: users[3]._id
        }, {
            name: "You Wish You Could Afford This",
            description: "The finest luxury items you can't afford",
            urlName: "expensive",
            user: users[4]._id
        }, {
            name: "Gabe Things",
            description: "All things Gabe-esque",
            urlName: "gaberama",
            user: users[5]._id
        }];
        return Promise.resolve(Store.create(stores));
    });
};
debugger;
var seedCategoriesAndProducts = function () {

    return Promise.all([
        Category.create({title: 'Fighting Equipment'}),
        Category.create({title: 'Terrorist Tools'}),
        Category.create({title: 'Watersports Gear'}),
        Category.create({title: 'Default'}),
        Category.create({title: 'Samurai Accessories'}),
        Category.create({title: 'Karaoke'}),
        Category.create({title: 'Art Supplies'}),
        Category.create({title: 'Mesh Tanks'}),
        Category.create({title: 'Drop Pants'}),
        Category.create({title: 'Hipster Hats'}),
        Category.create({title: 'Supersoakers'}),
        Category.create({title: 'Giant Watches'}),
        Category.create({title: 'Diamonds'}),
        Category.create({title: 'Disgusting Delicacies'}),
        Store.findOne({urlName: "NSA"}).exec(),
        Store.findOne({urlName: "gobama"}).exec(),
        Store.findOne({urlName: "watertime"}).exec(),
        Store.findOne({urlName: "freshclothes"}).exec(),
        Store.findOne({urlName: "expensive"}).exec(),
        Store.findOne({urlName: "gaberama"}).exec()
    ])
    .spread(function (fightCat, terrCat, waterCat, defaultCat, samuraiCat, karaokeCat, artCat, meshCat, dropCat, hatCat, soakCat, watchCat, diamondCat, disgCat, nsa, gobama, watertime, freshclothes, expensive, gaberama) {
        var products = [{
            name: "Surfbort",
            description: "a surfbort which is obviously coolest",
            inventory: 8,
            price: 12,
            categories: [waterCat._id],
            store: nsa._id,
            photoUrl: 'https://s-media-cache-ak0.pinimg.com/736x/d7/f2/6c/d7f26cd70a54599ba3515ac42ce26a9c.jpg'
        }, {
            name: "Sand Shooter",
            description: "shooting sand shooting sand shooting sand shooting sand and also maybe people???? never",
            inventory: 89,
            price: 12932,
            categories: [waterCat._id, fightCat._id],
            store: nsa._id,
            photoUrl: 'http://www.gravelshooter.net/images/Commercialservices.jpg'
        }, {
            name: "Improvised Explosive Device",
            description: "Please buy one of these. It will make our job much easier.",
            inventory: 89,
            price: 1,
            categories:[terrCat._id],
            store: nsa._id,
            photoUrl: 'http://s.hswstatic.com/gif/ied-2.jpg',
        }, {
            name: "American Flag",
            description: "Go for the full American. Get this giant flag.",
            inventory: 89,
            price: 1,
            categories: [fightCat._id],
            store: gobama._id,
            photoUrl: 'http://cdn.meme.am/instances/54484550.jpg'
        }, {
            name: "Authentic Samurai Sword",
            description: "May your enemies meet a swift and honorable end. Arigato, samurai-san.",
            inventory: 10000,
            price: 5,
            categories: [samuraiCat._id],
            store: gaberama._id,
            photoUrl: 'http://media.nbcwashington.com/images/1200*800/samurai+sword2.jpg'
        }, {
            name: "Deadly but Beautiful Nunchakus",
            description: "Kind of worthless unless you are Bruce Lee.",
            inventory: 99,
            price: 30,
            categories: [samuraiCat._id],
            store: gaberama._id,
            photoUrl: 'http://www.weapons-universe.com/nunchucks/bruce-lee-nunchucks-game-of-death-thumbnail.jpg'
        }, {
            name: "Auto-tune Synthesizer",
            description: "Perfect if you cannot sing on-key to save your life.",
            inventory: 333,
            price: 99,
            categories: [karaokeCat._id],
            store: gaberama._id,
            photoUrl: 'http://www-tc.pbs.org/wgbh/nova/assets/img/posters/auto-tune-vi.jpg'
        }, {
            name: "Portable Waterproof Karaoke Machine",
            description: "What better way to practice singing Backstreet Boys in the shower?",
            inventory: 999,
            price: 999,
            categories: [karaokeCat._id],
            store: gaberama._id,
            photoUrl: 'http://www.deathwishindustries.com/home/What%20Is%20Best/Best%20Ghetto%20Blaster%20and%20Karaoke%20Machine/Denonet%20GP%20K220%20Karaoke%20Machine.gif'
        }, {
            name: "The Van Gogh Starter Kit",
            description: "Comes complete with a canvas, paintbrushes, paint, and a human ear.",
            inventory: 100,
            price: 50,
            categories: [artCat._id],
            store: gaberama._id,
            photoUrl: 'http://i.dailymail.co.uk/i/pix/2010/01/17/article-1243796-07D2E81A000005DC-154_468x610.jpg'
        }, {
            name: "The Sexiest Drop Pants in the world",
            description: "But still pretty darn ugly, any way you look at them",
            inventory: 1000,
            price: 20,
            categories: [dropCat._id],
            store: freshclothes._id,
            photoUrl: 'http://www.theurbanapparel.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/l/pleated_pocket_drop_crotch_pants.indieclothing.theurbanapparel-7.jpg'
        }, {
            name: "Extra Meshy Mesh Shirt",
            description: "Because you don't need to be a Russian stripclub owner to show your nipples while still wearing clothes",
            inventory: 10,
            price: 100,
            categories: [meshCat._id],
            store: freshclothes._id,
            photoUrl: 'http://pbs.twimg.com/media/A_3oNraCAAE0sLc.jpg:large'
        }, {
            name: "An Unbranded Hipster Hat",
            description: "Make sure to wear at a prententious angle to display your coolness",
            inventory: 100,
            price: 60,
            categories: [hatCat._id],
            store: freshclothes._id,
            photoUrl: 'https://s-media-cache-ak0.pinimg.com/236x/21/4a/14/214a141ee1afb0aac5a03458ddf581c4.jpg'
        }, {
            name: "An Unnecessarily Aggresive Supersoaker",
            description: "With this supersoaker, you can destroy your competition and reign supreme at your next children's pool party",
            inventory: 80,
            price: 100,
            categories: [soakCat._id],
            store: watertime._id,
            photoUrl: 'http://cdn.images.dailystar.co.uk/dynamic/1/photos/109000/620x/121109.jpg'
        }, {
            name: "A Big Watch",
            description: "Encrusted with so many precious jewels for no reason, this watch will give you shoulder problems.",
            inventory: 2,
            price: 1000000,
            categories: [watchCat._id],
            store: expensive._id,
            photoUrl: 'http://i.dailymail.co.uk/i/pix/2014/09/22/article-2764745-21906F7500000578-253_634x619.jpg'
        }, {
            name: "Bag of Diamonds",
            description: "Because making it rain with cash is so low-class.",
            inventory: 1000000,
            price: 300000,
            categories: [diamondCat._id],
            store: expensive._id,
            photoUrl: 'http://adst.org/wp-content/uploads/2015/07/Diamonds.jpg'
        }, {
            name: "Diamond Paperweight",
            description: "Now with extra exorbitance, you can feel the suffering of the diamond miners just emanating off this blood diamond.",
            inventory: 50000,
            price: 10000000,
            categories: [diamondCat._id],
            store: expensive._id,
            photoUrl: 'https://media4.giphy.com/media/k1YTymIwNr8Qg/200_s.gif'
        }, {
            name: "A Tin of Caviar From Sacred Sturgeon",
            description: "Salty.",
            inventory: 300,
            price: 500,
            categories: [disgCat._id],
            store: expensive._id,
            photoUrl: 'https://mbo.chpcentre.com/image/cache/data/Caviar%20tins%20open/Caviar%20House%20Selection/BELUGA-500x404.jpg'
        }];
        return Promise.resolve(Product.create(products));
    });
};
debugger;
var seedReviews = function (userId, productId) {

    return Promise.all([
        Product.findOne({name: "Sand Shooter"}).exec(),
        Product.findOne({name: "American Flag"}).exec(),
        Product.findOne({name: "Improvised Explosive Device"}).exec(),
        Product.findOne({name: "Surfbort"}).exec(),
        Product.findOne({name: "Extra Meshy Mesh Shirt"}).exec(),
        User.findOne({email: "obama@gmail.com"}).exec(),
        User.findOne({email: "testing@nsa.com"}).exec()
    ])
    .spread(function (ss, af, ied, sb, mesh, obama, nsa) {
        var reviews = [{
            title: "I love Omri's used mesh shirts",
            rating: 5,
            description: "This mesh shirt is spectacular. You can really picture Omri in it. Yayyyyyyyyyyyy",
            user: obama._id,
            product: mesh._id
        }, {
            title: "this surfboard is terrrible",
            rating: 1,
            description: "Quite possibly the worst surfboard I've ever used. Booooooooooooooooooo",
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

debugger;
var seedOrders = function (userId, productId) {
    return Promise.all([
        Product.findOne({name: "Sand Shooter"}).exec(),
        Product.findOne({name: "American Flag"}).exec(),
        Product.findOne({name: "Improvised Explosive Device"}).exec(),
        Product.findOne({name: "Surfbort"}).exec(),
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
