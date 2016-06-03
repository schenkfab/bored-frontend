/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('mainCtrl', (authenticationService, $scope, pageService) => {
  $scope.auth = authenticationService;
  $scope.page = pageService;

  $scope.page.setPage({
    name: 'login',
  });

  $scope.$watch('page.page', (newValue, oldValue) => {});

  $scope.$watch('auth', (newValue, oldValue) => {
    if (newValue.token && newValue.token !== oldValue.token) {
      $scope.ms.getMessages();
    }
  }, true);
});
