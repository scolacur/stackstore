app.factory('Order', function($http){


  var Order = function () {

  };

  Order.postOrder = function (order) {
    return $http.post('/api/orders', order)
    .then(function (response) {
      return response.data;
    });
  };

  Order.getOrders = function (query) {
    return $http.get('/api/orders', {params: query})
    .then(function (response) {
      return response.data;
    });
  };

  Order.getOrder = function (orderId) {
    return $http.get('/api/orders/' + orderId)
    .then(function (response) {
      return response.data;
    });
  };

  Order.getAllOrders = function () {
    return $http.get('/api/orders')
    .then(function (response) {
      return response.data;
    });
  };

  return Order;
});
