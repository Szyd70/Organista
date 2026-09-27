const CACHE_NAME = 'nuty-pwa-v2';

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Od razu aktywuj nowy SW
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Strategia Network-First: Najpierw pobieraj świeże dane z sieci, fallback do pamięci podręcznej
self.addEventListener('fetch', (e) => {
  // Dla API Google Drive – ZAWSZE wyłącznie sieć
  if (e.request.url.includes('googleapis.com')) {
    e.respondWith(fetch(e.request));
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(e.request))
  );
});
