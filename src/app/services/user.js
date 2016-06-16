angular.module('myApp').service('userService', function ($http, authenticationService, configService, $q) {

  this.messages = [];

  this.addToContactList = (contacts) => {
    return $q((resolve, reject) => {
      $http.post(configService.REST_URLS.addContact, {
        contacts,
        token: authenticationService.token,
      }).then(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  this.getContactList = () => {
    return $q((resolve, reject) => {
      $http.get(configService.REST_URLS.contacts, {
        headers: {
          'x-access-token': authenticationService.token,
        },
      })
      .then(
        (response) => {

          // Store in IndexedDb
          // Set the last searched connection:
    // var _dbPromise = idb.open('publictransportation', 1, upgradeDb => {
    //   upgradeDb.createObjectStore('connections', {'keyPath': 'id'});
    // }).then(db => {
    //   return db.transaction('connections').objectStore('connections').getAll();
    // }).then(connections => {
    //   if (connections.length > 0)
    //   {
    //     $scope.connections = connections;
    //     $scope.searchFields.to = connections[0].to.location.name;
    //     $scope.searchFields.from = connections[0].from.location.name;
    //     $scope.$apply();
    //   }
    // });


    //       idb.open('bored', 1, upgradeDb => {
    //         upgradeDb.createObjectStore('connections', {'keyPath': 'id'});
    //       }).then(db =>{
    //         var tx = db.transaction('connections', 'readwrite');
    //         var connectionStore = tx.objectStore('connections');
    //         connectionStore.clear();
    //         response.data.connections.forEach((con, i) => {
    //           con.id = i;
    //           connectionStore.put(con);
    //         });
    //         return tx.complete;
    //       }).then(() => {
    //         //console.log('done')
    //       });



          resolve(response.data);








        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  this.getUsers = (query) => {
    return $q((resolve, reject) => {
      $http.get(configService.REST_URLS.users, {
        params: {
          name: query,
        },
        headers: {
          token: authenticationService.token,
        },
      })
      .then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
});
