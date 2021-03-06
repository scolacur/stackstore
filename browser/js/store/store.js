app.config(function ($stateProvider) {
	$stateProvider.state('store', {
		url: '/stores/:storeName',
		templateUrl: '/js/store/store.html',
		resolve: {
			store: function (StoreFactory, $stateParams) {
				return StoreFactory.getByName($stateParams.storeName)
			}
		},
		controller: function (AuthService, $scope, store, StoreFactory, $stateParams, Session, $state, ProductFactory) {
			$scope.isDetail = $state.is("store");
			$scope.storeEdit = false;
			$scope.store = store;
			$scope.store.css = {};

			$scope.store.css.urlName = store.urlName;

			$scope.$on('randomize', function (e, newInfo, oldInfo) {
				if (store._id.toString() !== newInfo.store &&
					store._id.toString() !== oldInfo.store) return;
				ProductFactory.getProducts({store: store._id})
				.then(function (products) {
					$scope.products = products;
				})
			});

			ProductFactory.getProducts({store: store._id})
			.then(function (products) {
				$scope.products = products;
				return AuthService.getLoggedInUser()
			})
			.then(function(user){
				if (user) {
					$scope.isAdmin = user.isAdmin;
					$scope.isOwner = user._id === $scope.store.user._id;
				} else {
					$scope.isAdmin = false;
					$scope.isOwner = false;
				}
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

			$scope.colors = [
				"White",
				"Pink",
				"LightBlue",
				"LightCoral",
				"LightGoldenrodYellow",
				"LightGray",
				"LightSeaGreen",
				"Aquamarine",
				"GhostWhite",
				"IndianRed",
				"Lavender",
			];
		}
	});
});
