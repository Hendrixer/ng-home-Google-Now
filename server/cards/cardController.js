"use strict";

var Card = require('./cardModel.js');


module.exports = {
  allCards: function(req, res){
    Card.find({}, function(err, cards){
      res.json(cards);
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