angular.module('myApp').service('configService', function () {
  this.REST_URLS = {
    authentication: 'http://localhost:8080/api/v1/authenticate',
    validate: 'http://localhost:8080/api/v1/validate',
    registration: 'http://localhost:8080/api/v1/register',
    messages: 'http://localhost:8080/api/v1/messages',
    users: 'http://localhost:8080/api/v1/users',
    addContact: 'http://localhost:8080/api/v1/contacts',
    contacts: 'http://localhost:8080/api/v1/contacts',
    endpoint: 'http://localhost:8080/api/v1/endpoint',
  };
});
