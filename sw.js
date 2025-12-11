// sw.js
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// contoh menerima push (butuh backend untuk mengirim push)
self.addEventListener('push', event => {
  let data = { title: 'Pemberitahuan', body: 'Ada update tugas' };
  try {
    if (event.data) data = event.data.json();
  } catch(e) {}
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    data: data
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});