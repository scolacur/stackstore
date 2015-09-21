app.config(function ($stateProvider) {
  $stateProvider.state('stores', {
    url: '/stores',
    templateUrl: '/js/stores/stores.html',
    controller: function ($scope, findStores) {
      $scope.stores = findStores;
    },
    resolve: {
      findStores: function (StoreFactory) {
        return StoreFactory.getAll()
        .then(function (stores) {
          return stores;
        });
      }
    }
  });
});
