document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, авторизован ли пользователь
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        // Если пользователь авторизован, показываем информацию о нем
        showUserInfo(currentUser);
    } else {
        // Если пользователь не авторизован, показываем форму входа
        showLoginForm();
    }
    
    // Обработчик кнопки входа
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }
    
    // Обработчик кнопки выхода
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// Функция для получения текущего пользователя из localStorage
function getCurrentUser() {
    const userJson = localStorage.getItem('current_user');
    return userJson ? JSON.parse(userJson) : null;
}

// Функция для входа в систему
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Проверяем учетные данные
    const user = authenticateUser(username, password);
    
    if (user) {
        // Сохраняем информацию о пользователе в localStorage
        // Не сохраняем пароль в localStorage из соображений безопасности
        const userToSave = {
            username: user.username,
            name: user.name,
            role: user.role,
            baseStyles: user.baseStyles,
            additionalStyles: user.additionalStyles
        };
        
        localStorage.setItem('current_user', JSON.stringify(userToSave));
        
        // Показываем информацию о пользователе
        showUserInfo(userToSave);
        
        // Скрываем сообщение об ошибке
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    } else {
        // Показываем сообщение об ошибке
        if (errorMessage) {
            errorMessage.style.display = 'block';
        }
    }
}

// Функция для выхода из системы
function logout() {
    // Удаляем информацию о пользователе из localStorage
    localStorage.removeItem('current_user');
    
    // Показываем форму входа
    showLoginForm();
}

// Функция для отображения информации о пользователе
function showUserInfo(user) {
    const loginForm = document.getElementById('login-form');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    
    if (loginForm) {
        loginForm.style.display = 'none';
    }
    
    if (userInfo) {
        userInfo.style.display = 'block';
    }
    
    if (userName) {
        userName.textContent = user.name;
    }
}

// Функция для отображения формы входа
function showLoginForm() {
    const loginForm = document.getElementById('login-form');
    const userInfo = document.getElementById('user-info');
    
    if (loginForm) {
        loginForm.style.display = 'block';
    }
    
    if (userInfo) {
        userInfo.style.display = 'none';
    }
}