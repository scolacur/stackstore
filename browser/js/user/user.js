app.config(function($stateProvider){
  $stateProvider
  .state('user', {
    url: '/user/:userId',
    templateUrl: '/js/user/user.html',
    controller: function ($scope, StoreFactory, $rootScope) {
      StoreFactory.getAll()
      .then(function (stores) {
          $scope.stores = stores;
      });
      $scope.$on('newStore', function (e, store) {
          $scope.stores.push(store);
      });
    }
  });
});
