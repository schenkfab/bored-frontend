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
            if (response.data.success) {
              resolve();
            } else {
              reject('invalid token');
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
          $window.localStorage.setItem('userId', response.data.userId);
          this.status.isLoggedIn = true;
          // If the authentication was successful, add the endpoint aswell.
          const userId = response.data.userId;
          $http.put(configService.REST_URLS.endpoint + '/' + userId, { endpoint: $window.localStorage.getItem('endpoint') })
          .then((response) => {
            resolve();
          },
          (error) => {
            reject(error);
          });
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
