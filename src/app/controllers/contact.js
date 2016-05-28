/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('contactCtrl', function($scope, $http, userService, authenticationService) {
  $scope.contacts = [];
  $scope.contact = {};
  $scope.contact.searchName = null;
  $scope.contact.list = [];
  $scope.auth = authenticationService;

  $scope.getContacts = () => {
    userService.getContactList()
      .then((response) => {
        $scope.contacts = response[0].contacts;
      });
  };

  $scope.addUserToList = (contact) => {
    // the api expects an array with all the userIds.
    const contactIds = [];
    $scope.contacts.forEach((cnt) => {
      contactIds.push(cnt._id);
    });
    contactIds.push(contact._id);

    userService.addToContactList(contactIds).then((r) => {
      $scope.contacts = r.data.contacts;
    }).catch((e) => {
      console.log(e);
    });

    console.log(contactIds);
  };

  $scope.$watch('contact', (newValue, oldValue) => {
    if (newValue.searchName) {
      if (newValue.searchName.length > 2) {
        userService.getUsers(newValue.searchName).then((r) => {
          $scope.contact.list = r;
        });
      } else {
        $scope.contact.list = [];
      }
    } else {
      $scope.contact.list = [];
    }
  }, true);

  $scope.$watch('auth', (newValue, oldValue) => {
    // The authentication service has changed, therefor a token might be present.
    // If so, get the messages:
    if (newValue.token && newValue.token !== oldValue.token) {
      $scope.getContacts();
    }
  }, true);
});
