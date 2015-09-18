app.directive("productList", function (ProductFactory) {
    return {
        restrict: 'EA',
        templateUrl: 'js/common/directives/products/product-list/product-list.html',
        link: function (scope) {
            scope.selected = {category: ""};
            ProductFactory.getProducts()
            .then(function(products){
                scope.products = products;
            })
        }
    };
});
