app.directive('cart', function(Session, CartFactory, $timeout, $rootScope){
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/cart/cart.html',
		link: function(scope) {
			$rootScope.$on('updateCart', function(e, cart){
				scope.cart = cart;
			});
			scope.edit = function (index) {
				scope.editIndex = index;
			};
			scope.delete = function (item) {
				item.quantity = 0;
				return CartFactory.editItem(item);
			};
			scope.saveQuantity = function (item) {
				return CartFactory.editItem(item)
				.then(function () {
					scope.saved = true;
					scope.editIndex = null;
				});
			};
			scope.deleteCart = function(){
				return CartFactory.deleteCart();
			};
		}
	};
});
