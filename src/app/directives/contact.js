/* eslint arrow-body-style: [""] */
angular.module('myApp').directive('contact', () => {
  return {
    templateUrl: 'app/templates/contact.html', // Where is the html code for the directive?
    controller: 'contactCtrl',
    replace: true, // Do you wan't to display the directive tag?
  };
});
