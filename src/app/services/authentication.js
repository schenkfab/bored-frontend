angular.module('myApp').service('authenticationService', function ($http, configService, $q) {
  this.token = null;
  this.status = { isLoggedIn: false };

  this.authenticate = (name, password) => {
    return $q((resolve, reject) => {
      $http.post(configService.REST_URLS.authentication, { name, password }).then(
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

  this.register = (name, password) => {
    return $q((resolve, reject) => {
      $http.post(configService.REST_URLS.registration, { name, password }).then(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
});
