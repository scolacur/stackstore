app.config(function ($stateProvider) {
	$stateProvider.state('home', {
			url: '/',
			templateUrl: 'js/home/home.html',
		controller: function($scope, $rootScope, StoreFactory){
			StoreFactory.getAll()
			.then(function (stores) {
				$scope.stores = stores;
			});
		}
	});
});
