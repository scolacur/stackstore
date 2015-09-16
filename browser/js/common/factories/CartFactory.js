app.factory('CartFactory', function($http, Session, $rootScope){

	var cart = null;

	var factoryObj = {
		cart: cart,
		getCart: getCart,
		addToCart: addToCart,
		editItem: editItem,
		deleteCart: deleteCart
	};

	function returnData(res){
		factoryObj.cart = res.data;
		$rootScope.$emit('updateCart', res.data);
		console.log("cart after addition: ",factoryObj.cart);
		return res.data;
	}
	function getCart(){
		return $http.get('/api/cart')
		.then(returnData);
	}

	function addToCart(product, quantity){

		return $http.post('/api/cart', {product, quantity})
		.then(returnData);
	}

	function editItem(productId, editedItem){
		return $http.put('/api/cart/' + productId, editedItem)
		.then(returnData);
	}

	function deleteCart(){
		return $http.delete('/api/cart')
		.then(returnData);
	}

	getCart();

	return factoryObj;
});
