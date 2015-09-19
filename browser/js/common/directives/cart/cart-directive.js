app.directive('cart', function(Session, Cart){
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/cart/cart.html',
		link: function(scope) {


			scope.$on('updateCart', function(e, cart){
        scope.cart = cart;
      });

			Cart.getCart();

			scope.edit = function (index) {
				scope.editIndex = index;
			};
			scope.delete = function (item) {
				item.quantity = 0;
				return Cart.editItem(item);
			};
			scope.saveQuantity = function (item) {
				return Cart.editItem(item)
				.then(function () {
					scope.saved = true;
					scope.editIndex = null;
				});
			};
			scope.deleteCart = function(){
				return Cart.deleteCart();
			};
		}
	};
});
