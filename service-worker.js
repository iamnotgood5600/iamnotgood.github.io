const cacheName = 'pwa-gacha-cache-v1';
const filesToCache = [
  '/',
  'index.html',
  'icon-96x96.png',
  'icon-192x192.png',
  'icon-144x144.png',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cache) {
          return cache.startsWith('pwa-gacha-cache-') &&
                 cache != cacheName;
        }).map(function(cache) {
          return caches.delete(cache);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
