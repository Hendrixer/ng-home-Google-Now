angular.module('MeApp', ['ui.router', 'ngAnimate'])

.config(function($stateProvider, $urlRouterProvider) {
  // $routeProvider
  //   .when('/', {
  //     templateUrl: '../views/home.html',
  //     controller: 'HomeCtrl'
  //   })
  //   .when('/projects', {
  //     templateUrl: '../views/projects.html',
  //     controller: 'ProjectsCtrl'
  //   })
  //   .otherwise({
  //     redirectTo: '/'
  //   });

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '../views/home.html',
    controller: 'HomeCtrl'
  })
  .state('home.cards', {
    templateUrl: '../views/home.cards.html',
    controller: 'HomeCtrl'
  });

})
.directive('card', function(){
  return {
    restrict: 'EA',
    scope: {
      title: '@',
      header: '@'
    },
    template: '<section class="row">\
      <div class="card">\
        <div class="col-xs-12">\
          <h2 class="inset-text">{{ title }}\
          </h2>\
          <div class="content" ng-transclude>\
          </div>\
        </div>\
      </div>\
    </section>',

    replace: true,
    transclude: true
  };
})
.directive('row', function(){
  return {
    restrict: 'EA',
    scope: {
      width: '@'
    },

    template: '<div class="row">\
      <div ng-class="{{ width }}" ng-transclude>\
      </div>\
    </div>',
    transclude: true,
    replace: true
  };
});
