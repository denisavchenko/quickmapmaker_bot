// Объект для работы с историей карт
const MapHistory = {
    // Ключ для хранения истории в localStorage
    STORAGE_KEY: 'map_history',
    // Ключ для хранения выбранной карты
    SELECTED_MAP_KEY: 'selected_map',
    
    // Получение истории из localStorage
    getHistory: function() {
        const historyJSON = localStorage.getItem(this.STORAGE_KEY);
        return historyJSON ? JSON.parse(historyJSON) : [];
    },
    
    // Сохранение истории в localStorage
    saveHistory: function(history) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    },
    
    // Добавление новой карты в историю
    addToHistory: function(mapData) {
        const history = this.getHistory();
        
        // Создаем запись с текущей датой
        const historyEntry = {
            id: Date.now(), // Уникальный ID на основе времени
            date: new Date().toLocaleString('ru-RU'),
            mapData: mapData
        };
        
        // Добавляем в начало массива
        history.unshift(historyEntry);
        
        // Ограничиваем количество записей в истории (например, до 20)
        if (history.length > 20) {
            history.pop();
        }
        
        // Сохраняем обновленную историю
        this.saveHistory(history);
        
        return historyEntry;
    },
    
    // Удаление карты из истории
    removeFromHistory: function(id) {
        const history = this.getHistory();
        const updatedHistory = history.filter(entry => entry.id !== id);
        this.saveHistory(updatedHistory);
    },
    
    // Очистка всей истории
    clearHistory: function() {
        localStorage.removeItem(this.STORAGE_KEY);
    },
    
    // Сохранение выбранной карты для загрузки
    saveSelectedMap: function(entry) {
        localStorage.setItem(this.SELECTED_MAP_KEY, JSON.stringify(entry));
    },
    
    // Получение выбранной карты
    getSelectedMap: function() {
        const mapJSON = localStorage.getItem(this.SELECTED_MAP_KEY);
        return mapJSON ? JSON.parse(mapJSON) : null;
    },
    
    // Очистка выбранной карты
    clearSelectedMap: function() {
        localStorage.removeItem(this.SELECTED_MAP_KEY);
    }
};

// Функция для сохранения текущей карты в историю
function saveMapToHistory() {
    // Проверяем, определены ли необходимые переменные
    if (typeof map === 'undefined') {
        console.error("Переменная map не определена");
        alert("Ошибка: карта не инициализирована");
        return;
    }
    
    if (typeof mapObjects === 'undefined') {
        console.error("Переменная mapObjects не определена");
        alert("Ошибка: объекты карты не инициализированы");
        return;
    }
    
    // Получаем текущие данные карты
    const mapData = {
        center: map.getCenter(),
        zoom: map.getZoom(),
        baseLayer: getCurrentMapStyle(), // Используем функцию для получения текущего стиля
        objects: mapObjects.map(obj => {
            return {
                id: obj.id,
                name: obj.name || 'Объект',
                region: obj.region || '',
                type: obj.type || 'polygon',
                coordinates: obj.coordinates,
                fillColor: obj.fillColor || (obj.mapObject && obj.mapObject.options ? obj.mapObject.options.fillColor : '#3366FF'),
                strokeColor: obj.strokeColor || (obj.mapObject && obj.mapObject.options ? obj.mapObject.options.color : '#000000'),
                fillOpacity: obj.fillOpacity || (obj.mapObject && obj.mapObject.options ? obj.mapObject.options.fillOpacity : 0.3),
                weight: obj.weight || (obj.mapObject && obj.mapObject.options ? obj.mapObject.options.weight : 2)
            };
        })
    };
    
    // Добавляем в историю
    const entry = MapHistory.addToHistory(mapData);
    
    // Показываем уведомление
    alert('Карта сохранена в историю');
    
    return entry;
}

// Функция для отображения списка истории
function displayHistoryList() {
    const historyList = document.getElementById('history-list');
    const historyEmpty = document.getElementById('history-empty');
    const clearHistoryBtn = document.getElementById('clear-history');
    
    if (!historyList) return;
    
    // Получаем историю
    const history = MapHistory.getHistory();
    
    // Очищаем текущий список
    historyList.innerHTML = '';
    
    // Если история пуста, показываем сообщение
    if (history.length === 0) {
        historyList.appendChild(historyEmpty || document.createTextNode("У вас пока нет сохраненных карт"));
        if (clearHistoryBtn) clearHistoryBtn.style.display = 'none';
        return;
    }
    
    // Показываем кнопку очистки истории
    if (clearHistoryBtn) clearHistoryBtn.style.display = 'block';
    
    // Добавляем каждую запись в список
    history.forEach(entry => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.dataset.id = entry.id;
        
        const objectsCount = entry.mapData.objects.length;
        
        historyItem.innerHTML = `
            <div class="history-item-header">
                <div class="history-date">${entry.date}</div>
                <div class="history-objects-count">${objectsCount} объект(ов)</div>
            </div>
            <div class="history-actions">
                <button class="history-load">Загрузить карту</button>
                <button class="history-delete">Удалить</button>
            </div>
        `;
        
        // Добавляем обработчики событий
        const loadBtn = historyItem.querySelector('.history-load');
        const deleteBtn = historyItem.querySelector('.history-delete');
        
        loadBtn.addEventListener('click', () => {
            // Сохраняем выбранную карту и перенаправляем на страницу дизайна
            MapHistory.saveSelectedMap(entry);
            window.location.href = 'design.html';
        });
        
        deleteBtn.addEventListener('click', () => {
            MapHistory.removeFromHistory(entry.id);
            historyItem.remove();
            
            // Если список пуст, показываем сообщение
            if (MapHistory.getHistory().length === 0) {
                historyList.appendChild(historyEmpty || document.createTextNode("У вас пока нет сохраненных карт"));
                if (clearHistoryBtn) clearHistoryBtn.style.display = 'none';
            }
        });
        
        historyList.appendChild(historyItem);
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, находимся ли мы на странице истории
    if (window.location.pathname.includes('history.html')) {
        // Отображаем список истории
        displayHistoryList();
        
        // Добавляем обработчик для кнопки очистки истории
        const clearHistoryBtn = document.getElementById('clear-history');
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', function() {
                if (confirm('Вы уверены, что хотите очистить всю историю?')) {
                    MapHistory.clearHistory();
                    displayHistoryList();
                }
            });
        }
    }
    
    // Добавляем обработчик для кнопки сохранения в историю на странице дизайна
    const saveToHistoryBtn = document.getElementById('save-to-history');
    if (saveToHistoryBtn) {
        saveToHistoryBtn.addEventListener('click', function() {
            saveMapToHistory();
        });
    }
    
    // Проверяем, находимся ли мы на странице дизайна и есть ли выбранная карта
    if (window.location.pathname.includes('design.html')) {
        // Проверяем, есть ли выбранная карта для загрузки
        const selectedMap = MapHistory.getSelectedMap();
        if (selectedMap) {
            // Ждем инициализации карты
            setTimeout(function() {
                if (typeof map !== 'undefined' && typeof mapObjects !== 'undefined') {
                    loadMapFromHistory(selectedMap);
                    // Очищаем выбранную карту после загрузки
                    MapHistory.clearSelectedMap();
                }
            }, 1000); // Даем время для инициализации карты
        }
    }
});

