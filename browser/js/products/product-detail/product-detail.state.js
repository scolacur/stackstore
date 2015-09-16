app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:id',
        templateUrl: '/js/products/product-detail/product-detail.html'
    });

});
