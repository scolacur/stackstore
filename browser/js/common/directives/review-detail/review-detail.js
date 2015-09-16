app.directive('reviewDetail', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/review-detail/review-detail.html',
    scope: {
      user: '=',
      product: '=',
      review: '='
    }
  }
})
