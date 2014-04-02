process.NODE_ENV = 'test';

var expect = require('expect.js'),
    Card   = require('../cardMaker.js')().card;

describe('Card constructor', function(){
  var card;
  var tweet = {
    text: "I'm tweeting",
    user: {
      profile_img_url: 'http://yo.com',
      screen_name: 'scotups'
    },
    tweetCard: true
  };

  before(function (done){
    card = new Card();
    done();
  });

  describe('New card', function(){
    it('should be a new instance of Card', function(done){
      expect(card).to.be.an(Object);
      expect(card.constructor).to.eql(Card);
      done();
    });
  });
  describe('Format new card', function(){
    it('should format Tweet', function(done){
      card.format(tweet);
      expect(card.card_type).to.be('Social');
      expect(card.origin).to.be('twitter');
      expect(card.header).to.be('@scotups');
      expect(card.url).to.be('https://twitter.com/scotups');
      done();
    });
  });
});