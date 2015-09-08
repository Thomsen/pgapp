angular.module('form', [])
  .controller("FormController", function($scope, $stateParams) {
    $scope.templateData = angular.fromJson($stateParams.data);

    $scope.getTmplIns = function() {
      var tmplIns = $scope.templateData.templateInstance;
      console.log(angular.toJson(tmplIns));
    };
  });
