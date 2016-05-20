/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('loginCtrl', ($scope, $http, authenticationService) => {
  $scope.user = {};

  $scope.user.login = () => {
    authenticationService.authenticate($scope.user.name, $scope.user.password);
  };
});
