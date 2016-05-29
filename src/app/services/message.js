angular.module('myApp').service('messageService', function ($http, $q, authenticationService, configService) {

  this.messages = [];

  this.sendMessage = (message) => {
    return $q((resolve, reject) => {
      $http.post(configService.REST_URLS.messages, {
        message: message.text,
        token: authenticationService.token,
        receiver: message.receiver,
      })
      .then(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        });
    });
  };

  this.getMessages = () => {
    $http.get(configService.REST_URLS.messages, {
      params: { token: authenticationService.token },
    })
    .then(
      (response) => {
        this.messages = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  };
});
