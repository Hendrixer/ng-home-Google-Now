"use strict";


// card class to standardize all info from any 3rd party API
var Card = function(){
  this.card_type = null;
  this.user_name = null;
  this.origin = null;
  this.content = null;
  this.meta = [];
  this.asset = null;
  this.url = null;
  this.created = Date.now();
};

// used to format all cards for angular
Card.prototype.format = function(data) {
  if(data.tweetCard){
    this.card_type = 'Social';
    this.origin = 'Twitter';
    this.content = data.text;
    this.asset = data.user.profile_img_url;
    this.user_name = '@'+data.user.screen_name;
    this.url = 'https://twitter.com/'+this.user_name;
  } else if (data.codeCard){

  } else if(data.blogCard){

  }
};


// used to queue up possible duplicate queues from streaming API
var TweetQueue = function(){
  var __self = this;
  this.storage = {};
  this.size = 0;
  this.reset = function(){
    console.log('reset');
    __self.storage = {};
    __self.size = 1;
  };
};

// insert tweet into queue
TweetQueue.prototype.queue = function(item, event) {
  var id = ''+item.id;
  if(!this.storage[id]){
    this.storage[id] = 1;
    event.emit('tweet', item);
    this.size++;
    if(this.size >= 5){
      this.reset();
    }
    console.log(this.storage);
  } else if(this.storage[id]){
    this.storage[id]++;
    this.size++;
    console.log('size', this.size);
    if(this.size >= 5){
      this.reset();
    }
    console.log(this.storage);
  }
};

module.exports = function(){
  return {
    card: Card,
    queue: TweetQueue
  };
};