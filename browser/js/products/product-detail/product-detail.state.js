app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:id',
        templateUrl: '/js/products/product-detail/product-detail.html',
        controller: function ($scope, productFinder) {
            console.log("productFinder", productFinder);
            $scope.product = productFinder;
            console.log("product detail", $scope.product);
        },
        resolve: {
        	productFinder: function ($stateParams, ProductFactory) {
                console.log("id", $stateParams.id);
        		return ProductFactory.getProduct($stateParams.id);
        	}
        	// reviewFinder: function ($stateParams, ProductFactory) {
        	// 	return ProductFactory.getReviews($stateParams.id);
        	// }
        }
    });

});