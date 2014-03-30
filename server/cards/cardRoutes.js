"use strict";

var controller = require('./cardController.js');

module.exports = function(app){
  app.get('/api/cards', controller.allCards);
  app.get('/api/card/:card', controller.card);
};