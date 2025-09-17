// Cache simple pour PWA — v2
const CACHE = "fbm-calc-v4-" + Date.now();
const ASSETS = [
  "./",
  "./index.html?v=2",
  "./manifest.webmanifest?v=2",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // ⬅️ active tout de suite
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim()) // ⬅️ prend la main sur les pages ouvertes
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(resp => resp || fetch(e.request))
  );
});
