angular.module('myApp').service('messageService', function ($http, $q, cacheService, authenticationService, configService) {

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

  this.countUnread = () => {
    this.msg.unreadMessages = 0;
    this.msg.messages.forEach((msg) => {
      if (!msg.isRead) {
        this.msg.unreadMessages++;
      }
    });
  };

  this.setRead = (messageId) => {
    return $q((resolve, reject) => {
      $http.put(`${configService.REST_URLS.messages}/${messageId}/isread`, {
        token: authenticationService.token,
      })
      .then(
        (response) => {
          this.msg.unreadMessages--;
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

  this.getMessagesFromCache = () => {
    cacheService.cacheMiddleware(configService.REST_URLS.messages)
    .then((response) => {
      // data was found in cache.
      // First use the cached data
      this.msg.messages = response.data;
      // As the cached data is now displayed,
      // get the new data from the API.
      this.getMessages();
    })
    .catch((error) => {
      // data was not found in cache.
      this.getMessages();
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
        this.msg.messages = response.data;
        this.countUnread();
      },
      (error) => {
        console.log(error);
      }
    );
  };
});
