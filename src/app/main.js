const app = angular.module('myApp', ['ngMaterial'])
.config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('amber');
});

app.run(function($window, $rootScope) {
  $rootScope.online = navigator.onLine;
  $window.addEventListener("offline", function() {
        $rootScope.$apply(function() {
            console.log($rootScope.online);
            $rootScope.online = false;
        });
      }, false);

      $window.addEventListener("online", function() {
        $rootScope.$apply(function() {
            console.log($rootScope.online);
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
