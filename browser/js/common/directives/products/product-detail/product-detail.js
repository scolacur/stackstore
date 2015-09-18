
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
          
          scope.home = $state.is('home');
          if (!scope.product) {
            ProductFactory.getProduct($stateParams.productId)
            .then(function(product){
              scope.product = product;
            });
          }


        }
    };

});
