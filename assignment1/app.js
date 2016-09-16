(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.items = "";
  $scope.message = "";
  $scope.color = "";

  $scope.sayMessage = function () {
      var splits = $scope.items.split(",");
      if ($scope.items === "") {
           $scope.message = 'Please enter data first';
           $scope.color = "red";
      } else if (splits.length < 4) {
          $scope.message = 'Enjoy';
          $scope.color = "green";
      } else {
          $scope.message = 'Too much!';
          $scope.color = "green";
      }
  };

 }

})();
