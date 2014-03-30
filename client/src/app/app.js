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