app.config(function ($stateProvider) {
  $stateProvider.state('store', {
    url: '/stores/:storeName',
    templateUrl: '/js/store/store.html',
    controller: function ($scope, Store, $stateParams, ProductFactory) {
      Store.getByName($stateParams.storeName)
      .then(function (store) {
        $scope.store = store;
        return ProductFactory.getProducts({store: store._id});
      })
      .then(function (products) {
        $scope.products = products;
      });

      $scope.saveStore = function (storeName, props) {
        Store.edit(storeName, props)
        .then(function () {
          console.log('store saved!')
        })
      }
    }  
  })
});