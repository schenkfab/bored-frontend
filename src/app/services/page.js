angular.module('myApp').service('pageService', function() {
  this.page = {};

  this.setPage = (page) => {
    this.page = page;
  };

  this.getPage = () => {
    return this.page;
  };
});
