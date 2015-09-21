app.directive('reviewDetail', function(ReviewFactory){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/reviews/review-detail/review-detail.html',
    scope: {
      review: "=",
      isAdmin: "=",
      isOwner: "=",
      isDetail: "="
    }
  };
});
