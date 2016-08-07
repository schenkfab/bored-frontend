/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('mainCtrl', (authenticationService, $scope, pageService, messageService, $interval) => {
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

  //$interval(() => {
   // $scope.messageService.getMessages($scope.isOnline);
  //}, 10000);

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
