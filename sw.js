var CACHE = 'cache-v1';

var urls = [
  '/',
  'https://unpkg.com/clipboard@2.0.8/dist/clipboard.min.js',
  'favicon.svg',
  'https://rsms.me/raster/raster.css',
  'markdown.js',
  'highlight.css',
  'highlight.js',
  'sw.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE)
      .then(function(cache) {
        return cache.addAll(urls);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});