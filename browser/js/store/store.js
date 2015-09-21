app.config(function ($stateProvider) {
  $stateProvider.state('store', {
    url: '/stores/:storeName',
    templateUrl: '/js/store/store.html',
    controller: function ($scope, Store, $stateParams, ProductFactory, Session, $state, $rootScope) {
			$scope.isDetail = $state.is("store");

			Store.getByName($stateParams.storeName)
      .then(function (store) {
        $scope.store = store;

				if (Session.user){
					$scope.isAdmin = Session.user.isAdmin;
					$scope.isOwner = Session.user._id === store.user._id;
				} else {
					$scope.isAdmin = false;
					$scope.isOwner = false;
				}
				console.log("do you own this store? ", $scope.isOwner);
        return ProductFactory.getProducts({store: store._id});
      })
      .then(function (products) {
        $scope.products = products;
      });

      $scope.saveStore = function (storeName, props) {
        Store.edit(storeName, props)
        .then(function () {
					$rootScope.editMode = false;
          console.log('store saved!')
        })
      }
    }
  })
});
