app.directive("productDetail", function (ProductFactory) {

    return {
        restrict: 'EA',
        templateUrl: 'js/common/directives/products/product-detail/product-detail.html',
        link: function (scope, productFinder) {
        	// console.log("productFinder", productFinder);
         //    scope.product = productFinder;
 			// scope.reviews = reviewFinder;
        }
    };

});