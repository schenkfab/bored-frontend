angular.module('myApp').service('cacheService', function ($q) {
  this.cacheMiddleware = (url) => {
    return $q((resolve, reject) => {
      if ('caches' in window) {
        caches.match(url).then((response) => {
          if (response) {
            resolve(response);
          } else {
            reject('Not cached');
          }
        });
      }
    });
  };
});
