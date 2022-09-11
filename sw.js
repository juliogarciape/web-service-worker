var cacheName = 'BBC v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      return cache.addAll([
        './',
        './main.js',
        './backup.html',
        './backup.css',
        './loaded.webp'
      ])
    })
    .catch(err => console.log("Error Cached"))
  )
});


self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Servicio Worker] Obteniendo recurso: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Servicio Worker] Almacena el nuevo recurso: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});


self.addEventListener('active', event => {
  console.log("ACTIVE")
})