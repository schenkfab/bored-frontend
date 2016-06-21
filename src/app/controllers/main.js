/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('mainCtrl', (authenticationService, $scope, pageService, messageService, $rootScope) => {
  $scope.auth = authenticationService;
  $scope.page = pageService;
  $scope.messageService = messageService;
  $scope.unreadMessages = 0;
  $scope.isOnline = navigator.onLine;

  $scope.page.setPage({
    name: 'login',
  });

  $scope.$watch('page.page', (newValue, oldValue) => {});

  $scope.$watch('messageService.msg.unreadMessages', (newValue, oldValue) => {
    $scope.unreadMessages = newValue;
  });

  $scope.$watch('isOnline', (newValue, oldValue) => {
    if (newValue && !oldValue) {
      $scope.messageService.getMessages($scope.isOnline);
    }
  }, true);

  $scope.$watch('auth', (newValue, oldValue) => {
    if (newValue.token) {
      $scope.messageService.getMessages($scope.isOnline);
    }
  }, true);
});
