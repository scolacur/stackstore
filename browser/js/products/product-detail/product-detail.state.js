app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:id',
        templateUrl: '/js/products/product-detail/product-detail.html',
        // controller: '',
        resolve: {
        	productFinder: function ($stateParams, ProductFactory) {
        		return ProductFactory.getProduct($stateParams.id);
        	},
        	reviewFinder: function ($stateParams, ProductFactory) {
        		return ProductFactory.getReviews($stateParams.id);
        	}
        }
    });

});