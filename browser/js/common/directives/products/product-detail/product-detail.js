app.directive("productDetail", function (ProductFactory, CartFactory, $stateParams) {

    return {
        restrict: 'EA',
        templateUrl: 'js/common/directives/products/product-detail/product-detail.html',
        link: function (scope, element, attrs) {
			scope.addToCart = function(item){
				Cart.addToCart(item);
			};
			ProductFactory.getProduct($stateParams.id)
			.then(function(product){
				scope.product = product;
			});
 		// 	scope.reviews = reviewFinder;
        }
    };

});
