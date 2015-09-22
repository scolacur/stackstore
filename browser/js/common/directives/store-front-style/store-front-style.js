app.directive("storeFrontStyle", function(){
	return {
		restrict: "E",
		// replace: true,
		templateUrl: 'js/common/directives/store-front-style/store-front-style.html',
		scope: {
			css: "="
		}
	};
});
