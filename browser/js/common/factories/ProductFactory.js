app.factory('ProductFactory', function ($http) {

	function getProduct(id) {
		return $http.get("/api/products/" + id).then(function(result) {
			return result.data;
		});
	}
	function getReviews(id) {
		return $http.get("/api/reviews?product=" + id).then(function(result) {
			return result.data;
		});
	}
	function getProducts(props) {
		return $http.get("/api/products", {params: props})
		.then(function(result) {
			return result.data;
		});
	}
	function getCategories() {
		return $http.get("/api/categories").then(function(results) {
			return results.data;
		});
	}

	function getCategoryByName(name) {
		if (typeof name === 'string'){
			return $http.get("/api/categories?title=" + name).then(function(result) {
				return result.data[0];
			});
		}
		return Promise.resolve(name);
	}

	function editProduct(id, item){
		return getCategoryByName(item.category)
		.then(function(result){
			item.category = result._id;
			return $http.put('/api/products/' + id, item).then(function(result){
				return result.data;
			});
		});
	}

	function addProduct(product){
		return $http.post('/api/products', product)
		.then(function(response){
			return response.data;
		})
	}

	function addCategory(category){
		return $http.post('/api/categories', category)
		.then(function(response){
			return response.data;
		})
	}

	return {
		getProduct: getProduct,
		getReviews: getReviews,
		getProducts: getProducts,
		getCategories: getCategories,
		editProduct: editProduct,
		addProduct: addProduct,
		addCategory: addCategory
	};

});
