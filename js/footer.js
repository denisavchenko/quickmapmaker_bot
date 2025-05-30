document.addEventListener('DOMContentLoaded', function() {
    // Создаем футер напрямую
    const footerHTML = `
    <div class="footer">
        <a href="index.html" class="footer-button" id="home-button">
            <div class="footer-icon"><i class="fi fi-rr-home"></i></div>
            <span class="footer-text">Главная</span>
        </a>
        <a href="design.html" class="footer-button" id="design-button">
            <div class="footer-icon"><i class="fi fi-rr-brush"></i></div>
            <span class="footer-text">Дизайн</span>
        </a>
        <a href="history.html" class="footer-button" id="history-button">
            <div class="footer-icon"><i class="fi fi-rr-time-past"></i></div>
            <span class="footer-text">История</span>
        </a>
        <a href="account.html" class="footer-button" id="account-button">
            <div class="footer-icon"><i class="fi fi-rr-user"></i></div>
            <span class="footer-text">Аккаунт</span>
        </a>
    </div>
    `;
    
    // Вставляем футер в конец body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});

// Добавляем обработчик для кнопки истории
document.addEventListener('DOMContentLoaded', function() {
    const historyButton = document.getElementById('history-button');
    if (historyButton) {
        historyButton.href = 'history.html';
    }
});