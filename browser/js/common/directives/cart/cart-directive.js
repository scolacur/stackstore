app.directive('cart', function(Session, CartFactory, $timeout, $rootScope){
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/cart/cart.html',
		link: function(scope, elem, attrs) {
			$rootScope.$on('updateCart', function(e, cart){
				scope.cart = cart;
			});
			scope.deleteCart = function(){
				return CartFactory.deleteCart();
			};
		}
	};
});
