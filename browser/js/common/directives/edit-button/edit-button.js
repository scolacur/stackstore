app.directive("editButton", function ($rootScope) {
	return {
		restrict: 'EA',
		templateUrl: 'js/common/directives/edit-button/edit-button.html',
		link: function (scope) {
			if (!scope.editMode) {
				scope.editMode = false;
			}
			scope.toggleEdit = function () {
				scope.editMode = !scope.editMode;
			};
		}
	};
});
