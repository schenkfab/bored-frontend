const cacheName = 'bored-v1';
const dataCacheName = 'boredData-v1';
const filesToCache = ['/app/style.css',
                      '/app/vendors.css',
                      '/app/main.js',
                      '/app/controllers/contact.js',
                      '/app/controllers/login.js',
                      '/app/controllers/main.js',
                      '/app/controllers/message.js',
                      '/app/controllers/sendmessage.js',
                      '/app/directives/contact.js',
                      '/app/directives/login.js',
                      '/app/directives/message.js',
                      '/app/directives/sendmessage.js',
                      '/app/services/authentication.js',
                      '/app/services/cacheService.js',
                      '/app/services/config.js',
                      '/app/services/message.js',
                      '/app/services/page.js',
                      '/app/services/user.js'];

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// if the current fetch request is an API call,
// execute the fetch and store the results in the
// cache. The logic to load data from cache first is
// handled within the application and not in the
// service worker here.
self.addEventListener('fetch', (e) => {
  console.log('[ServiceWorker] Fetch', e.request.url);
  const dataUrl = 'http://localhost:8080';
  if (e.request.url.indexOf(dataUrl) === 0) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          return caches.open(dataCacheName).then((cache) => {
            cache.put(e.request.url, response.clone());
            console.log('[ServiceWorker] Fetched&Cached Data');
            return response;
          });
        })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  }
});
