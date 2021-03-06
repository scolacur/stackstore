app.config(function($stateProvider){
  $stateProvider
  .state('reviewDetail', {
    url: '/review/:reviewId',
    templateUrl: '/js/review/review-detail/review-detail.html',
    controller: function ($scope, findReview, getUser, ReviewFactory) {
		$scope.review = findReview;
		$scope.isDetail = true;
		$scope.user = getUser;
		$scope.styleStore = $scope.review.product.store;

		if ($scope.user) {
			$scope.isAdmin = $scope.user.isAdmin;
			$scope.isOwner = $scope.user._id === $scope.review.user._id;
		} else {
			$scope.isAdmin = false;
			$scope.isOwner = false;
		}
		//Are these functions being used??
		$scope.enableEdit = function () {
			$scope.cached = angular.copy($scope.product); //scope.product doesn't exist
			$scope.editMode = true;
		};
		$scope.cancelEdit = function(){
			$scope.product = angular.copy($scope.cached);
			$scope.editMode = false;
		};
		$scope.editReview = function(review) {
		if (typeof review.rating !== "number") {
			review.rating = review.rating.length;
		}
		ReviewFactory.updateReview(review._id, review)
			.then(function(updated) {
				$scope.review.description = updated.description;
				$scope.editMode = false;
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
    	findReview: function (ReviewFactory, $stateParams) {
    		return ReviewFactory.getReview($stateParams.reviewId)
	    	.then(function(review) {
	    		return review;
			});
    	},
		getUser: function (AuthService){
			return AuthService.getLoggedInUser();
		}
    }
  });
});
