app.directive('userDetail', function(User, $stateParams){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/user-detail/user-detail.html',
    link: function (scope){
        User.getById($stateParams.userId)
        .then(function(user){
            scope.user = user;
        })
        scope.orders = [{_id: 'lithuanian chocolate'}, {_id: 'extreme hat'}];
        User.getReviews($stateParams.userId)
        .then(function(reviews){
            scope.reviews = reviews;
        });
    }
  }
})
