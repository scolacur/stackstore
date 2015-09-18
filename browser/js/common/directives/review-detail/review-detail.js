app.directive('reviewDetail', function(ReviewFactory, $stateParams){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/review-detail/review-detail.html',
    link: function(scope){
        ReviewFactory.getReview($stateParams.reviewId)
        .then(function(review){
            scope.review = review;
            scope.user = review.user;
            scope.product = review.product;
        });
    }
  };
});
