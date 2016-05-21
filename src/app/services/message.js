angular.module('myApp').service('messageService', function ($http, authenticationService, configService) {

  this.messages = [];

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
