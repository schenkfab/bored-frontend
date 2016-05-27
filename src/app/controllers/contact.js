/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('contactCtrl', function($scope, $http, userService) {
  $scope.contacts = [];
  $scope.contacts.push({
    name: 'Test',
  });

  $scope.contact = {};
  $scope.contact.searchName = null;
  $scope.contact.list = [];

  $scope.$watch('contact', (newValue, oldValue) => {
    if (newValue.searchName) {
      if (newValue.searchName.length > 2) {
        userService.getUsers(newValue.searchName).then(function(r) { 
          $scope.contact.list = r;
        });
      } else {
        $scope.contact.list = [];
      }
    } else {
      $scope.contact.list = [];
    }
  }, true);
});
