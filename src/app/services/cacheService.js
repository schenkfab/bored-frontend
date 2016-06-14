angular.module('myApp').service('cacheService', function ($q) {
  this.cacheMiddleware = (url) => {
    return $q((resolve, reject) => {
      if ('caches' in window) {
        caches.match(url).then((response) => {
          if (response) {
            console.log('getting data from cache');
            resolve(response);
          } else {
            console.log('getting data from network');
            reject('Not cached');
          }
        });
      }
    });
  };
});
