app.directive('orderList', function(Order, $stateParams){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/orders/order-list/order-list.html'
  };
});
