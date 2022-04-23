var CACHE = "cache-v1";

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
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});