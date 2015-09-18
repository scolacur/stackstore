
app.directive("productDetail", function (ProductFactory, CartFactory, $stateParams, $state, Session) {

    return {
        restrict: 'EA',
        templateUrl: 'js/common/directives/products/product-detail/product-detail.html',
        link: function (scope) {
            scope.quantity = 1;
        	scope.addToCart = function(item, quantity){
        		CartFactory.addToCart(item, quantity)
                .then(function () {
                    $state.go('cart');
                });
        	};
            scope.home = $state.is('home');
	        if (Session.user){
		  	   scope.isAdmin = Session.user.isAdmin;
		    } else {
				scope.isAdmin = false;
			}
            scope.isDetail = $state.is("productDetail");
        },
    }

});
