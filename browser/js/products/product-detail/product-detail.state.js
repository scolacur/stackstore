app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:productId',
        templateUrl: '/js/products/product-detail/product-detail.html', 
		controller: function(Session, $scope, getProduct, ProductFactory, ReviewFactory, $stateParams){
			// console.log('session user: ', Session.user);
			// console.log("product: ",$scope.product);
			// if (Session.user){
			// 	$scope.isAdmin = Session.user.isAdmin;
			// 	console.log($scope.isAdmin);
			// }
			console.log("Get product: ",getProduct);
			$scope.product = getProduct;
			$scope.newProduct = $scope.product;
			console.log("new product: ", $scope.newProduct);
			$scope.editProduct = function () {
				console.log("editing");
				ProductFactory.editProduct($scope.product._id, $scope.newProduct);
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
