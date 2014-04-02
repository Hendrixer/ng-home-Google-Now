angular.module('Home', [
  'ui.router',
  'ngAnimate',
  'Home.cards'
  ])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'src/app/home.html',
    controller: 'HomeController'
  })
  .state('home.cards', {
    templateUrl: 'src/cards/home.cards.html',
    controller: 'CardController'
  });
});
angular.module('Home')

.controller('HomeController', function ($scope, $state) {
  $state.transitionTo('home.cards');
});
angular.module('Home.cards', ['btford.socket-io']);
angular.module('Home.cards')

.factory('Cards', function ($http){
  return {
    allCards: function(){
      return $http({
        method: 'GET',
        url: '/api/cards'
      });
    },

    oneCard: function(id){
      return $http({
        method: 'GET',
        url: '/api/card/'+id
      });
    }
  };
})
.factory('$Socket', function (socketFactory){
  return socketFactory({
    ioSocket: io.connect('/', {
      reconnect: true
    })
  });
});
angular.module('Home.cards')

.directive('card', function(){
  return {
    restrict: 'AE',
    scope: {
      type: '@'
    },
    templateUrl: '/src/cards/directiveTemplates/card.html',
    transclude: true,
    replace: true
  };
});
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


  // $Socket.on('send tweet', function (data){
  //   angular.forEach(data, function (tweet){
  //     $scope.cards.push(tweet);
  //   });
  // });

  $Socket.on('send card', function (data){
    (function (card){ // use an IFIE to take advantage of widnow.console / could use bind
      $scope.cards.push(card);
    }(data));
  });

  $Socket.on('connected', function (data){
    (function(){
      console.log(data.message);
    }());
  });

});