app.directive('reviewDetail', function (Review, $stateParams){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/review-detail/review-detail.html',
    link: function(scope){
        Review.getReview($stateParams.reviewId)
        .then(function(review){
            scope.review = review;
            scope.user = review.user;
            scope.product = review.product;
        });
    }
  };
});
