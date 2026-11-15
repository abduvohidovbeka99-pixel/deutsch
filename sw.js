// Wortweg service worker: офлайн-режим и автообновление.
const VERSION = '10cd979c7d';
const CORE = 'wortweg-core-' + VERSION;
const FONTS = 'wortweg-fonts-v1';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CORE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('wortweg-core-') && k !== CORE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Страница: сначала сеть (чтобы получать обновления), без сети — из кэша.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CORE).then(c => c.put('index.html', copy)); return res; }).catch(() => caches.match('index.html')));
    return;
  }
  // Шрифты Google: из кэша, в фоне обновляем.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  // Свои файлы: из кэша, иначе сеть.
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
});
