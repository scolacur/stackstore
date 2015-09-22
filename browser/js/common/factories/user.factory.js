app.factory('UserFactory', function($http){

	var User = function(props){
		angular.extend(this, props);
	};

	User.getAll = function (){
		return $http.get('/api/users')
		.then(function(response){
			return response.data;
		});
	};

	User.getById = function (id) {
		return $http.get('/api/users/' + id)
		.then(function(response){
			return response.data;
		});
	};

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

	User.getStores = function (id) {
		return $http.get('/api/stores?user=' + id)
		.then(function(response){
			return response.data;
		});
	};

	User.edit = function (id, props) {
		return $http.put('/api/users/' + id, props)
		.then(function(response){
			return response.data;
		});
	};

	User.delete = function (id) {
		return $http.delete('/api/users/' + id)
		.then(function(response){
				return response.data;
		});
	};


	return User;
});
