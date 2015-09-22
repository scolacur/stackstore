app.directive("productDetail", function (ProductFactory, CartFactory, $stateParams, $state) {
	return {
		restrict: 'EA',
		templateUrl: 'js/common/directives/products/product-detail/product-detail.html',
		link: function (scope) {
			scope.quantity = 1;
			scope.home = $state.is('home');
			scope.isDetail = $state.is("productDetail");
			scope.addToCart = function(item, quantity){
				CartFactory.addToCart(item, quantity)
				.then(function () {
					$state.go('cart');
				});
			};
		},
	};
});
