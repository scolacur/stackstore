app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
		controller: function($rootScope){
			$rootScope.editMode = false;
			$rootScope.toggleEdit = function(){
				$rootScope.editMode = !$rootScope.editMode;
			};
		}
    });
});
