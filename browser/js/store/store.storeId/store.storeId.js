app.config(function ($stateProvider) {
  $stateProvider.state('stores.storeId', {
    url: '/stores/:storeId',
    templateUrl: '/js/store/store.storeId/store.storeId.html',
    resolve: {
      store: function (Store) {
        return Store.getStore();
      }
    }    
  })
});