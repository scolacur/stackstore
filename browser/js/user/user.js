app.config(function($stateProvider){
  $stateProvider
  .state('user', {
    url: '/user/:userId',
    templateUrl: '/js/user/user.html',
    resolve:{
      user: function(User, $stateParams){
        return User.getById($stateParams.userId);
      }
    },
    controller: function ($scope, user) {
      $scope.user = user;
      $scope.orders = [{_id: 'jimin'}, {_id: 'sean'}] //FIX when we make orders
    }
  })
})
