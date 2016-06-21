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

  this.getContactList = (isOnline) => {
    return $q((resolve, reject) => {
      if (isOnline) {
        $http.get(configService.REST_URLS.contacts, {
          headers: {
            'x-access-token': authenticationService.token,
          },
        })
        .then(
          (response) => {
            // Store in IndexedDb
            idb.open('bored-data-contacts', 1, upgradeDb => {
              upgradeDb.createObjectStore('contactList', { keyPath: 'name' });
            }).then(db => {
              const tx = db.transaction('contactList', 'readwrite');
              const contactsStore = tx.objectStore('contactList');
              const obj = {
                name: authenticationService.name,
                contacts: response.data,
              };
              contactsStore.delete(authenticationService.name);
              contactsStore.put(obj);
              return tx.complete;
            });
            resolve(response.data);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        // there is no internet connection, therefor get from cache.
        idb.open('bored-data-contacts', 1, upgradeDb => {
          upgradeDb.createObjectStore('contactList', { keyPath: 'name' });
        }).then(db => {
          return db.transaction('contactList').objectStore('contactList').get(authenticationService.name);
        }).then(contacts => {
          resolve(contacts);
        });
      }
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
