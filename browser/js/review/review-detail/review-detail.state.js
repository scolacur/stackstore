app.config(function($stateProvider){
  $stateProvider
  .state('reviewDetail', {
    url: '/review/:reviewId',
    templateUrl: '/js/review/review-detail/review-detail.html'
    // resolve:{
    //   reviewFinder: function(ReviewFactory, $stateParams){
    //     return ReviewFactory.getReview($stateParams.reviewId);
    //   }
    // },
    // controller: function ($scope, reviewFinder) {
    //   $scope.review = reviewFinder;
    //   $scope.user = reviewFinder.user;
    //   $scope.product = reviewFinder.product;
    // }
  });
});
