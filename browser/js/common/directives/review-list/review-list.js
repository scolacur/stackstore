app.directive('reviewList', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/review-list/review-list.html',
    link: function(scope){
      scope.getStars = function (num) {
          var arr = [];
          for (var i = 0; i < num; i++) {
            arr.push(i);
          }
        return arr;
      };
    }
  };
});
