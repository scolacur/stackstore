app.factory('ProductFactory', function ($http) {

    console.log("in factory");
    
    function getProduct(id) {
        console.log("getting product:", id);
        return $http.get("/api/products/" + id).then(function(result) {
            console.log("result", result);
            return result.data;
        });
    }
    function getReviews(id) {
        return $http.get("/api/products/" + id + "/reviews").then(function(result) {
            return result.data;
        });
    }
    function getProducts(category) {
        console.log("getting products");
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
