app.config(function ($stateProvider) {

    $stateProvider.state('orderDetail', {
        url: '/orders/:orderId',
        templateUrl: '/js/order/order-detail/order-detail.html'
    });

});
