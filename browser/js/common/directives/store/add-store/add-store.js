app.directive('addStore', function(StoreFactory){
  return {
    restrict: 'EA',
    templateUrl: '/js/common/directives/store/add-store/add-store.html',
    link: function (scope) {
      scope.addStore = function (store, user) {
        store.user = user;
        StoreFactory.addStore(store)
        .then(function(newStore){
            scope.$emit('newStore', newStore);
            scope.store = {};
        });
      };
    }
  };
});
