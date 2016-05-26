/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('loginCtrl', function($location, $scope, $http, authenticationService) {
  $scope.user = {};
  $scope.auth = authenticationService;

  $scope.user.login = () => {
    $scope.auth.authenticate($scope.user.name, $scope.user.password)
      .then(() => {
        // Switch to Contacts:
      }, (error) => {
        console.log(error);
      });
  };

  $scope.user.register = () => {
    $scope.auth.register($scope.user.name, $scope.user.password)
      .then(() => {
      }, (error) => {
        console.log(error);
      });
  };
});
