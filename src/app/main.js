angular.module('myApp', ['ngMaterial'])
.config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('amber');
});

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .than(() => {
      console.log('Service worker Registred');
    });
}
