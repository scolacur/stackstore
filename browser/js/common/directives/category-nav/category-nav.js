app.directive("categoryNav", function (Product) {
    return {
        restrict: 'EA',
        templateUrl: 'js/common/directives/category-nav/category-nav.html',
        link: function (scope) {
            Product.getCategories().then(function(categories) {
                scope.categories = categories;
            });
        },
        scope: {
            selected: "="
        }
    };
});
