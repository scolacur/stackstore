app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:productId',
        templateUrl: '/js/products/product-detail/product-detail.html',
		controller: function(Session, $scope, getProduct, ProductFactory, ReviewFactory, $stateParams, $rootScope, $state){
			// console.log('session user: ', Session.user);
			// console.log("product: ",$scope.product);
			// if (Session.user){
			// 	$scope.isAdmin = Session.user.isAdmin;
			// 	console.log($scope.isAdmin);
			// }
			$scope.product = getProduct;
			$scope.newProduct = $scope.product;
			$scope.editProduct = function () {
				ProductFactory.editProduct($scope.product._id, $scope.newProduct)
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
		resolve:
			{
			getProduct: function(ProductFactory, $stateParams){
			  return ProductFactory.getProduct($stateParams.productId)
			  .then(function(product){
				return product;
			  });
			}
		}
    });

});
