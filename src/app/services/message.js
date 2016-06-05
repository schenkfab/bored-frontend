angular.module('myApp').service('messageService', function ($http, $q, authenticationService, configService) {

  this.msg = {};
  this.msg.messages = [];
  this.msg.unreadMessages = 0;

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

  this.getMessagesByUser = (userId) => {
    return $q((resolve, reject) => {
      $http.get(`${configService.REST_URLS.messages}/${userId}`, {
        headers: {
          token: authenticationService.token,
        },
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
      headers: {
        token: authenticationService.token,
      },
    })
    .then(
      (response) => {
        this.msg.unreadMessages = 0;
        this.msg.messages = response.data;
        this.msg.messages.forEach((msg) => {
          if (!msg.isRead) {
            this.msg.unreadMessages++;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };
});
