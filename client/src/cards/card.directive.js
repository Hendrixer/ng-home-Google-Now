angular.module('Home.cards')

.directive('card', function(){
  return {
    restrict: 'AE',
    scope: {
      type: '@',
      title: '@',
      url: '@'
    },
    templateUrl: '/src/cards/directiveTemplates/card.html',
    transclude: true,
    replace: true
  };
});