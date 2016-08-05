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
  .then((reg) => {
    console.log(':^)', reg);
    reg.pushManager.subscribe({
      userVisibleOnly: true,
    }).then((sub) => {
      // Store the object in cache
      localStorage.setItem('endpoint', sub.endpoint);
      console.log('endpoint:', sub.endpoint);
    });
  }).catch((error) => {
    console.log(':^(', error);
  });
}
