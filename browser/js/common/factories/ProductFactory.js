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

	function editProduct(id, item){
		if (typeof item.category ==='string'){
			item.category = JSON.parse(item.category);
		}
		return $http.put('/api/products/' + id, item).then(function(result){
			return result.data;
		});
	}

	function addProduct(product){
		console.log(product);
		console.log('category is in form', typeof product.category);
		if (!product.category) {
			product.category = "55fed272070a7bffb9a5a3af";
			//doing this check b/c the category dropdown directive has no
			//default. this will set the default to watersports equipment.
			//it would be better to just have the dropdown default to "All"
			//or something, but I wanted to discuss that with the team before changing it
		} else {
			product.category = JSON.parse(product.category)._id;
		}
		console.log("got to add product, after:", product);
		console.log("should be of form: ",typeof product.category);

		return $http.post('/api/products', product)
		.then(function(response){
			return response.data;
		});
	}

	function addCategory(category){
		return $http.post('/api/categories', category)
		.then(function(response){
			return response.data;
		});
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
