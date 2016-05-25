/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('mainCtrl', (authenticationService, $scope) => {
  $scope.auth = authenticationService;

  $scope.$watch('auth', (newValue, oldValue) => {
    // The authentication service has changed, therefor a token might be present.
    // If so, get the messages:
    if (newValue.token && newValue.token !== oldValue.token) {
      $scope.ms.getMessages();
    }
  }, true);
});
