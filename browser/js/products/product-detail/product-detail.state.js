app.config(function($stateProvider) {

    $stateProvider.state('productDetail', {
        url: '/products/:productId',
        templateUrl: '/js/products/product-detail/product-detail.html',
        controller: function($scope, ProductFactory, ReviewFactory, $stateParams, $rootScope, Session) {

            ProductFactory.getProduct($stateParams.productId)
                .then(function(product) {
                    $scope.product = product;

										if (Session.user){
											$scope.isAdmin = Session.user.isAdmin;
											$scope.isOwner = Session.user._id === product.store.user;
										} else {
											$scope.isAdmin = false;
											$scope.isOwner = false;
										}
										console.log("is this your product? ",$scope.isOwner);
                });

            $scope.editProduct = function(product) {
                ProductFactory.editProduct(product._id, product)
                    .then(function() {
                        $rootScope.editMode = false;
                    });
            };
            ReviewFactory.getSpecificReviews($stateParams.productId, 'product')
                .then(function(reviews) {
                    $scope.reviews = reviews;
                });
        }
    });

});
