"use strict";

var Twit          = require('twit'),
    controller    = require('./socketController.js'),
    TweetQueue    = require('../cards/cardMaker.js')().queue,
    Card          = require('../cards/cardMaker.js')().card,
    twit          = require('../config/events.js').twit,
    tweetJob      = new TweetQueue(),
    newCard       = new Card();


// Init Twitter api auth
var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});


// declare a new stream to the current auth user
var stream = T.stream('user');

// event listener on stream
stream.on('tweet', function (tweet){
  if(tweet.user.screen_name === process.env.TWITTER_HANDLE){
    tweetJob.queue(tweet, twit);
  }
});

// exports routes for sockets
module.exports = function(socket, io){
  socket.emit('connected', {message: 'client connected'});

  socket.on('get tweets', function(){
    controller.allTweets(socket, T);
  });

  /*
    Possible to get more than one tweet from twitter at the same time
    que them up fist and then send a socket event
  */
  twit.on('tweet', function (queueTweet){
    queueTweet.tweetCard = true;
    newCard.format(queueTweet);
    console.log(newCard);
    socket.emit('send card', newCard);
  });

};
