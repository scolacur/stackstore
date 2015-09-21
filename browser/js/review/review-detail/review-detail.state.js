app.config(function($stateProvider){
  $stateProvider
  .state('reviewDetail', {
    url: '/review/:reviewId',
    templateUrl: '/js/review/review-detail/review-detail.html',
    controller: function ($scope, findReview, Session) {
		  $scope.review = findReview;
      if (Session.user) {
        $scope.isAdmin = Session.user.isAdmin;
        $scope.isOwner = Session.user._id === $scope.review.user._id;
      } else {
        $scope.isAdmin = false;
        $scope.isOwner = false;
      }
      console.log("session", $scope.isAdmin, $scope.isOwner);
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
