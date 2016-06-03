/* eslint arrow-body-style: [""] */
angular.module('myApp').directive('sendmessage', () => {
  return {
    templateUrl: 'app/templates/sendmessage.html', // Where is the html code for the directive?
    replace: true, // Do you wan't to display the directive tag?
  };
});
