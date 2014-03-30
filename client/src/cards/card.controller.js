angular.module('Home.cards')

.controller('CardController', function ($scope, Cards, $Socket) {
  $scope.cards = [];
  Cards.allCards()
  .then(function (cards){
    angular.forEach(cards.data, function (card){
      $scope.cards.push(card);
    });
  });

  $Socket.emit('get tweets');

  $Socket.on('send tweet', function (data){
    angular.forEach(data, function (tweet){
      $scope.cards.push(tweet);
    });
  });

  $Socket.on('send card', function (data){
    (function (card){
      console.log('got one card', card);
      $scope.cards.push(card);
    }(data));
  });

  $Socket.on('connected', function (data){
    (function(){
      console.log(data.message);
    }());
  });

});