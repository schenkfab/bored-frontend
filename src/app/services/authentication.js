angular.module('myApp').service('authenticationService', function ($http, $window, configService, $q) {
  this.token = null;
  this.name = null;
  this.status = { isLoggedIn: false };

  this.validate = (token) => {
    return $q((resolve, reject) => {
      $http.post(configService.REST_URLS.validate,
        { token })
      .then(
          (response) => {
            console.log(response);
            if (response.data.success) {
              resolve();
              console.log('Token is still valid');
            } else {
              reject();
            }
          },
          (error) => {
            console.log(error);
          }
        );
    });
  };

  this.authenticate = (name, password) => {
    return $q((resolve, reject) => {
      $http.post(configService.REST_URLS.authentication, { name, password }).then(
        (response) => {
          this.name = name;
          this.token = response.data.token;
          $window.localStorage.setItem('jwt', response.data.token);
          $window.localStorage.setItem('name', name);
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
