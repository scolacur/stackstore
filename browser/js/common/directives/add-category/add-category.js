app.directive('addCategory', function(ProductFactory, $stateParams){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/add-category/add-category.html',
    link: function (scope) {
        scope.addCategory = function (category) {
            ProductFactory.addCategory(category)
            .then(function(category){
                scope.$emit('newCategory', category);
                scope.category = {};
            })
        }
    }
  };
});
