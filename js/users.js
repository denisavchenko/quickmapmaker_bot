// Массив пользователей системы
var users = [
    {
        username: "admin",
        password: "admin1",
        name: "Администратор",
        role: "admin",
        // Базовые стили, доступные всем пользователям
        baseStyles: ["sateline", "sateline_night","OSM", "ria", "yandex_maps", "google_maps", "Dark_theme", "White_theme"],
        // Дополнительные стили, доступные только этому пользователю
        additionalStyles: ["RIK_facts", "RIK_prime", "RIK_news", "RIK_azia", "RIK_vopros", "RIK_gortex", "RIK_stop", "RIK_m24"]
    },
    {
        username: "ElijahPMap",
        password: "ks7HO4zgV8fafl61ek25siLal",
        name: "Илья Попов",
        role: "user",
        // Базовые стили, доступные всем пользователям
        baseStyles: ["sateline", "sateline_night","OSM", "ria", "yandex_maps", "google_maps", "Dark_theme", "White_theme"],
        // Дополнительные стили, доступные только этому пользователю
        additionalStyles: ["RIK_facts", "RIK_prime", "RIK_news", "RIK_azia", "RIK_vopros", "RIK_gortex", "RIK_stop", "RIK_m24"]
    },
    {
        username: "Coozeevan",
        password: "5Nsn7rHAa2kfEikx7ZDxLfuaO",
        name: "Артём Шатров",
        role: "user",
        // Базовые стили, доступные всем пользователям
        baseStyles: ["sateline", "sateline_night","OSM", "ria", "yandex_maps", "google_maps", "Dark_theme", "White_theme"],
        // Дополнительные стили, доступные только этому пользователю
        additionalStyles: ["RIK_facts", "RIK_prime", "RIK_news", "RIK_azia", "RIK_vopros", "RIK_gortex", "RIK_stop", "RIK_m24"]
    },
    {
        username: "akirisha",
        password: "v2n7IbEcyMdmU10nW1tvt3nPL",
        name: "Ира",
        role: "user",
        // Базовые стили, доступные всем пользователям
        baseStyles: ["sateline", "sateline_night","OSM", "ria", "yandex_maps", "google_maps", "Dark_theme", "White_theme"],
        // Дополнительные стили, доступные только этому пользователю
        additionalStyles: ["RIK_facts", "RIK_prime", "RIK_news", "RIK_azia", "RIK_vopros", "RIK_gortex", "RIK_stop", "RIK_m24"]
    },
    {
        username: "RIK-mapper",
        password: "nE9SIKiuTj7XJojijbfen9Egp",
        name: "Обычный пользователь",
        role: "user",
        // Базовые стили, доступные всем пользователям
        baseStyles: ["sateline", "sateline_night","OSM", "ria", "yandex_maps", "google_maps", "Dark_theme", "White_theme"],
        // Дополнительные стили, доступные только этому пользователю
        additionalStyles: ["RIK_facts", "RIK_prime", "RIK_news", "RIK_azia", "RIK_vopros", "RIK_gortex", "RIK_stop"]
    },
    {
        username: "MSK-mapper",
        password: "mAg8vkSCquYKGMFYNrh9lIDoB",
        name: "Обычный пользователь",
        role: "user",
        // Базовые стили, доступные всем пользователям
        baseStyles: ["sateline", "sateline_night","OSM", "ria", "yandex_maps", "google_maps", "Dark_theme", "White_theme"],
        // Дополнительные стили, доступные только этому пользователю
        additionalStyles: ["RIK_m24"]
    }
];

// Функция для проверки учетных данных пользователя
function authenticateUser(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
}

// Функция для получения доступных стилей для пользователя
function getUserStyles(username) {
    const user = users.find(u => u.username === username);
    if (!user) return [];
    
    // Объединяем базовые и дополнительные стили
    return [...user.baseStyles, ...user.additionalStyles];
}

// Функция для проверки, доступен ли стиль пользователю
function isStyleAvailableForUser(username, style) {
    const userStyles = getUserStyles(username);
    return userStyles.includes(style);
}

// Функция для проверки учетных данных
function authenticateUser(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
}

// Функция для сохранения данных авторизованного пользователя
function saveAuthenticatedUser(user) {
    const userData = {
        id: user.id,
        username: user.username,
        name: user.name,
        isAuthenticated: true
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
}

// Функция для получения текущего пользователя
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Функция для выхода из аккаунта
function logoutUser() {
    localStorage.removeItem('currentUser');
}

// Функция для проверки авторизации
function isAuthenticated() {
    return getCurrentUser() !== null;
}
