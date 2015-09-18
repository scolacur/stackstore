app.config(function($stateProvider){
  $stateProvider
  .state('orderList', {
    url: '/orders',
    templateUrl: '/js/order/order-list/order-list.html',
    controller: function ($scope, Order) {
      Order.getOrders()
      .then(function (orders) {
        $scope.orders = orders;
      });
    }
  })
})
