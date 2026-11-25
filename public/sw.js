// Offline shell for the PWA:
// - Immutable Vite-hashed assets (/assets/*) use cache-first.
// - Unhashed resources (index.html, models/*.glb, manifest) use
//   network-first with cache fallback so deployed updates reach
//   existing devices immediately while still working offline.
// - Only successful same-origin responses (response.ok) are cached.
const CACHE = 'fitting-room-shell-v2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

function isHashedAsset(url) {
  return /\/assets\/[^/]+-[A-Za-z0-9_-]{6,}\.[a-z0-9]+$/i.test(url.pathname);
}

function cacheIfOk(request, response) {
  if (response && response.ok && (response.type === 'basic' || response.type === 'default')) {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (isHashedAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (hit) => hit || fetch(request).then((response) => cacheIfOk(request, response)),
      ),
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => cacheIfOk(request, response))
      .catch(() => caches.match(request)),
  );
});
