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
  console.log('Service Worker is supported');
    navigator.serviceWorker.register('./service-worker.js')
    .then(function(reg) {
      console.log(':^)', reg);
      reg.pushManager.subscribe({
          userVisibleOnly: true
      }).then(function(sub) {
          console.log('endpoint:', sub.endpoint);
      });
    }).catch(function(error) {
      console.log(':^(', error);
    });
}

// Push Notifications Stuff
