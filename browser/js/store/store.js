app.config(function ($stateProvider) {
  $stateProvider.state('store', {
    url: '/stores/:storeName',
    templateUrl: '/js/store/store.html',
    controller: function ($scope, Store, $stateParams) {
      console.log('in store detail state')
      Store.getByName($stateParams.storeName)
      .then(function (store) {
        console.log("store is", store);
        $scope.store = store;
      })
    }  
  })
});