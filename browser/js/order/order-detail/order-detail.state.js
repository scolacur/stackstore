app.config(function ($stateProvider) {

    $stateProvider.state('orderDetail', {
        url: '/orders/:orderId',
        templateUrl: '/js/order/order-detail/order-detail.html',
        controller: function ($scope, findOrder) {
        	$scope.order = findOrder;
        },
        resolve: {
        	findOrder: function ($stateParams, OrderFactory) {
        		return OrderFactory.getOrder($stateParams.orderId).then(function(order) {
        			return order;
        		});
        	}
        }
    });

});
