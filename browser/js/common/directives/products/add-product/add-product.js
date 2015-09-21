app.directive('addProduct', function(ProductFactory){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/products/add-product/add-product.html',
    link: function (scope) {
			// scope.adding = false;
      scope.addProduct = function (product, store) {
				if (!product || !store){
					return; //this is so that the cancel button works. a side effect is that
				}					//hitting submit when there's an empty form just hides the form
									//and doesn't give any warning message, which isnt the best ux
        product.store = store._id;
        ProductFactory.addProduct(product)
        .then(function(prod){
            scope.$emit('newProduct', prod);
            scope.product = {};
        });
      };
    }
  };
});
