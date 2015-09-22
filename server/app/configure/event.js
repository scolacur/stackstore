var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
module.exports = {ee: ee, newRandom: newRandom};

function newRandom () {
    setInterval( function () {
        ee.emit("randomize");
    }, 10000)
};
