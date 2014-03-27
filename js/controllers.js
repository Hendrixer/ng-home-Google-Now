angular.module('MeApp')

.controller('HomeCtrl', function($scope, $state) {
  $state.transitionTo('home.cards');
  $scope.facts = 'Software Engineer';
  $scope.template = 'Home';
  $scope.contacts = [
    {name: 'Linkedin', url: 'http://www.linkedin.com/in/willscottmoss', img: 'assets/icons/32/32-linkedin.png'},
    {name: 'Google +', url: 'https://www.github.com/hendrixer', img: 'assets/icons/32/32-googleplus.png'}
  ];
  $scope.headers = [{header: 'yo'}, {header: 'hey', yes: 'yes'}];
})

.controller('ProjectsCtrl', function($scope) {
  $scope.template = 'Projects';
});