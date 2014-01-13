angular.module('MeApp')

.controller('HomeCtrl', function($scope) {
  $scope.template = 'Home';
})

.controller('Projects', function($scope) {
  $scope.template = 'Projects';
});