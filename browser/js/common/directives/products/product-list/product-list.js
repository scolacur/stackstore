app.directive("productList", function (ProductFactory) {
    return {
        restrict: 'EA',
        templateUrl: 'js/common/directives/products/product-list/product-list.html',
        link: function (scope) {
            scope.selected = "";
            ProductFactory.getProducts()
            .then(function(products){
                console.log("products");
                scope.products = products;
            })
        }
    };
});
