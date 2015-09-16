app.directive('reviewList', function($stateParams, ReviewFactory){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/review-list/review-list.html',
    link: function(scope, element, attrs){
        console.log($stateParams);
        ReviewFactory.getSpecificReviews($stateParams.productId, 'product')
        .then(function(reviews){
            scope.reviews = reviews;
        })
    }
  }
})
