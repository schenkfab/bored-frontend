angular.module('myApp').service('userService', function ($http, authenticationService, configService, $q) {

  this.messages = [];

  this.getUsers = (query) => {
    return $q((resolve, reject) => {
      $http.get(configService.REST_URLS.users, {
        params: { token: authenticationService.token, name: query },
      })
      .then(
        (response) => {
          resolve(response.data);
        }
      );
    });
  };
});
