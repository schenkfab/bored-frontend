/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('contactCtrl', function($scope) {
  $scope.contacts = [];
  $scope.contacts.push({
    name: 'Test',
  });

  console.log("Hello");

});
