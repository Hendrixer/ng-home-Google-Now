angular.module('Home.cards')

.factory('Cards', function ($http){
  return {
    allCards: function(){
      return $http({
        method: 'GET',
        url: '/api/cards'
      });
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
  return socketFactory({
    ioSocket: io.connect('/', {
      reconnect: true
    })
  });
});