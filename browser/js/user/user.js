app.config(function($stateProvider){
  $stateProvider
  .state('user', {
    url: '/user/:userId',
    templateUrl: '/js/user/user.html',
    resolve: {
      user: function (UserFactory, $stateParams) {
        return UserFactory.getById($stateParams.userId)
      } 
    },
    controller: function (user, $scope, StoreFactory, $rootScope) {
      $scope.user = user;
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
