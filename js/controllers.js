angular.module('MeApp')

.controller('HomeCtrl', function($scope) {
  $scope.facts = 'Software Engineer';
  $scope.template = 'Home';
  $scope.contacts = [
    {name: 'Linkedin', url: 'http://www.linkedin.com/in/willscottmoss', img: 'assets/icons/32/32-linkedin.png'},
    {name: 'Google +', url: 'https://www.github.com/hendrixer', img: 'assets/icons/32/32-googleplus.png'}
  ];

  var goodThings = ['Software Engineer', 'Full Stack Developer', 'Javascript Expert', 'Veteran', 'Angular contributor'];
  var randomGood = function() {
    var thing = Math.floor(Math.random() * (goodThings.length));
    $scope.facts = goodThings[thing];
  };

  setInterval(function() {
    $scope.$apply(function() {
      randomGood();
    });
  }, 1200);

})

.controller('ProjectsCtrl', function($scope) {
  $scope.template = 'Projects';
});