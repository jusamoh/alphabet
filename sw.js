const CACHE_NAME = 'alphabet-practice-v1';
const CACHE_FILES = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/drawing.js',
    '/images/alphabet-guide.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(CACHE_FILES))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
}); 