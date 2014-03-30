var EventEmitter  = require('events').EventEmitter,
    twit          = new EventEmitter();

// Will add more events for other API's
module.exports = {
  'twit': twit
};