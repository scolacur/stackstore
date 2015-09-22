app.directive("productList", function (ProductFactory) {
  return {
    restrict: 'EA',
    templateUrl: 'js/common/directives/products/product-list/product-list.html',
    link: function (scope) {
      ProductFactory.getProducts()
      .then(function(products){
        scope.products = products;
      });
	  scope.editMode = false;

      scope.selectedTitle = function () {
        return JSON.parse('{"title": ""}').title;
      };

      scope.$on('newProduct', function (e, product) {
        scope.products.push(product);
      });
	  // 
	//   scope.enableProductEdit = function () {
	// 	  console.log('the scope is product list');
	// 	  scope.cached = angular.copy(scope.product);
	// 	  scope.editMode = true;
	//   };
	//   scope.cancelEdit = function(){
	// 	  scope.product = angular.copy(scope.cached);
	// 	  scope.editMode = false;
	//   };
	  //
	//   scope.editProduct = function(product) {
	// 	  ProductFactory.editProduct(product._id, product)
	// 		  .then(function() {
	// 			  scope.editMode = false;
	// 		  });
	//   };
    }
  };
});
