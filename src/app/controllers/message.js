/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('messageCtrl', ($scope, messageService, authenticationService) => {
  $scope.ms = messageService;
  $scope.auth = authenticationService;
  $scope.messages = $scope.ms.messages;

  $scope.$watch('auth', (newValue, oldValue) => {
    // The authentication service has changed, therefor a token might be present.
    // If so, get the messages:
    if (newValue.token && newValue.token !== oldValue.token) {
      $scope.ms.getMessages();
    }
  }, true);

  $scope.$watch('ms', (newValue, oldValue) => {
    if (newValue !== oldValue) {
      $scope.messages = newValue.messages;
    }
  }, true);

  $scope.reply = (msg) => {
    console.log(msg);
  };

  $scope.delete = (msg) => {
    console.log(msg);
  };
});
