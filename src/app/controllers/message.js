/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp')
.controller('messageCtrl', ($scope, messageService, authenticationService, pageService) => {
  $scope.ms = messageService;
  $scope.auth = authenticationService;
  $scope.messages = $scope.ms.messages;
  $scope.page = pageService;

  $scope.$watch('auth', (newValue, oldValue) => {
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
    $scope.page.setPage({ name: 'SendMessage', user: msg.sender, title: msg.sender.name });
  };

  $scope.delete = (msg) => {
    console.log(msg);
  };
});
