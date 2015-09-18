'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/reviews', require('./reviews'));
router.use('/cart', require('./cart'));
router.use('/categories', require('./categories'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
