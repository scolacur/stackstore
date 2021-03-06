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

  function updateReview(id, item) {
    return $http.put('/api/reviews/' + id, item).then(function(result){
      return result.data;
    });
  }

  function addReview(review) {
    return $http.post("api/reviews", review).then(function (result) {
      return result.data;
    });
  }

  return {
    getReview: getReview,
    getSpecificReviews: getSpecificReviews,
    updateReview: updateReview,
    addReview: addReview
  };
});
