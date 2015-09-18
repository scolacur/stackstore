app.directive('orderList', function(Order, $stateParams){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/orders/order-list/order-list.html',
    link: function (scope, element){
        if (!scope.orders && $stateParams.userId) {
            Order.getOrders({user: $stateParams.userId})
            .then(function(orders){
                scope.orders = orders;
            });
        }
    },
    scope: {
        orders: "="
    }
  }
})
