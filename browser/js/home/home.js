app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller: function($scope, $rootScope, findStores){
			$scope.stores = findStores;
		},
		resolve: {
			findStores: function (StoreFactory) {
				return StoreFactory.getAll()
				.then(function (stores) {
					console.log(stores);
					return stores;
				});
			}
		}
	});
});
