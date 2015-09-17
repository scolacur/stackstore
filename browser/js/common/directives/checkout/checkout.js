app.directive('checkout', function (Order) {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/checkout/checkout.html',
    link: function (scope) {
      scope.submitOrder = function (order) {
        Order.postOrder(order)
        .then(function (order) {
          console.log('successful order!');
          $state.go('order', {order: order._id});
        });
      }
    }
  }
});