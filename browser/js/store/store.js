app.config(function ($stateProvider) {
  $stateProvider.state('store', {
    url: '/stores/:storeName',
    templateUrl: '/js/store/store.html',
    controller: function ($scope, Store, $stateParams) {
      Store.getByName($stateParams.storeName)
      .then(function (store) {
        console.log("store is", store);
        $scope.store = store;
      });

      $scope.editMode = true;

      $scope.saveStore = function (storeName, props) {
        Store.edit(storeName, props)
        .then(function (store) {
          console.log('store saved!')
        })
      }
    }  
  })
});