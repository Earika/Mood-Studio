// Service worker: caches the app shell (single-file app) plus manifest/
// icons for offline. Cross-origin POST (Formspree) is never same-origin
// GET, so it never matches the fetch handler and always hits the network.
//
// Strategy per resource type:
//   * HTML  -> NETWORK-FIRST. Always try fresh; fall back to cache only
//              when offline. Fixes the classic PWA pain where users run
//              one version behind after every deploy because cache-first
//              serves stale index.html and only refreshes in background.
//   * Everything else -> CACHE-FIRST with background refresh. Icons/
//              manifest don't change often and rarely block a UI fix.
//
// Bump CACHE_VERSION whenever a shipped change needs to invalidate the
// old shell forcefully -- the activate handler then deletes prior caches.

const CACHE_VERSION = "vb-cache-v2";
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

function isHtmlRequest(req) {
  if (req.mode === "navigate") return true;
  const accept = req.headers.get("accept") || "";
  if (accept.includes("text/html")) return true;
  const path = new URL(req.url).pathname;
  return path.endsWith(".html") || path.endsWith("/");
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  if (isHtmlRequest(req)) {
    // Network-first for HTML: always try the live version so shipped
    // fixes land on the next load, not the load after that.
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) caches.open(CACHE_VERSION).then(cache => cache.put(req, res.clone()));
          return res;
        })
        .catch(() => caches.match(req).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }

  // Cache-first for assets: fast offline load, refresh in background.
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req)
        .then(res => {
          if (res.ok) caches.open(CACHE_VERSION).then(cache => cache.put(req, res.clone()));
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
