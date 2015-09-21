app.directive('reviewDetail', function(ReviewFactory, $stateParams){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/reviews/review-detail/review-detail.html',
    // link: function(scope){

    // },
    scope: {
      review: "="
    }
  };
});
