/* Офлайн-режим: сначала сеть (чтобы обновления приходили сразу), при отсутствии сети — сохранённая копия.
   При добавлении приложения допишите его страницу в PRECACHE и поднимите VERSION. */
const VERSION = "v2";
const CACHE = "bio-ct-" + VERSION;
const PRECACHE = [
  "./",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/icon-192.png",
  "./apps/chromosome-set/",
  "./apps/molecular-bio/"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("bio-ct-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match("./")))
  );
});
