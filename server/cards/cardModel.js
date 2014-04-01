"use strict";

var Q         = require('q'),
    mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var CardModel = new Schema({
  card_type: {
    type: String,
    required: true
  },
  header: String,
  asset: String,
  content: String,
  meta: [{type: String}],
  url: String,

  created: {
    type: Date,
    default: Date.now()
  }
});

// CardModel.statics.makeCard = function(){
//   var deferred  = Q.defer()
//       Card      = mongoose.model('Card');

//   var newCard = new Card({
//     card_type
//   });
// };

module.exports = mongoose.model('Card', CardModel);

