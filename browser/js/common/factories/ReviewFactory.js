app.factory('ReviewFactory', function ($http) {

    function getReview(id) {
        return $http.get("/api/reviews/" + id).then(function(result) {
            return result.data;
        });
    }
    
    return {
        getReview: getReview,
    };

});