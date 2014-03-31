angular.module('Home.cards')

.directive('card', function(){
  return {
    restrict: 'AE',
    scope: {
      type: '@',
      title: '@',
      url: '@'
    },
    template: '<section class="row">\
      <div class="card col-xs-12 card-type-{{ type }}">\
        <h1 class="inset-text">\
          <a ng-href="{{ url }}"> {{ title }}</a>\
        </h1>\
        <div class="card-content" ng-transclude></div>\
      </div>\
    </section>',
    transclude: true,
    replace: true
  };
});