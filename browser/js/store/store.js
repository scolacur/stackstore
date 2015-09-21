app.config(function ($stateProvider) {
	$stateProvider.state('store', {
		url: '/stores/:storeName',
		templateUrl: '/js/store/store.html',
		controller: function ($scope, StoreFactory, $stateParams, ProductFactory, Session, $state) {
			$scope.isDetail = $state.is("store");
			$scope.editMode = false;
			StoreFactory.getByName($stateParams.storeName)
			.then(function (store) {
				$scope.store = store;

				if (Session.user){
					$scope.isAdmin = Session.user.isAdmin;
					$scope.isOwner = Session.user._id === store.user._id;
				} else {
					$scope.isAdmin = false;
					$scope.isOwner = false;
				}
			return ProductFactory.getProducts({store: store._id});
			})
			.then(function (products) {
				$scope.products = products;
			});

			$scope.saveStore = function (storeName, props) {
				StoreFactory.edit(storeName, props)
				.then(function () {
					$scope.editMode = false;
				});
			};
			$scope.enableEdit = function () {
				$scope.cached = angular.copy($scope.store);
				$scope.editMode = true;
			};
			$scope.cancelEdit = function(){
				$scope.store = angular.copy($scope.cached);
				$scope.editMode = false;
			};
		}
	});
});
