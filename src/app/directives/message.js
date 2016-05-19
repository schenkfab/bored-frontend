/* eslint arrow-body-style: [""] */
angular.module('myApp').directive('message', () => {
  return {
    templateUrl: 'app/templates/message.html', // Where is the html code for the directive?
    controller: 'messageCtrl',
    replace: true, // Do you wan't to display the directive tag?
  };
});
