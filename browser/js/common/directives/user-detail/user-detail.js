app.directive('userDetail', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/user-detail/user-detail.html',
    scope: {
      user: '=',
      orders: '=',
      reviews: '='
    }
  }
})
