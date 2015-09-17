app.factory('User', function($http){

  var User = function(props){
    angular.extend(this, props);
  }

  User.getAll = function (){
    return $http.get('/api/users')
    .then(function(response){
      return response.data;
    })
  }

  User.getById = function (id) {
    return $http.get('/api/users/' + id)
    .then(function(response){
      return response.data;
    })
  }

  User.getReviews = function (id) {
    return $http.get('/api/reviews?user=' + id)
    .then(function(response){
      return response.data;
    });
  };

  User.getOrders = function (id) {
    return $http.get('/api/orders?user=' + id)
    .then(function(response){
      return response.data;
    });
  };

  return User;
});
