app.factory('StoreFactory', function ($http, $state) {

  var Store = function (props) {
    angular.extend(this, props);
  };

  var returnData = function (response) {
    return new Store(response.data);
  };

  Store.getAll = function () {
    return $http.get('/api/stores').then(function (response) {
      return response.data.map(function (store) {
        return new Store(store);
      });
    });
  };

  Store.prototype.go = function () {
    $state.go('store', {storeName: this.urlName});
  };

  Store.getByName = function (storeName) {
    return $http.get('/api/stores/' + storeName).then(returnData);
  };

  Store.make = function (store) {
    return $http.post('/api/stores', store).then(returnData);
  };

  Store.edit = function (storeName, props) {
    return $http.put('/api/stores/' + storeName, props).then(returnData);
  };

  Store.delete = function (storeName) {
    return $http.put('/api/stores/' + storeName).then(returnData);
  };

  Store.addStore = function (store) {
      return $http.post('/api/stores', store)
      .then(function (res) {
          return res.data;
      });
  };

  return Store;
});
