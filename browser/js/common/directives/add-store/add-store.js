app.directive('addStore', function(Store){
  return {
    restrict: 'EA',
    templateUrl: '/js/common/directives/add-store/add-store.html',
    link: function (scope) {
        scope.addStore = function (store, user) {
            store.user = user;
            Store.addStore(store)
            .then(function(newStore){
                scope.$emit('newStore', newStore);
                scope.store = {};
            })
        }
    }
  };
});
