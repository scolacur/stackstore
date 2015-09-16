app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:id',
        templateUrl: '/js/products/product-detail/product-detail.html',
        controller: function ($scope, productFinder, reviewFinder) {
            $scope.product = productFinder;
            $scope.reviews = reviewFinder;
        },
        resolve: {
        	productFinder: function ($stateParams, ProductFactory) {
        		return ProductFactory.getProduct($stateParams.id);
        	},
            reviewFinder: function ($stateParams, ProductFactory) {
                return ProductFactory.getReviews($stateParams.id);
            },

            // // something along these lines to be activated once reviews are implemented
        	// reviewFinder: function ($stateParams, ProductFactory) {
        	// 	return ProductFactory.getReviews($stateParams.id);
        	// }
        }
    });

});