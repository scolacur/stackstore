app.directive('userDetail', function(User, $stateParams, $state, $rootScope, Session){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/user-detail/user-detail.html',
    link: function (scope){
				scope.isDetail = true;
				scope.isAdmin = Session.user.isAdmin;

        User.getById($stateParams.userId)
        .then(function(user){
            scope.user = user;
        });
        User.getOrders($stateParams.userId)
        .then(function (orders) {
            scope.orders = orders;
        });
        User.getReviews($stateParams.userId)
        .then(function(reviews){
            scope.reviews = reviews;
        });
        User.getStores($stateParams.userId)
        .then(function(stores){
            scope.stores = stores;
        });

				scope.saveUser = function (user) {
					User.edit(user._id, user)
					.then(function (updatedUser) {
						scope.user = updatedUser;
						$rootScope.editMode = false;
						console.log('user saved!', updatedUser);
					});
				};
    }
  };
});
