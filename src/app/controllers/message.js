/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('messageCtrl', ($scope) => {
  $scope.messages = [];
  $scope.messages.push({
    sender: 'Test',
    sentOn: (new Date()),
    message: 'This is a test!',
  });

  $scope.reply = (msg) => {
    console.log(msg);
  };

  $scope.delete = (msg) => {
    console.log(msg);
  };
});
