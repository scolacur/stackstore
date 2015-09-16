app.directive("productDetail", function (ProductFactory, CartFactory, $stateParams, $state) {

    return {
        restrict: 'EA',
        templateUrl: 'js/common/directives/products/product-detail/product-detail.html',
        link: function (scope, element, attrs) {
			scope.addToCart = function(item, quantity){
				CartFactory.addToCart(item, quantity);
				$state.go('cart');
			};
			ProductFactory.getProduct($stateParams.id)
			.then(function(product){
				scope.product = product;
			});
 		// 	scope.reviews = reviewFinder;
        }
    };

});
