var me = angular.module('MeApp', ['ngRoute']);

me.config(function($routeProvider) {
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