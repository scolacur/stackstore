app.factory('CartFactory', function($http, $rootScope){
	
	var factoryObj = {};

	function returnData (res){
		factoryObj.cart = res.data;
		$rootScope.$broadcast('updateCart', res.data);
		return res.data;
	}

	factoryObj.getCart = function () {
		return $http.get('/api/cart')
		.then(returnData);
	};

	factoryObj.addToCart = function (product, quantity) {
		return $http.post('/api/cart', {product, quantity})
		.then(returnData);
	};

	factoryObj.editItem = function (editedItem){
		var productId = editedItem.product._id.toString();
		return $http.put('/api/cart/' + productId, editedItem)
		.then(returnData);
	};

	factoryObj.deleteCart = function () {
		return $http.delete('/api/cart')
		.then(returnData);
	};

	return factoryObj;
});
