app.directive('addProduct', function(ProductFactory){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/add-product/add-product.html',
    link: function (scope) {
      scope.addProduct = function (product, store) {
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
