app.factory('CartFactory', function($http, Session){

	function syncSessionCart(res){
		Session.cart = angular.copy(res.data, Session.cart);
		return res.data;
	}
	function getCart(){
		return $http.get('/api/cart')
		.then(syncSessionCart);
	}

	function addItem(item){
		return $http.post('/api/cart', item)
		.then(syncSessionCart);
	}

	function editItem(productId, editedItem){
		return $http.put('/api/cart/' + productId, editedItem)
		.then(syncSessionCart);
	}

	function deleteCart(){
		return $http.delete('/api/cart')
		.then(syncSessionCart);
	}

	return {
		getCart: getCart,
		addItem: addItem,
		editItem: editItem,
		deleteCart: deleteCart
	};
});
