angular.module('myApp').service('authenticationService', function ($http, configService, $q) {
  this.token = null;
  this.status = { isLoggedIn: false };

  this.authenticate = (name, password) => {
    return $q((resolve, reject) => {
      const data = {
        name,
        password,
      };

      $http.post(configService.REST_URLS.authentication, data).then(
        (response) => {
          this.token = response.data.token;
          this.status.isLoggedIn = true;
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
});
