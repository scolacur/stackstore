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
    function getProducts(category) {
        var params = {};
        if (category) {
            params.category = category;
        }
        return $http.get("/api/products", {params: params}).then(function(result) {
            return result.data;
        });
    }
    
    return {
        getProduct: getProduct,
        getReviews: getReviews,
        getProducts: getProducts
    };

});
