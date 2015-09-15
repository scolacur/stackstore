app.config(function($stateProvider){
  $stateProvider
  .state('user', {
    url: '/user/:userId',
    templateUrl: '/js/user/user.html',
    resolve:{
      user: function(User, $stateParams){
        console.log("getting user");
        return User.getById($stateParams.userId);
      },
      reviews: function (User, $stateParams) {
        console.log("getting reviews");
        return User.getReviews($stateParams.userId);
      }
    },
    controller: function ($scope, user, reviews) {
      $scope.user = user;
      $scope.orders = [{_id: 'jimin'}, {_id: 'sean'}]; //FIX when we make orders
      $scope.reviews = reviews;
    }
  });
});
