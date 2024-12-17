const CACHE_NAME = "weather-app-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./service.js",
  "https://cdn-icons-png.flaticon.com/512/4470/4470938.png",
  "https://cdn-icons-png.flaticon.com/512/4005/4005754.png",
  "https://cdn4.iconfinder.com/data/icons/weather-conditions/512/sun_cloud_wind-512.png",
  "https://cdn-icons-png.flaticon.com/512/8691/8691186.png",
  "https://cdn-icons-png.flaticon.com/512/3222/3222800.png",
  "https://png.pngtree.com/png-vector/20191118/ourmid/pngtree-rain-icon-creative-design-template-png-image_1998625.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_84KQXmp500bsQiAZJteVNyzLSVAL4wQrHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVBo-A8TUle17EJMoZRCO0j_6l7SpscruN6w&s"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).catch(() => {
        console.error("Network request failed and no cache available.");
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
