/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('mainCtrl', (authenticationService, $scope) => {
  $scope.auth = authenticationService;
  $scope.page = {};

  $scope.$watch('auth', (newValue, oldValue) => {
    if (newValue.token && newValue.token !== oldValue.token) {
      $scope.ms.getMessages();
    }
  }, true);
});
