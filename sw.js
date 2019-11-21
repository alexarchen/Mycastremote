var cacheName = 'mycastremote';
var filesToCache = [
  '',
  'index.html',
  'css/style.css',
  'js/main.js',
  'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request, { mode: 'no-cors'});
    })
  );
});
