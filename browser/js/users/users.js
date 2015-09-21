app.config(function($stateProvider){
  $stateProvider
  .state('users', {
    url: '/users',
    templateUrl: '/js/users/users.html',
    resolve:{
      users: function(UserFactory){
        return UserFactory.getAll();
      }
    },
    controller: function ($scope, users) {
      $scope.users = users;
    }
  })
})
