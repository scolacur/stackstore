app.directive('userDetail', function(UserFactory, $stateParams, $state, Session){
  return {
	restrict: 'E',
	templateUrl: '/js/common/directives/user/user-detail/user-detail.html',
	link: function (scope){
		scope.isDetail = true;
		scope.isAdmin = Session.user.isAdmin;
		scope.editMode = false;

		UserFactory.getById($stateParams.userId)
		.then(function(user){
			scope.user = user;
		});
		UserFactory.getOrders($stateParams.userId)
		.then(function (orders) {
			scope.orders = orders;
		});
		UserFactory.getReviews($stateParams.userId)
		.then(function(reviews){
			scope.reviews = reviews;
		});
		UserFactory.getStores($stateParams.userId)
		.then(function(stores){
			scope.stores = stores;
		});

		scope.saveUser = function (user) {
			UserFactory.edit(user._id, user)
			.then(function (updatedUser) {
				scope.user = updatedUser;
				scope.editMode = false;
				console.log('user saved!', updatedUser);
			});
		};
	}
  };
});