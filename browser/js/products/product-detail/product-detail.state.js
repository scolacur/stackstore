app.config(function($stateProvider) {

	$stateProvider.state('productDetail', {
		url: '/products/:productId',
		templateUrl: '/js/products/product-detail/product-detail.html',
		controller: function($scope, findProduct, findReviews, $stateParams, ProductFactory, Session) {
			$scope.product = findProduct;
			$scope.reviews = findReviews;
			$scope.editMode = false;

			if (Session.user){
				$scope.isAdmin = Session.user.isAdmin;
				$scope.isOwner = Session.user._id === $scope.product.store.user;
			} else {
				$scope.isAdmin = false;
				$scope.isOwner = false;
			}
			$scope.enableEdit = function () {
				console.log('something');
				$scope.cached = angular.copy($scope.product);
				$scope.editMode = true;
			};
			$scope.cancelEdit = function(){
				$scope.product = angular.copy($scope.cached);
				$scope.editMode = false;
			};

			$scope.editProduct = function(product) {
				ProductFactory.editProduct(product._id, product)
					.then(function() {
						$scope.editMode = false;
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
