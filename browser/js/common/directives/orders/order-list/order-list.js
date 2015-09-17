app.directive('orderList', function(Order, $stateParams){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/orders/order-list/order-list.html',
    link: function (scope, element){
        Order.getAllOrders()
        .then(function(orders){
            scope.orders = orders;
        });
    }
  }
})
