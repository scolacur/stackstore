app.config(function ($stateProvider) {
  $stateProvider.state('store', {
    url: '/stores/:storeName',
    templateUrl: '/js/store/store.html',
    controller: function ($scope, Store, $stateParams, Product) {
      Store.getByName($stateParams.storeName)
      .then(function (store) {
        $scope.store = store;
        return Product.getProducts({store: store._id});
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