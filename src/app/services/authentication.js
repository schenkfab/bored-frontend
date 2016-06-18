angular.module('myApp').service('authenticationService', function ($http, $window, configService, $q) {
  this.token = null;
  this.name = null;
  this.status = { isLoggedIn: false };

  this.authenticate = (name, password) => {
    return $q((resolve, reject) => {
      $http.post(configService.REST_URLS.authentication, { name, password }).then(
        (response) => {
          this.name = name;
          this.token = response.data.token;
          $window.localStorage.setItem('jwt', response.data.token);
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
