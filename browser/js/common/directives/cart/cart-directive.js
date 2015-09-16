app.directive('cart', function(){
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/cart/cart.html',
		controller: function(Session, $scope) {
			$scope.cart = Session.cart;
		}
	};
});
