app.config(function($stateProvider){
  $stateProvider
  .state('categories', {
    url: '/categories',
    templateUrl: '/js/categories/categories.html',
    controller: function ($scope, ProductFactory) {
      ProductFactory.getCategories()
      .then(function (categories) {
          $scope.categories = categories;
      })
      $scope.$on('newCategory', function (e, category) {
          $scope.categories.push(category);
      })
    }
  })
})
