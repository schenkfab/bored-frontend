angular.module('myApp').service('configService', function () {
  this.REST_URLS = {
    authentication: 'http://localhost:8080/api/v1/authenticate',
  };
});
