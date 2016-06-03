/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp')
.controller('sendMessageCtrl', function($scope, authenticationService, pageService, messageService) {
  $scope.auth = authenticationService;
  $scope.page = pageService;

  $scope.data = {
    receiver: { name: 'Hans', _id: '' },
    messages: [],
    send: () => {
      messageService.sendMessage({
        text: $scope.data.reply,
        receiver: $scope.data.receiver._id,
      })
      .then((response) => {
        console.log(response);
        messageService.getMessagesByUser($scope.data.receiver._id)
        .then((response) => {
          console.log(response);
          $scope.data.messages = response.data;
        });
      });
    },
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
