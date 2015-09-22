app.config(function ($stateProvider) {

    $stateProvider.state('orderDetail', {
        url: '/orders/:orderId',
        templateUrl: '/js/order/order-detail/order-detail.html',
        controller: function ($scope, findOrder, OrderFactory, Session) {
            $scope.main = true;
        	$scope.order = findOrder;
            $scope.isAdmin = Session.user ? Session.user.isAdmin: false;
            $scope.choices = ['shipped', 'confirmed', 'pending', 'cancelled'];
            $scope.editStatus = function (status) {
                OrderFactory.editOrder($scope.order._id, status)
                .then(function (updated) {
                    $scope.order = updated;
                });
            };
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
