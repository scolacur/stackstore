app.directive("categoryNav", function (ProductFactory) {
  return {
    restrict: 'EA',
    templateUrl: 'js/common/directives/categories/category-nav/category-nav.html',
    link: function (scope) {
      ProductFactory.getCategories().then(function(categories) {
        scope.categories = categories;
      });
    }
  };
});
