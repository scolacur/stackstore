app.factory('Store', function ($http) {

  var Store = function (props) {
    angular.extend(this, props);
  }

  var returnData = function (response) {
    return new Store(response.data);
  }

  Store.getAll = function () {
    $http.get('/api/stores').then(returnData);
  }

  Store.getOne = function (storeId) {
    $http.get('/api/stores/' + storeId).then(returnData);
  }

  Store.make = function (store) {
    $http.post('/api/stores', store).then(returnData);
  }

  Store.edit = function (storeId, props) {
    $http.put('/api/stores/' + storeId, props).then(returnData);
  }

  Store.delete = function (storeId) {
    $http.put('/api/stores/' + storeId).then(returnData);
  }
});