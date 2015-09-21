app.config(function($stateProvider){
  $stateProvider
  .state('user', {
    url: '/user/:userId',
    templateUrl: '/js/user/user.html',
    controller: function ($scope, findStores, findUser, findOrders, findReviews) {
      $scope.$on('newStore', function (e, store) {
          $scope.stores.push(store);
      });
      $scope.user = findUser;
      $scope.orders = findOrders;
      $scope.reviews = findReviews;
      $scope.stores = findStores;
      console.log("scope", $scope.user);

    },
    resolve: {
      findUser: function ($stateParams, UserFactory) {
        return UserFactory.getById($stateParams.userId)
        .then(function(user){
          return user;
        });
      },
      findOrders: function ($stateParams, UserFactory) {
        return UserFactory.getOrders($stateParams.userId)
        .then(function (orders) {
          return orders;
        });
      },
      findReviews: function ($stateParams, UserFactory) {
        return UserFactory.getReviews($stateParams.userId)
        .then(function(reviews){
          return reviews;
        });
      },
      findStores: function ($stateParams, UserFactory) {
        return UserFactory.getStores($stateParams.userId)
        .then(function(stores){
          return stores;
        });
      },
    }
  });
});
