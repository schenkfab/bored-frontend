/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp')
.controller('messageCtrl', ($scope, messageService, authenticationService, pageService) => {
  $scope.ms = messageService;
  $scope.auth = authenticationService;
  $scope.messages = $scope.ms.messages;
  $scope.page = pageService;

  $scope.$watch('ms.msg', (newValue, oldValue) => {
    if (newValue !== oldValue) {
      $scope.messages = newValue.messages;
    }
  }, true);

  $scope.reply = (msg) => {
    // First set the message as read if it isnt already and than switch to SendMessage page
    if (msg.isRead) {
      $scope.page.setPage({ name: 'SendMessage', user: msg.sender, title: msg.sender.name });
    } else {
      $scope.ms.setRead(msg._id)
      .then((response) => {
        msg.isRead = true;
        $scope.page.setPage({
          name: 'SendMessage',
          user: msg.sender,
          title: msg.sender.name,
        });
      });
    }
  };
});
