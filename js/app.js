angular.module('MeApp', ['ngRoute', 'ngAnimate'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/projects', {
      templateUrl: '../views/projects.html',
      controller: 'ProjectsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});