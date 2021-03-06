app.directive('checkout', function (OrderFactory, $state) {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/checkout/checkout.html',
    link: function (scope) {
      scope.submitOrder = function (order) {
        OrderFactory.postOrder(order)
        .then(function (postedOrder) {
          $state.go('order', {order: postedOrder._id});
        });
      };
    }
  };
});
