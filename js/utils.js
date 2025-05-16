// ... existing code ...

// Класс для работы с хранилищем (с поддержкой Telegram Mini Apps)
const MapStorage = {
    // Сохранение объектов
    saveObjects: function(objects) {
        // Проверяем, запущено ли приложение в Telegram
        if (window.Telegram && window.Telegram.WebApp) {
            // Используем Telegram Storage API
            const objectsData = JSON.stringify(objects.map(obj => {
                // Создаем копию объекта без mapObject (который нельзя сериализовать)
                const objCopy = { ...obj };
                delete objCopy.mapObject;
                return objCopy;
            }));
            
            window.Telegram.WebApp.CloudStorage.setItem('map_objects', objectsData);
        } else {
            // Используем обычный localStorage
            localStorage.setItem('map_objects', JSON.stringify(objects.map(obj => {
                const objCopy = { ...obj };
                delete objCopy.mapObject;
                return objCopy;
            })));
        }
    },
    
    // Загрузка объектов
    loadObjects: function() {
        let objectsData = null;
        
        // Проверяем, запущено ли приложение в Telegram
        if (window.Telegram && window.Telegram.WebApp) {
            // Используем Telegram Storage API
            objectsData = window.Telegram.WebApp.CloudStorage.getItem('map_objects');
        } else {
            // Используем обычный localStorage
            objectsData = localStorage.getItem('map_objects');
        }
        
        return objectsData ? JSON.parse(objectsData) : [];
    },
    
    // Сохранение настроек карты
    saveMapSettings: function(settings) {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.CloudStorage.setItem('map_settings', JSON.stringify(settings));
        } else {
            localStorage.setItem('map_settings', JSON.stringify(settings));
        }
    },
    
    // Загрузка настроек карты
    loadMapSettings: function() {
        let settingsData = null;
        
        if (window.Telegram && window.Telegram.WebApp) {
            settingsData = window.Telegram.WebApp.CloudStorage.getItem('map_settings');
        } else {
            settingsData = localStorage.getItem('map_settings');
        }
        
        return settingsData ? JSON.parse(settingsData) : null;
    }
};

// ... existing code ...