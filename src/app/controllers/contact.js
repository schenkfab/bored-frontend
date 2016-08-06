/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('contactCtrl', function($scope, $http, userService, authenticationService, pageService) {
  $scope.contacts = [];
  $scope.contact = {};
  $scope.contact.searchName = null;
  $scope.contact.list = [];
  $scope.auth = authenticationService;
  $scope.isOn = navigator.onLine;

  $scope.page = pageService;

  $scope.getContacts = () => {
    userService.getContactList($scope.isOn)
      .then((response) => {
        if (response.length > 0) {
          $scope.contacts = response[0].contacts;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  $scope.removeFromList = (contact) => {
    const contactIds = [];
    $scope.contacts.forEach((cnt) => {
      if (cnt._id !== contact._id) {
        contactIds.push(cnt._id);
      }
    });

    userService.addToContactList(contactIds).then((r) => {
      $scope.contacts = r.data.contacts;
    }).catch((e) => {
      console.log(e);
    });
  };

  $scope.sendMessage = (c) => {
    $scope.page.setPage({ name: 'SendMessage', user: c, title: c.name });
  };

  $scope.addUserToList = (contact) => {
    // the api expects an array with all the userIds.
    const contactIds = [];
    $scope.contacts.forEach((cnt) => {
      contactIds.push(cnt._id);
    });
    if (contactIds.indexOf(contact._id) === -1) {
      contactIds.push(contact._id);
      userService.addToContactList(contactIds).then((r) => {
        $scope.contacts = r.data.contacts;
      }).catch((e) => {
        console.log(e);
      });
    }
  };

  $scope.$watch('isOn', (newValue, oldValue) => {
    if (newValue && $scope.auth.status.isLoggedIn) {
      $scope.getContacts();
    }
  });

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
    if (newValue.token) {
      $scope.getContacts();
    }
  }, true);
});
