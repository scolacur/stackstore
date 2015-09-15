'use strict';

app.controller('ProductListCtrl', function ($scope, findProducts) {
	$scope.products = findProducts;
});