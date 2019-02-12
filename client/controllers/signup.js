var app = angular.module('SignupApp', [
            'ngMaterial','ngMessages',
        ])

        .controller('SignupCtrl', function($scope){
        	var user = {email: "", password: ""};
        	$scope.user = user;
        });
