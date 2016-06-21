/* eslint no-param-reassign: ["error", { "props": false }]*/

const app = angular.module('myApp', ['ngMaterial'])
.config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('amber');
});

app.run(($window, $rootScope) => {
  $rootScope.online = navigator.onLine;
  $window.addEventListener('offline', () => {
    $rootScope.$apply(() => {
      $rootScope.online = false;
    });
  }, false);

  $window.addEventListener('online', () => {
    $rootScope.$apply(() => {
      $rootScope.online = true;
    });
  }, false);
});

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(() => {
      console.log('Service worker Registred');
    });
}
