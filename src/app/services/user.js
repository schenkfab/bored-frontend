angular.module('myApp').service('userService', function ($http, authenticationService, configService, $q) {

  this.messages = [];

  this.addToContactList = (contacts) => {
    return $q((resolve, reject) => {
      $http.post(configService.REST_URLS.addContact, {
        contacts,
        token: authenticationService.token,
      }).then(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  this.getContactList = () => {
    return $q((resolve, reject) => {
      $http.get(configService.REST_URLS.contacts, {
        headers: {
          'x-access-token': authenticationService.token,
        },
      })
      .then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  this.getUsers = (query) => {
    return $q((resolve, reject) => {
      $http.get(configService.REST_URLS.users, {
        params: {
          name: query,
        },
        headers: {
          token: authenticationService.token,
        },
      })
      .then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
});
