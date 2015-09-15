app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "ProductListCtrl",
        resolve: {
        	findProducts: function (ProductFactory) {
        		console.log("resolving");
        		return ProductFactory.getProducts();
        	}
        }
    });
});