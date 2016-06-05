/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('mainCtrl', (authenticationService, $scope, pageService, messageService) => {
  $scope.auth = authenticationService;
  $scope.page = pageService;
  $scope.messageService = messageService;
  $scope.unreadMessages = 0;

  $scope.page.setPage({
    name: 'login',
  });

  $scope.$watch('page.page', (newValue, oldValue) => {});

  $scope.$watch('messageService.msg.unreadMessages', (newValue, oldValue) => {
    $scope.unreadMessages = newValue;
  });

  $scope.$watch('auth', (newValue, oldValue) => {
    if (newValue.token && newValue.token !== oldValue.token) {
      $scope.ms.getMessages();
    }
  }, true);
});
