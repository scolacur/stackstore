app.factory('Order', function($http){


  var Order = function () {

  };

  Order.postOrder = function (order) {
    return $http.post('/api/orders', order)
    .then(function (response) {
      return response.data;
    });
  };

  Order.getOrders = function (userId) {
    return $http.get('/api/orders?user=' + userId)
    .then(function (response) {
      return response.data;
    });
  };

  Order.getOrders = function (userId) {
    return $http.get('/api/orders?user=' + userId)
    .then(function (response) {
      return response.data;
    });
  };

  return Order;
});
