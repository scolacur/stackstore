app.config(function($stateProvider){
  $stateProvider
  .state('reviewAdd', {
    url: '/review/add?productId=',
    templateUrl: '/js/review/review-add/review-add.html',
    controller: function ($scope, ReviewFactory, AuthService, findProduct, $state) {
      AuthService.getLoggedInUser().then(function(user){
        console.log("user", user);
        $scope.user = user;
      });
      $scope.product = findProduct;
      $scope.createReview = function(review) {
        if (typeof review.rating !== "number") {
          review.rating = review.rating.length;
        }
        review.user = $scope.user._id;
        review.product = $scope.product._id;
        ReviewFactory.addReview(review)
          .then(function(newReview) {
            console.log("review", newReview);
            $state.go("reviewDetail", {reviewId: newReview._id});
          });
      };
      
      $scope.makeStars = function (num) {
        var stars = [];
        for (var i = 0; i < num; i++) {
          stars.push(i);
        }
        return stars;
      };
    },
    resolve: {
      findProduct: function (ProductFactory, $stateParams) {
        return ProductFactory.getProduct($stateParams.productId).then(function (product) {
          console.log("finding");
          return product;
        });
      }
    }
  });
});