app.config(function($stateProvider){
  $stateProvider
  .state('users', {
    url: '/users',
    templateUrl: '/js/users/users.html',
    resolve:{
      users: function(User){
        return User.getAll();
      }
    },
    controller: function ($scope, users) {
      $scope.users = users;
    }
  })
})
