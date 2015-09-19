app.directive("editButton", function ($rootScope) {

  return {
    restrict: 'EA',
    templateUrl: 'js/common/directives/edit-button/edit-button.html',
    link: function (scope) {
      var edited = false;
      scope.toggleEdit = function () {
        if (!edited) {
          $rootScope.editMode = false;
          edited = true;
        }
        $rootScope.editMode = !$rootScope.editMode;
      }
    }
  };

});