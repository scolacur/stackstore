app.directive('userDetail', function(User, $stateParams){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/user-detail/user-detail.html',
    link: function (scope){
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
    }
  };
});
