app.config(function ($stateProvider) {
  $stateProvider.state('stores', {
    url: '/stores',
    templateUrl: '/js/stores/stores.html',
    controller: function ($scope, Store) {
      Store.getAll()
      .then(function (stores) {
        $scope.stores = stores;
      });
    }
  });
});
