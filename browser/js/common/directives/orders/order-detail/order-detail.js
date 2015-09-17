app.directive('orderDetail', function(Order, $stateParams){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/orders/order-detail/order-detail.html',
    link: function (scope, element, attrs){
        Order.getOrder($stateParams.orderId)
        .then(function(order){
            scope.order = order;
        });
    }
  }
})
