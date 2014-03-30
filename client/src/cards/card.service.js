angular.module('Home.cards')

.factory('Cards', function ($http){
  return {
    allCards: function(){
      return $http({
        method: 'GET',
        url: '/api/cards'
      });
      // .then(cb, function(reason){
      //   console.error(reason);
      // });
    },
    oneCard: function(id){
      return $http({
        method: 'GET',
        url: '/api/card/'+id
      });
    }
  };
})
.factory('$Socket', function (socketFactory){
  return socketFactory();
});