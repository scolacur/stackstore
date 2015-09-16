app.directive("productDetail", function (ProductFactory, CartFactory, $stateParams) {

    return {
        restrict: 'EA',
        templateUrl: 'js/common/directives/products/product-detail/product-detail.html',
        link: function (scope, element, attrs) {
			scope.addToCart = function(item){
				Cart.addToCart(item);
			};
			ProductFactory.getProduct($stateParams.productId)
			.then(function(product){
				scope.product = product;
			});
            ProductFactory.getReviews($stateParams.productId)
            .then(function(reviews){
                scope.reviews = reviews;
            });

        }
    };

});
