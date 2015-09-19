app.factory('Store', function ($http) {

  var Store = function (props) {
    angular.extend(this, props);
  }

  var returnData = function (response) {
    return new Store(response.data);
  }

  Store.getAll = function () {
    return $http.get('/api/stores').then(returnData);
  }

  Store.getByName = function (storeName) {
    console.log('/api/stores/' + storeName);
    return $http.get('/api/stores/' + storeName).then(returnData);
  }

  Store.make = function (store) {
    return $http.post('/api/stores', store).then(returnData);
  }

  Store.edit = function (storeName, props) {
    return $http.put('/api/stores/' + storeName, props).then(returnData);
  }

  Store.delete = function (storeName) {
    return $http.put('/api/stores/' + storeName).then(returnData);
  }

  return Store;
});