// Minimal service worker: caches the app shell (this is a single-file app,
// so "shell" and "content" are the same file) plus the manifest/icons, so
// the blend tools and Mood Card work offline after a first visit. Does not
// touch the Formspree email-gate request -- that's a cross-origin POST and
// is never same-origin-GET, so it's simply never matched below and always
// goes straight to the network.

const CACHE_VERSION = "vb-cache-v1";
const SHELL_ASSETS = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-192-maskable.png",
  "./icon-512-maskable.png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE_VERSION).map(n => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  // Only ever handle same-origin GETs -- everything else (the Formspree
  // POST, any future cross-origin call) passes straight through untouched.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req)
        .then(res => {
          if (res.ok) caches.open(CACHE_VERSION).then(cache => cache.put(req, res.clone()));
          return res;
        })
        .catch(() => cached); // offline: fall back to whatever's cached
      // Cache-first for instant offline loads; refresh the cache in the
      // background whenever the network is actually available.
      return cached || network;
    })
  );
});
