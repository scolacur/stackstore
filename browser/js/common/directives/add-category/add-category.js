app.directive('addCategory', function(ProductFactory){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/add-category/add-category.html',
    link: function (scope) {
        scope.addCategory = function (category) {
            ProductFactory.addCategory(category)
            .then(function(cat){
                scope.$emit('newCategory', cat);
                scope.category = {};
            })
        }
    }
  };
});
