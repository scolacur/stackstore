app.directive('userDetail', function(UserFactory, $stateParams, $state, $rootScope, Session){
  return {
	restrict: 'E',
	templateUrl: '/js/common/directives/user/user-detail/user-detail.html',
	link: function (scope){
		scope.isDetail = true;
		scope.isAdmin = Session.user.isAdmin;
		scope.saveUser = function (user) {
			UserFactory.edit(user._id, user)
			.then(function (updatedUser) {
				scope.user = updatedUser;
				$rootScope.editMode = false;
				console.log('user saved!', updatedUser);
			});
		};
	},
	scope: {
		user: "=",
		stores: "=",
		reviews: "=",
		orders: "="
	}
  };
});
