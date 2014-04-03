"use strict";
var Card  = require('../cards/cardMaker.js')().card,
    card  = new Card();

// contorllers for socket routes
module.exports = {
  allTweets: function(socket, T){
    T.get('/statuses/user_timeline',
      {screen_name: process.env.TWITTER_HANDLE, count: 1},
      function (err, reply){
        reply.forEach(function (tweet){
          tweet.tweetCard = true;
          card.format(tweet);
          socket.emit('send card', card);
        });
      }
    );
  }
};
