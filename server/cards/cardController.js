"use strict";

var Card    = require('./cardModel.js');


module.exports = {
  allCards: function(req, res, next){
    Card.find({}, function (err, cards){
      if (err){
        next(err);
      } else if(cards){
        res.json(cards);
      }
    });
  },

  card: function(req, res, next) {
    var id = req.params.card;
    Card.findById(id, function (err, card){
      if(err){
        next(err);
      } else {
        res.json(card);
      }
    });
  }
};