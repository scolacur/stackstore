app.config(function($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:productId',
        templateUrl: '/js/products/product-detail/product-detail.html',
        controller: function( $scope, ProductFactory, ReviewFactory, $stateParams, $rootScope) {

            ProductFactory.getProduct($stateParams.productId)
                .then(function(product) {
                    $scope.product = product;
                });

            $scope.editProduct = function(product) {
                ProductFactory.editProduct(product._id, product)
                    .then(function() {
                        $rootScope.editMode = false;
                    });
            };
            ReviewFactory.getSpecificReviews($stateParams.productId, 'product')
                .then(function(reviews) {
                    $scope.reviews = reviews;
                });
        }
    });

});
