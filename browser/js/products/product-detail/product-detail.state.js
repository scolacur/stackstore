app.config(function ($stateProvider) {

	$stateProvider.state('productDetail', {
		url: '/products/:productId',
		templateUrl: '/js/products/product-detail/product-detail.html',
		controller: function ($scope, findProduct, findReviews, getUser, $stateParams, ProductFactory) {
			$scope.editMode = false;
			$scope.product = findProduct;
			$scope.reviews = findReviews;
			$scope.user = getUser;
			$scope.isLoggedIn = !!$scope.user; //fixed to not use session. still probably don't need this
			if ($scope.user) {
				$scope.isAdmin = $scope.user.isAdmin;
				$scope.isOwner = $scope.user._id === $scope.product.store.user._id;
			} else {
				$scope.isAdmin = false;
				$scope.isOwner = false;
			}

			$scope.enableProductEdit = function () {
				$scope.cached = angular.copy($scope.product);
				$scope.editMode = true;
			};
			$scope.cancelEdit = function () {
				$scope.product = angular.copy($scope.cached);
				$scope.editMode = false;
			};

			$scope.editProduct = function (product) {
				ProductFactory.editProduct(product._id, product)
					.then(function () {
						$scope.editMode = false;
					});
			};
		},
		resolve: {
			findProduct: function (ProductFactory, $stateParams) {
				return ProductFactory.getProduct($stateParams.productId)
				.then(function (product) {
					return product;
				});
			},
			findReviews: function (ReviewFactory, $stateParams) {
				return ReviewFactory.getSpecificReviews($stateParams.productId, 'product')
				.then(function (reviews) {
					return reviews;
				});
			},
			getUser: function (AuthService){
				return AuthService.getLoggedInUser();
			}
		}
	});

});
