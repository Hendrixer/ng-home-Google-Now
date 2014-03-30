process.NODE_ENV = 'test';

var expect = require('expect.js'),
    Queue  = require('../cardMaker.js')().queue;

describe('Tweet Queue', function(){
  var job, tweets, event;

  before(function(done){
    job = new Queue();
    tweets = new Array(4);
    for(var i = 0; i < tweets.length; i++){
      tweets[i] = {id: i+''};
    }
    event = {emit: function(a, b){
      return a, b;
    }};
    done();
  });

  describe('New Queue', function(){
    it('should make a new tweetQueue', function (done){
      expect(job).to.be.an(Object);
      expect(job.constructor).to.eql(Queue);
      done();
    });
  });

  describe('queue a tweet', function (){
    it('should queue a tweet', function (done){
      job.queue(tweets[0], event);
      expect(job.size).to.be(1);
      done();
    });

    it('should reset if greater than 4', function (done){
      tweets.forEach(function (tweet){
        job.queue(tweet, event);
      });
      expect(job.size).to.be(1);
      done();
    });
  });
});