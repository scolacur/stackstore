app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:productId',
        templateUrl: '/js/products/product-detail/product-detail.html',
		controller: function(Session, $scope, ProductFactory, ReviewFactory, $stateParams, $rootScope, $state){
      
      ProductFactory.getProduct($stateParams.productId)
      .then(function (product) {
        $scope.product = product;
      });

			$scope.editProduct = function (product) {
				ProductFactory.editProduct(product._id, product)
				.then(function(results){
					$rootScope.editMode = false;
					$state.go('productDetail', {productId: $scope.product._id});
				});
			};
			ReviewFactory.getSpecificReviews($stateParams.productId, 'product')
          	.then(function(reviews){
            	$scope.reviews = reviews;
          	});
		},
  });

});
