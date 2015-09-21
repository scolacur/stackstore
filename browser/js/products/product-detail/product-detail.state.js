app.config(function($stateProvider) {

	$stateProvider.state('productDetail', {
		url: '/products/:productId',
		templateUrl: '/js/products/product-detail/product-detail.html',
		controller: function($scope, findProduct, findReviews, $stateParams, $rootScope, Session) {
			$scope.product = findProduct;
			$scope.reviews = findReviews;
			if (Session.user){
				$scope.isAdmin = Session.user.isAdmin;
				$scope.isOwner = Session.user._id === $scope.product.store.user;
			} else {
				$scope.isAdmin = false;
				$scope.isOwner = false;
			}
			$scope.editProduct = function(product) {
				ProductFactory.editProduct(product._id, product)
					.then(function() {
						$rootScope.editMode = false;
					});
			};

		},
		resolve: {
			findProduct: function (ProductFactory, $stateParams) {
				return ProductFactory.getProduct($stateParams.productId).then(function (product) {
					return product;
				});
			},
			findReviews: function (ReviewFactory, $stateParams) {
				return ReviewFactory.getSpecificReviews($stateParams.productId, 'product')
				.then(function(reviews) {
					return reviews;
				});
			}
		}
	});

});
