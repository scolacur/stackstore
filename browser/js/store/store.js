app.config(function ($stateProvider) {
	$stateProvider.state('store', {
		url: '/stores/:storeName',
		templateUrl: '/js/store/store.html',
		resolve: {
			store: function (StoreFactory, $stateParams) {
				return StoreFactory.getByName($stateParams.storeName)
			}
		},
		controller: function ($scope, store, StoreFactory, $stateParams, Session, $state, ProductFactory) {
			$scope.isDetail = $state.is("store");
			$scope.storeEdit = false;
			$scope.store = store;

			if (Session.user){
				$scope.isAdmin = Session.user.isAdmin;
				$scope.isOwner = Session.user._id === store.user._id;
			} else {
				$scope.isAdmin = false;
				$scope.isOwner = false;
			}

			ProductFactory.getProducts({store: store._id})
			.then(function (products) {
				$scope.products = products;
			});

			$scope.enableStoreEdit = function () {
				console.log('got to store edit');
				$scope.cached = angular.copy($scope.store);
				$scope.storeEdit = true;
			};
			$scope.cancelStoreEdit = function () {
				console.log('cancelling');
				$scope.store = angular.copy($scope.cached);
				$scope.storeEdit = false;
			};
			$scope.saveStore = function (storeName, props) {
				StoreFactory.edit(storeName, props)
				.then(function () {
					$scope.storeEdit = false;
				});
			};
		}
	});
});
