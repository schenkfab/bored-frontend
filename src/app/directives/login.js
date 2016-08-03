/* eslint arrow-body-style: [0] */
angular.module('myApp').directive('login', () => {
  return {
    templateUrl: 'app/templates/login.html', // Where is the html code for the directive?
    replace: true, // Do you wan't to display the directive tag?
  };
});
