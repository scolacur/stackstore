'use strict';

app.controller('ProductListCtrl', function ($scope, findProducts) {
	console.log("findProducts", findProducts);
	$scope.products = findProducts;
});