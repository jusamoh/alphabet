avascript
// 파일명: main.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('Service Worker 등록 성공:', registration.scope);
    }).catch(error => {
      console.log('Service Worker 등록 실패:', error);
    });
  });
}
