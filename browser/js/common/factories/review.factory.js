app.factory('ReviewFactory', function ($http) {

  function getReview(id) {
    return $http.get("/api/reviews/" + id).then(function(result) {
      return result.data;
    });
  }

  function getSpecificReviews(id, type) {
    return $http.get('/api/reviews?' + type + '=' + id).then(function(result){
      return result.data;
    });
  }

  return {
    getReview: getReview,
    getSpecificReviews: getSpecificReviews
  };
});
