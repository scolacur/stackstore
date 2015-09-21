app.config(function($stateProvider){
  $stateProvider
  .state('orderList', {
    url: '/orders',
    templateUrl: '/js/order/order-list/order-list.html',
    controller: function ($scope, findOrders) {
      $scope.orders = findOrders;
    },
    resolve : {
      findOrders: function (OrderFactory) {
        return OrderFactory.getOrders().then(function(orders){
          return orders;
        });
      }
    }
  });
});
