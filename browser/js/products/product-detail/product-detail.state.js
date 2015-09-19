app.config(function($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:productId',
        templateUrl: '/js/products/product-detail/product-detail.html',
        controller: function( $scope, Product, Review, $stateParams, $rootScope) {

            Product.getProduct($stateParams.productId)
                .then(function(product) {
                    $scope.product = product;
                });

            $scope.editProduct = function(product) {
                Product.editProduct(product._id, product)
                    .then(function() {
                        $rootScope.editMode = false;
                    });
            };
            Review.getSpecificReviews($stateParams.productId, 'product')
                .then(function(reviews) {
                    $scope.reviews = reviews;
                });
        }
    });

});
