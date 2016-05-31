/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp')
.controller('sendMessageCtrl', ($scope) => {
  $scope.data = {
    receiver: 'Hans',
    messages: [
      { sent: true, message: 'TestTestTestTestTestTest' },
      { sent: false, message: 'Titatutatoootata' },
      { sent: true, message: 'Helohlalrkskfhasdf' },
    ],
  };
});
