app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup= function (signupInfo) {
        $scope.error = null;
        AuthService.signup(signupInfo)
        .then(function (user) {
            console.log("USER: ",user);
            $state.go('home');
            // AuthService.login(user);
        })
        // .catch(function () {
        //     $scope.error = 'Invalid signup credentials!';
        // });

    };

});
