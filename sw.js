const CACHE_NAME = 'alphabet-practice-v1';
const CACHE_FILES = [
    '/alphabet/',
    '/alphabet/index.html',
    '/alphabet/css/style.css',
    '/alphabet/js/app.js',
    '/alphabet/js/drawing.js',
    '/alphabet/images/alphabet-guide.png',
    '/alphabet/offline.html'
];

// 설치 단계: 초기 리소스 캐싱
self.addEventListener('install', event => {
    console.log('Service Worker 설치 시작');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('캐시 생성 성공');
                return cache.addAll(CACHE_FILES);
            })
            .catch(error => {
                console.error('캐시 생성 실패:', error);
            })
    );
    console.log('Service Worker 설치됨, 스코프:', self.registration.scope);
});

// 활성화 단계: 이전 캐시 정리
self.addEventListener('activate', event => {
    console.log('Service Worker 활성화됨');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 네트워크 요청 처리: Cache First 전략 + 오프라인 페이지 제공
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => caches.match('/alphabet/offline.html'));
        })
    );
});
