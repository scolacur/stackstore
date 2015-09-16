app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:productId',
        templateUrl: '/js/products/product-detail/product-detail.html'
    });

});
