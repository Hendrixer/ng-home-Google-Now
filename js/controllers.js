angular.module('MeApp')

.controller('HomeCtrl', [$scope, function($scope) {
  $scope.template = 'Home';
}])
.controller('Projects', [$scope, function($scope) {
  $scope.template = 'Projects';
}]);