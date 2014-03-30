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
      <div class="card card-type-{{ type }}">\
        <div class="col-xs-12">\
          <h1 class="inset-text">\
            <a ng-href="{{ url }}"> {{ title }}</a>\
          </h1>\
          <div class="card-content" ng-transclude>\
          </div>\
        </div>\
      </div>\
    </section>',
    transclude: true,
    replace: true
  };
});