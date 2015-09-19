app.directive('addCategory', function(Product){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/add-category/add-category.html',
    link: function (scope) {
        scope.addCategory = function (category) {
            Product.addCategory(category)
            .then(function(cat){
                scope.$emit('newCategory', cat);
                scope.category = {};
            })
        }
    }
  };
});
