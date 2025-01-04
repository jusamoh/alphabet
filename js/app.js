// Service Worker 등록
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/alphabet/sw.js')
        .then(registration => console.log('ServiceWorker registered'))
        .catch(err => console.log('ServiceWorker registration failed:', err));
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    const drawingApp = new DrawingApp();
    const clearBtn = document.getElementById('clearBtn');
    const letterSelect = document.getElementById('letterSelect');

    // 알파벳 옵션 추가
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const option = document.createElement('option');
        option.value = letter;
        option.textContent = letter;
        letterSelect.appendChild(option);
    }

    // Clear 버튼 이벤트
    clearBtn.addEventListener('click', () => drawingApp.clear());
}); 