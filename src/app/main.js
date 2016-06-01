angular.module('myApp', ['ngMaterial'])
.config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('amber');
});
