app.config(function($stateProvider){
  $stateProvider
  .state('reviewDetail', {
    url: '/review/:reviewId',
    templateUrl: '/js/review/review-detail/review-detail.html',
    controller: function ($scope, findReview) {
		$scope.review = findReview;
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
