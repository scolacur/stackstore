app.config(function($stateProvider){
  $stateProvider
  .state('reviewDetail', {
    url: '/review/:reviewId',
    templateUrl: '/js/review/review-detail/review-detail.html',
    controller: function ($scope, findReview, Session, ReviewFactory, $rootScope) {
		  $scope.review = findReview;
      if (Session.user) {
        $scope.isAdmin = Session.user.isAdmin;
        $scope.isOwner = Session.user._id === $scope.review.user._id;
      } else {
        $scope.isAdmin = false;
        $scope.isOwner = false;
      }
      $scope.isDetail = true;
      $scope.editReview = function(review) {
        ReviewFactory.updateReview(review._id, review)
          .then(function() {
            $rootScope.editMode = false;
          });
      };
    },
    resolve: {
    	findReview: function (ReviewFactory, $stateParams) {
    		return ReviewFactory.getReview($stateParams.reviewId)
	    	.then(function(review) {
	    		return review;
		    });
    	}
    }
  });
});
