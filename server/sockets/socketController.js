"use strict";


// contorllers for socket routes
module.exports = {
  allTweets: function(socket, T){
    T.get('/statuses/user_timeline');
  }
};
