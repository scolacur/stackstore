app.config(function ($stateProvider) {
	$stateProvider.state('home', {
			url: '/',
			templateUrl: 'js/home/home.html',
		controller: function($scope, $rootScope, Store){
			Store.getAll()
			.then(function (stores) {
				$scope.stores = stores;
			});
			var edited = false;
			$rootScope.toggleEdit = function(){
				if (!edited) {
					$rootScope.editMode = false;
					edited = true;
				}
				$rootScope.editMode = !$rootScope.editMode;
			};
		}
	});
});
