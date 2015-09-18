app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:productId',
        templateUrl: '/js/products/product-detail/product-detail.html',
        controller: function ($scope, ReviewFactory, $stateParams) {
          ReviewFactory.getSpecificReviews($stateParams.productId, 'product')
          .then(function(reviews){
              $scope.reviews = reviews;
          });
        }
    });

});
