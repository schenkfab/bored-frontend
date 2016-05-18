/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('loginCtrl', ($scope, $http, configService) => {
  $scope.user = {};

  $scope.user.login = () => {
    const data = {
      name: $scope.user.name,
      password: $scope.user.password,
    };

    $http.post(configService.REST_URLS.authentication, data).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };
});
