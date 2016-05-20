angular.module('myApp').service('authenticationService', function ($http, configService) {
  this.authenticate = (name, password) => {
    const data = {
      name,
      password,
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

  this.token = '';
});
