
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

          //check to see if on home
          scope.home = $state.is('home');
		  if (Session.user){
		  	scope.isAdmin = Session.user.isAdmin;
			} else {
				scope.isAdmin = false;
			}
			console.log(scope.isAdmin);

            scope.isDetail = $state.is("productDetail");
            console.log(scope.isDetail);
        },

        // scope: {
        //   selected: "=",
        //   product: "="
        // }
    };

});
