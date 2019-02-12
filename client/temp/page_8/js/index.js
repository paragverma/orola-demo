angular.module('MyApp', ['ngMaterial', 'md.data.table','ngMessages', 'lfNgMdFileInput'])

.controller('DemoCtrl', ['$mdEditDialog', '$q', '$scope', '$timeout', function ($mdEditDialog, $q, $scope, $timeout, $log) {
  'use strict';
  
  $scope.selected = [];
  $scope.DataList = {
    "count": 9,
    
    "data": [
      {
        "name": "Plasma glucose (F)",
        "value": "",
        "unit": "mg/dl",
        "range": "70-100",
        "comment": ""
      },
      {
        "name": "Plasma glucose (FF)",
        "value": "",
        "unit": "mg/dl",
        "range": "< 140",
        "comment": ""
      },
      {
        "name": "Plasma glucose (R)",
        "value": "",
        "unit": "mg/dl",
        "range": "",
        "comment": ""
      },
      {
        "name": "name",
        "value": "",
        "unit": "mg/dl",
        "range": "",
        "comment": ""
      },
      {
        "name": "name",
        "value": "",
        "unit": "mg/dl",
        "range": "0-100",
        "comment": ""
      },
      {
        "name": "name",
        "value": "",
        "unit": "mg/dl",
        "range": "0-100",
        "comment": ""
      },
      {
        "name": "name",
        "value": "",
        "unit": "mg/dl",
        "range": "0-100",
        "comment": ""
      },
      {
        "name": "name",
        "value": "",
        "unit": "mg/dl",
        "range": "0-100",
        "comment": ""
      },
      
    ]
  };
  $scope.add = function(array) {
      array.push(
        {
          "name": $scope.name,
          "value": $scope.value,
          "unit": $scope.unit,
          "range": $scope.range,
          "comment": $scope.comment
                  
      })
  }
  $scope.remove = function(array, ind) {
      array.splice(ind, 1);
  };

  $scope.editValue = function (event, dessert) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: dessert.value,
      placeholder: 'Add a value',
      save: function (input) {

        dessert.value = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a value',
      type: 'number',
      
      validators: {
         
         step: "0.01",
      }
    };
    
    var promise;
    promise = $mdEditDialog.small(editDialog);
    
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('name', input.$modelValue !== 'name');
      });
    });
  };
  
  $scope.editComment = function (event, dessert) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: dessert.comment,
      placeholder: 'Add a comment',
      save: function (input) {

        dessert.comment = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 30
      }
    };
    
    var promise;
    
      promise = $mdEditDialog.small(editDialog);
    
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('name', input.$modelValue !== 'name');
      });
    });
  };
}]);
