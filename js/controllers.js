angular.module('MeApp')

.controller('HomeCtrl', function($scope) {
  $scope.template = 'Home';
})

.controller('ProjectsCtrl', function($scope) {
  $scope.template = 'Projects';
});