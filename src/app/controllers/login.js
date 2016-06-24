/* eslint no-param-reassign: ["error", { "props": false }]*/

angular.module('myApp').controller('loginCtrl', function($mdToast, $location, $window, $scope, $http, authenticationService) {
  $scope.user = {};
  $scope.auth = authenticationService;

  let jwt = $window.localStorage.getItem('jwt');

  if (jwt) {
    console.log('jwt is in local storage');
    if (navigator.onLine) {
      console.log('we are online');
      $scope.auth.validate(jwt).then(() => {
        console.log('Token is still valid');
        $scope.auth.token = jwt;
        $scope.auth.name = $window.localStorage.getItem('name');
        $scope.auth.status.isLoggedIn = true;
        console.log($scope.auth);
      })
      .catch((ex) => {
        console.log(ex);
      });
    } else {
      console.log('we are offline');
      $scope.auth.token = jwt;
      $scope.auth.name = $window.localStorage.getItem('name');
      $scope.auth.status.isLoggedIn = true;
    }
  }

  $scope.showToast = (msg) => {
    $mdToast.show($mdToast.simple().textContent(msg).action('OK')
      .highlightAction(true)// Accent is used by default, this just demonstrates the usage.
      .parent(document.querySelectorAll('#toaster')));
  };

  $scope.user.login = () => {
    $scope.auth.authenticate($scope.user.name, $scope.user.password)
      .then(() => {
        $scope.showToast('You are logged in now.');
        // Switch to Contacts:
      }, (error) => {
        $scope.showToast('You could not be logged in');
      });
  };

  $scope.user.register = () => {
    $scope.auth.register($scope.user.name, $scope.user.password)
      .then(() => {
      }, (error) => {
        console.log(error);
      });
  };
});
