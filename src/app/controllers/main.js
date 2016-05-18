/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('mainCtrl', () => {

});

angular.module('myApp').controller('loginCtrl', ($scope) => {
  $scope.user = {};

  $scope.user.login = () => {
    console.log($scope.user);
  };
});
