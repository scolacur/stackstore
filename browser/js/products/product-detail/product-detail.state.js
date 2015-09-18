app.config(function ($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:productId',
        templateUrl: '/js/products/product-detail/product-detail.html',
		controller: function(Session, $scope, getProduct, ProductFactory){
				// console.log('session user: ', Session.user);
				// console.log("product: ",$scope.product);
				// if (Session.user){
				// 	$scope.isAdmin = Session.user.isAdmin;
				// 	console.log($scope.isAdmin);
				// }
				$scope.editMode = false;
				console.log("Get product: ",getProduct);
				$scope.product = getProduct;
				$scope.newProduct = $scope.product;
				console.log($scope.newProduct);
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
