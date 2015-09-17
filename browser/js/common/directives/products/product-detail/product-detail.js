app.directive("productDetail", function (ProductFactory, CartFactory, $stateParams, $state) {

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
