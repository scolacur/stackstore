app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:id',
        templateUrl: '/js/products/product-detail/product-detail.html',
        controller: function ($scope, productFinder) {
            $scope.product = productFinder;
        },
        resolve: {
        	productFinder: function ($stateParams, ProductFactory) {
        		return ProductFactory.getProduct($stateParams.id);
        	}

            // // something along these lines to be activated once reviews are implemented
        	// reviewFinder: function ($stateParams, ProductFactory) {
        	// 	return ProductFactory.getReviews($stateParams.id);
        	// }
        }
    });

});