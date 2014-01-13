angular.module('MeApp', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/projects', {
      templateUrl: '../views/projects.html',
      controller: 'Projects.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});