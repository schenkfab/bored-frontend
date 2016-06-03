/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp')
.controller('sendMessageCtrl', ($scope, authenticationService, pageService, messageService) => {
  $scope.auth = authenticationService;
  $scope.page = pageService;

  $scope.data = {
    receiver: { name: 'Hans', _id: '' },
    messages: [],
  };

  $scope.$watch('page.page', (newValue, oldValue) => {
    if (newValue.name === 'SendMessage' && newValue.name !== oldValue.name) {
      $scope.data.receiver = newValue.user;
      messageService.getMessagesByUser(newValue.user._id)
      .then((response) => {
        $scope.data.messages = response.data;
      });
    }
  }, true);
});
