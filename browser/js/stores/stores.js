app.config(function ($stateProvider) {
  $stateProvider.state('stores', {
    url: '/stores',
    templateUrl: '/js/stores/stores.html',
    controller: function ($scope, StoreFactory) {
      StoreFactory.getAll()
      .then(function (stores) {
        $scope.stores = stores;
      });
    }
  });
});
