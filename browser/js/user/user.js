app.config(function($stateProvider){
  $stateProvider
  .state('user', {
    url: '/user/:userId',
    templateUrl: '/js/user/user.html'
  });
});
