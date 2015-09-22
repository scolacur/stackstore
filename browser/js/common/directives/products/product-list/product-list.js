app.directive("productList", function () {
  return {
    restrict: 'EA',
    templateUrl: 'js/common/directives/products/product-list/product-list.html',
    link: function (scope) {

      scope.selectedTitle = function () {
        return JSON.parse('{"title": ""}').title;
      };

      scope.$on('newProduct', function (e, product) {
        scope.products.push(product);
      });

    }
  };
});
