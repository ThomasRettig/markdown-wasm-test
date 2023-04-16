var CACHE = "cache-v3";

var urls = [
  "/",
  "styles.css",
  "clipboard.min.js",
  "favicon.svg",
  "manifest.webmanifest",
  "markdown.js",
  "highlight.css",
  "highlight.js",
  "sw.js",
  "markdown_sample.md",
  "markdown.wasm",
  "font-files/Inter-roman.var.woff2",
  "font-files/iaw-mono-vf.woff2",
  "icon-192x192.png", // default PWA icon fetched by Chrome desktop
  "apple-touch-icon-180x180.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(urls);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  }
});

self.addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE];
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
