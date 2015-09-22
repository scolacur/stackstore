app.directive("storeStyle", function(){
	return {
		restrict: "E",

		templateUrl: 'js/common/directives/store-style/store-style.html',
		scope: {
			css: "="
		}
	};
});
