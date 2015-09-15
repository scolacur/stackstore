app.factory('ProductFactory', function ($http) {
    
    function getProduct(id) {
        $http.get("/api/products/" + id).then(function(result) {
            return result.data;
        });
    }
    // function getReviews(id) {
    //     $http.get("/api/product/" + id + "/reviews").then(function(result) {
    //         return result.data;
    //     });
    // }
    function getProducts(category) {
        console.log("getting products");
        $http.get("/api/products/?category=" + category).then(function(result) {
            return result.data;
        });
    }
    
    return {
        getProduct: getProduct,
        getReviews: getReviews,
        getProducts: getProducts

    };

});
