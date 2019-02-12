(function() {
    'use strict';
    angular
        .module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'lfNgMdFileInput'])
        .controller('DemoCtrl', DemoCtrl);

    function DemoCtrl($timeout, $q, $log, $scope) {
        var self = this;
        $scope.test_name =[];
        $scope.test_description="";
        $scope.comments="";
        $scope.complaints = [{}];
        $scope.patient_history = [{}];

        $scope.add = function(array) {
            array.push('')
        }

        $scope.remove = function(array, ind) {
            array.splice(ind, 1);
        };

    }
})();