// Функция для загрузки карты из истории
function loadMapFromHistory(historyEntry) {
    if (!historyEntry || !historyEntry.mapData) {
        alert('Ошибка: некорректные данные карты');
        return;
    }
    
    const mapData = historyEntry.mapData;
    
    if (typeof map === 'undefined') {
        alert('Ошибка: карта не инициализирована. Пожалуйста, обновите страницу.');
        return;
    }
    
    // Устанавливаем центр и масштаб
    map.setView([mapData.center.lat, mapData.center.lng], mapData.zoom);
    
    // Устанавливаем базовый слой
    if (mapData.baseLayer && typeof setBaseLayer === 'function') {
        // Устанавливаем текущий слой
        window.currentBaseLayer = mapData.baseLayer;
        
        // Даем небольшую задержку для полной инициализации карты
        setTimeout(() => {
            // Вызываем функцию смены стиля карты
            if (typeof changeMapStyle === 'function') {
                changeMapStyle(mapData.baseLayer);
            } else {
                setBaseLayer(mapData.baseLayer);
            }
        }, 100);
    }
    
    window.mapStyles = mapData.mapStyles || {}; // Восстанавливаем mapStyles
    
    // Очищаем текущие объекты
    if (typeof clearMapObjects === 'function') {
        clearMapObjects();
    } else {
        // Если функция не определена, очищаем объекты вручную
        mapObjects.forEach(obj => {
            if (obj.mapObject) {
                map.removeLayer(obj.mapObject);
            }
        });
        mapObjects = [];
    }
    
    // Добавляем объекты из истории
    mapData.objects.forEach(obj => {
        const newObj = {
            id: obj.id,
            name: obj.name,
            region: obj.region,
            type: obj.type,
            coordinates: obj.coordinates,
            fillColor: obj.fillColor,
            strokeColor: obj.strokeColor,
            fillOpacity: obj.fillOpacity,
            weight: obj.weight
        };
        
        // Создаем объект на карте
        if (obj.type === 'polygon') {
            newObj.mapObject = L.polygon(obj.coordinates, {
                fillColor: obj.fillColor,
                color: obj.strokeColor,
                fillOpacity: obj.fillOpacity,
                weight: obj.weight
            }).addTo(map);
        } else if (obj.type === 'marker') {
            newObj.mapObject = L.marker(obj.coordinates).addTo(map);
        }
        
        // Добавляем в массив объектов
        mapObjects.push(newObj);
        
        // Добавляем объект в панель дизайна
        if (typeof addObjectToDesignList === 'function') {
            addObjectToDesignList(newObj);
        }
        
        // Добавляем объект в список объектов
        if (typeof addObjectToList === 'function') {
            addObjectToList(newObj);
        }
    });
    
    // Обновляем оба списка
    if (typeof updateObjectsList === 'function') {
        updateObjectsList();
    }
    
    if (typeof updateDesignList === 'function') {
        updateDesignList();
    }
    
    // Показываем уведомление
    alert('Карта загружена из истории');
}

// Функция для очистки всех объектов с карты
function clearMapObjects() {
    console.log("Функция clearMapObjects вызвана");
    
    // Проверяем, существует ли переменная mapObjects
    if (typeof mapObjects !== 'undefined') {
        // Удаляем все объекты с карты
        mapObjects.forEach(obj => {
            if (obj.mapObject && typeof map !== 'undefined') {
                map.removeLayer(obj.mapObject);
            }
        });
        
        // Очищаем массив объектов
        mapObjects = [];
        
        // Обновляем список объектов
        if (typeof updateObjectsList === 'function') {
            updateObjectsList();
        }
    } else {
        console.error("Переменная mapObjects не определена");
    }
}

// Добавляем отладочную информацию при загрузке скрипта
console.log("Скрипт history.js загружен");

// Добавляем новую функцию для получения текущего стиля карты
function getCurrentMapStyle() {
    const activeStyleButton = document.querySelector('#design-tools .tool-button[data-style].active');
    return activeStyleButton ? activeStyleButton.getAttribute('data-style') : 'default';
}