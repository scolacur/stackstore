app.directive("categoryEdit", function (ProductFactory) {
  return {
    restrict: 'EA',
    templateUrl: 'js/common/directives/category-edit/category-edit.html',
    link: function (scope) {
      ProductFactory.getCategories().then(function(categories) {
        scope.categories = categories;
      });
    },
    scope: {
      selected: "="
    }
  };
});
