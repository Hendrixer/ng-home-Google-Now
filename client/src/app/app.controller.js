angular.module('Home')

.controller('HomeController', function ($scope, $state) {
  $state.transitionTo('home.cards');
});