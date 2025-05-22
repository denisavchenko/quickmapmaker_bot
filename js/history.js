// Функция для получения текущего стиля карты
function getCurrentMapStyle() {
    let currentStyle = 'ria'; // По умолчанию
    
    try {
        // Проверяем, есть ли глобальная переменная с текущим стилем
        if (typeof currentMapStyle !== 'undefined' && currentMapStyle) {
            console.log('Определен стиль из глобальной переменной:', currentMapStyle);
            return currentMapStyle;
        }
        
        // Проверяем, на какой вкладке мы находимся
        const isDesignTab = window.location.hash === '#design' || 
                           document.querySelector('.tab-content[data-tab="design"].active') !== null ||
                           document.getElementById('design-tab')?.classList.contains('active') ||
                           document.querySelector('.design-panel') !== null;
        
        console.log('Находимся на вкладке дизайн:', isDesignTab);
        
        // Если мы на вкладке дизайн, проверяем специальные элементы дизайна
        if (isDesignTab) {
            // Проверяем все кнопки стиля на странице
            const allButtons = document.querySelectorAll('button, .button, [role="button"]');
            for (let btn of allButtons) {
                if (btn.classList.contains('active') && (btn.getAttribute('data-style') || btn.dataset.style)) {
                    currentStyle = btn.getAttribute('data-style') || btn.dataset.style;
                    console.log('Определен стиль из активной кнопки на вкладке дизайн:', currentStyle);
                    return currentStyle;
                }
            }
            
            // Проверяем все элементы с классом, содержащим "style" и "active"
            const styleElements = document.querySelectorAll('[class*="style"][class*="active"]');
            for (let el of styleElements) {
                if (el.getAttribute('data-style') || el.dataset.style) {
                    currentStyle = el.getAttribute('data-style') || el.dataset.style;
                    console.log('Определен стиль из элемента с классом style и active:', currentStyle);
                    return currentStyle;
                }
            }
            
            // Проверяем выбранный стиль в выпадающем списке (если есть)
            const styleSelect = document.querySelector('select[name="map-style"], #style-select, select[id*="style"]');
            if (styleSelect) {
                currentStyle = styleSelect.value;
                console.log('Определен стиль из выпадающего списка:', currentStyle);
                return currentStyle;
            }
            
            // Проверяем глобальную переменную designSettings
            if (typeof designSettings !== 'undefined' && designSettings.style) {
                currentStyle = designSettings.style;
                console.log('Определен стиль из designSettings:', currentStyle);
                return currentStyle;
            }
            
            // Проверяем localStorage для вкладки дизайн
            const designStyle = localStorage.getItem('design_map_style');
            if (designStyle) {
                console.log('Определен стиль из localStorage для дизайна:', designStyle);
                return designStyle;
            }
            
            // Если мы на вкладке дизайн, но не нашли стиль, используем стиль с главной вкладки
            const mainStyle = localStorage.getItem('map_style');
            if (mainStyle) {
                console.log('Используем стиль с главной вкладки:', mainStyle);
                return mainStyle;
            }
        }
        
        // 1. Проверяем в дизайн-инструментах
        const designToolsButton = document.querySelector('#design-tools .tool-button.active[data-style]');
        if (designToolsButton) {
            currentStyle = designToolsButton.getAttribute('data-style');
            console.log('Определен стиль из design-tools:', currentStyle);
            // Сохраняем найденный стиль в localStorage для использования на вкладке дизайн
            localStorage.setItem('map_style', currentStyle);
            return currentStyle;
        }
        
        // 2. Проверяем все кнопки с атрибутом data-style
        const allStyleButtons = document.querySelectorAll('[data-style]');
        for (let btn of allStyleButtons) {
            if (btn.classList.contains('active')) {
                currentStyle = btn.getAttribute('data-style');
                console.log('Определен стиль из активной кнопки:', currentStyle);
                // Сохраняем найденный стиль в localStorage для использования на вкладке дизайн
                localStorage.setItem('map_style', currentStyle);
                return currentStyle;
            }
        }
        
        // 3. Проверяем URL параметры
        const urlParams = new URLSearchParams(window.location.search);
        const styleParam = urlParams.get('style');
        if (styleParam) {
            console.log('Определен стиль из URL:', styleParam);
            return styleParam;
        }
        
        // 4. Проверяем localStorage
        const savedStyle = localStorage.getItem('map_style');
        if (savedStyle) {
            console.log('Определен стиль из localStorage:', savedStyle);
            return savedStyle;
        }
        
        // Если ничего не нашли, возвращаем значение по умолчанию
        console.log('Не удалось определить стиль, используем значение по умолчанию:', currentStyle);
        return currentStyle;
    } catch (e) {
        console.error('Ошибка при определении стиля карты:', e);
        return currentStyle;
    }
}

// Объект для работы с историей карт
var MapHistory = {
    // Максимальное количество карт в истории
    MAX_HISTORY_LENGTH: 20,
    
    // Максимальное количество объектов на карте для сохранения
    MAX_OBJECTS_PER_MAP: 40,
    
    // Сохранение текущей карты в историю
    saveToHistory: function() {
        try {
            // Проверяем доступность объекта map
            if (typeof map === 'undefined') {
                console.error('Объект map не определен');
                alert('Ошибка: карта не инициализирована');
                return;
            }
            
            // Получаем текущие настройки карты
            const currentStyle = getCurrentMapStyle();
            const currentZoom = map.getZoom();
            const currentCenter = map.getCenter();
            
            // Проверяем доступность массива mapObjects
            if (typeof mapObjects === 'undefined' || !Array.isArray(mapObjects)) {
                console.error('Массив mapObjects не определен или не является массивом');
                
                // Создаем пустой массив объектов
                const mapData = {
                    id: Date.now(),
                    date: new Date().toLocaleString('ru'),
                    name: `Карта от ${new Date().toLocaleDateString('ru')}`,
                    style: currentStyle,
                    zoom: currentZoom,
                    center: {lat: currentCenter.lat, lng: currentCenter.lng},
                    objects: []
                };
                
                // Сохраняем карту без объектов
                this.saveMapData(mapData);
                return;
            }
            
            // Ограничиваем количество объектов для сохранения
            const objectsToProcess = mapObjects.slice(0, this.MAX_OBJECTS_PER_MAP);
            
            // Создаем копию массива объектов без ссылок на объекты Leaflet
            // и с минимальным набором данных
            const objectsToSave = objectsToProcess.map(obj => {
                try {
                    // Сохраняем координаты без упрощения, чтобы не потерять форму полигонов
                    let coordinatesToSave = [];
                    if (obj.coordinates) {
                        // Сохраняем координаты как есть, без упрощения
                        coordinatesToSave = obj.coordinates;
                    }
                    
                    return {
                        id: obj.id,
                        name: obj.name || 'Объект',
                        type: obj.type || 'polygon',
                        coordinates: coordinatesToSave,
                        fillColor: obj.fillColor || '#3366FF',
                        strokeColor: obj.strokeColor || '#000000',
                        fillOpacity: obj.fillOpacity || 0.3,
                        weight: obj.weight || 2,
                        // Добавляем сохранение прозрачности и толщины
                        opacity: obj.opacity || obj.fillOpacity || 0.3,
                        thickness: obj.thickness || obj.weight || 2
                    };
                } catch (e) {
                    console.error('Ошибка при обработке объекта:', e);
                    return {
                        id: obj.id || Date.now(),
                        name: obj.name || 'Объект',
                        type: obj.type || 'polygon',
                        coordinates: [],
                        fillOpacity: 0.3,
                        weight: 2
                    };
                }
            });
            
            // Создаем объект с данными карты
            const mapData = {
                id: Date.now(),
                date: new Date().toLocaleString('ru'),
                name: `Карта от ${new Date().toLocaleDateString('ru')}`,
                style: currentStyle,
                zoom: currentZoom,
                center: {lat: currentCenter.lat, lng: currentCenter.lng},
                objects: objectsToSave
            };
            
            // Сохраняем карту
            this.saveMapData(mapData);
            
        } catch (e) {
            console.error('Ошибка при сохранении карты в историю:', e);
            alert('Произошла ошибка при сохранении карты в историю');
        }
    },
    
    // Вспомогательная функция для сохранения данных карты
    saveMapData: function(mapData) {
        try {
            console.log('Сохраняем карту в историю:', mapData);
            
            // Получаем существующую историю
            let history = this.getHistory();
            
            // Добавляем новую карту в начало истории
            history.unshift(mapData);
            
            // Ограничиваем историю до MAX_HISTORY_LENGTH карт
            if (history.length > this.MAX_HISTORY_LENGTH) {
                history = history.slice(0, this.MAX_HISTORY_LENGTH);
            }
            
            // Пробуем сохранить историю
            try {
                // Сохраняем обновленную историю
                const historyJson = JSON.stringify(history);
                localStorage.setItem('map_history', historyJson);
                
                // Показываем уведомление
                alert('Карта сохранена в историю');
            } catch (storageError) {
                // Если произошла ошибка превышения квоты
                if (storageError.name === 'QuotaExceededError' || 
                    storageError.code === 22 || 
                    storageError.code === 1014) {
                    
                    console.error('Превышена квота localStorage. Пробуем сохранить меньше данных.');
                    
                    // Уменьшаем количество карт в истории
                    if (history.length > 1) {
                        history = history.slice(0, 1); // Оставляем только текущую карту
                        
                        try {
                            localStorage.setItem('map_history', JSON.stringify(history));
                            alert('Карта сохранена в историю. Предыдущие карты удалены из-за ограничения памяти.');
                        } catch (e) {
                            // Если и это не помогло, очищаем историю и сохраняем только текущую карту
                            // с минимальным набором данных
                            try {
                                const minimalMapData = {
                                    id: mapData.id,
                                    date: mapData.date,
                                    name: mapData.name,
                                    style: mapData.style,
                                    zoom: mapData.zoom,
                                    center: mapData.center,
                                    objects: [] // Без объектов
                                };
                                
                                localStorage.setItem('map_history', JSON.stringify([minimalMapData]));
                                alert('Карта сохранена в историю без объектов из-за ограничения памяти.');
                            } catch (finalError) {
                                // Если и это не помогло, очищаем всю историю
                                localStorage.removeItem('map_history');
                                alert('Не удалось сохранить карту в историю из-за ограничения памяти браузера.');
                            }
                        }
                    } else {
                        alert('Не удалось сохранить карту в историю из-за ограничения памяти браузера.');
                    }
                } else {
                    // Другая ошибка
                    console.error('Ошибка при сохранении данных карты:', storageError);
                    alert('Произошла ошибка при сохранении данных карты');
                }
            }
        } catch (e) {
            console.error('Ошибка при сохранении данных карты:', e);
            alert('Произошла ошибка при сохранении данных карты');
        }
    },
    
    // Получение истории карт
    getHistory: function() {
        try {
            const historyJson = localStorage.getItem('map_history');
            if (historyJson) {
                return JSON.parse(historyJson);
            }
        } catch (e) {
            console.error('Ошибка при получении истории карт:', e);
        }
        return [];
    },
    
    // Загрузка карты из истории
    loadFromHistory: function(mapId) {
        try {
            const history = this.getHistory();
            const mapData = history.find(item => item.id === parseInt(mapId));
            
            if (!mapData) {
                console.error('Карта не найдена в истории');
                alert('Карта не найдена в истории');
                return false;
            }
            
            console.log('Загружаем карту из истории:', mapData);
            
            // Проверяем, что объект map существует
            if (typeof map === 'undefined') {
                console.error('Объект map не определен');
                alert('Ошибка: карта не инициализирована');
                return false;
            }
            
            // Очищаем текущие объекты
            try {
                if (typeof clearAllObjects === 'function') {
                    clearAllObjects(); // Вызываем функцию очистки объектов
                } else {
                    console.warn('Функция clearAllObjects не найдена, очищаем карту вручную');
                    // Очищаем карту вручную
                    if (typeof mapObjects !== 'undefined' && Array.isArray(mapObjects)) {
                        // Если есть массив объектов, удаляем каждый объект с карты
                        mapObjects.forEach(obj => {
                            if (obj.mapObject && typeof map.removeLayer === 'function') {
                                map.removeLayer(obj.mapObject);
                            }
                        });
                        // Очищаем массив объектов
                        mapObjects.length = 0;
                    }
                    
                    // Удаляем все слои с карты, кроме базового слоя
                    if (typeof map.eachLayer === 'function') {
                        map.eachLayer(function(layer) {
                            // Проверяем, что это не базовый слой (тайлы карты)
                            if (!(layer instanceof L.TileLayer)) {
                                map.removeLayer(layer);
                            }
                        });
                    }
                    
                    // Очищаем список объектов в интерфейсе
                    const objectsList = document.getElementById('objects-list');
                    const objectsEmpty = document.getElementById('objects-empty');
                    
                    if (objectsList) {
                        // Удаляем все элементы списка, кроме сообщения о пустом списке
                        while (objectsList.firstChild) {
                            if (objectsList.firstChild.id === 'objects-empty') {
                                break;
                            }
                            objectsList.removeChild(objectsList.firstChild);
                        }
                        
                        // Показываем сообщение о пустом списке
                        if (objectsEmpty) {
                            objectsEmpty.style.display = 'block';
                        }
                    }
                }
            } catch (clearError) {
                console.error('Ошибка при очистке карты:', clearError);
            }
            
            // Устанавливаем стиль карты
            try {
                if (typeof changeMapStyle === 'function') {
                    changeMapStyle(mapData.style);
                } else {
                    console.warn('Функция changeMapStyle не найдена');
                    // Пробуем изменить стиль карты вручную
                    const styleButtons = document.querySelectorAll('[data-style]');
                    for (let btn of styleButtons) {
                        if (btn.getAttribute('data-style') === mapData.style) {
                            btn.click(); // Имитируем клик по кнопке стиля
                            break;
                        }
                    }
                }
            } catch (styleError) {
                console.error('Ошибка при изменении стиля карты:', styleError);
            }
            
            // Устанавливаем центр и масштаб
            try {
                if (mapData.center && mapData.zoom) {
                    map.setView([mapData.center.lat, mapData.center.lng], mapData.zoom);
                }
            } catch (viewError) {
                console.error('Ошибка при установке центра и масштаба карты:', viewError);
            }
            
            // Создаем временный массив объектов, если он не существует
            if (typeof mapObjects === 'undefined' || !Array.isArray(mapObjects)) {
                console.warn('Массив mapObjects не определен, создаем временный массив');
                window.mapObjects = [];
            }
            
            // Сбрасываем счетчик объектов, чтобы избежать конфликтов ID
            objectCounter = 1;
            
            // Находим максимальный ID среди объектов истории
            if (mapData.objects && mapData.objects.length > 0) {
                const maxId = Math.max(...mapData.objects.map(obj => obj.id || 0));
                objectCounter = maxId + 1;
            }
            
            // Добавляем объекты
            let addedObjects = 0;
            if (mapData.objects && mapData.objects.length > 0) {
                console.log('Добавляем объекты на карту:', mapData.objects.length);
                
                mapData.objects.forEach(obj => {
                    try {
                        // Для полигонов
                        if (obj.type === 'polygon' && obj.coordinates && obj.coordinates.length > 0) {
                            const polygon = L.polygon(obj.coordinates, {
                                color: obj.strokeColor || '#000000',
                                fillColor: obj.fillColor || '#3366FF',
                                fillOpacity: obj.fillOpacity || obj.opacity || 0.3,
                                weight: obj.weight || obj.thickness || 2
                            }).addTo(map);
                            
                            // Добавляем объект в массив mapObjects с оригинальным ID
                            mapObjects.push({
                                id: obj.id,
                                mapObject: polygon,
                                name: obj.name,
                                type: 'polygon',
                                coordinates: obj.coordinates,
                                fillColor: obj.fillColor,
                                strokeColor: obj.strokeColor,
                                fillOpacity: obj.fillOpacity || obj.opacity || 0.3,
                                weight: obj.weight || obj.thickness || 2
                            });
                            
                            // Добавляем объект в список интерфейса
                            addObjectToList({
                                id: obj.id,
                                mapObject: polygon,
                                name: obj.name,
                                region: obj.region || 'Регион',
                                type: 'polygon',
                                coordinates: obj.coordinates
                            });
                            
                            addedObjects++;
                        }
                        else if (obj.type === 'marker' && obj.coordinates) {
                            console.log('Добавляем маркер:', obj);
                            
                            if (typeof addMarkerToMap === 'function') {
                                // Используем существующую функцию
                                addMarkerToMap(obj.coordinates, obj.name, obj.region);
                                addedObjects++;
                            } else {
                                console.warn('Функция addMarkerToMap не найдена, добавляем маркер напрямую');
                                
                                // Добавляем маркер напрямую
                                const marker = L.marker(obj.coordinates).addTo(map);
                                if (obj.name) {
                                    marker.bindTooltip(obj.name);
                                }
                                
                                const markerObj = {
                                    id: obj.id,
                                    name: obj.name,
                                    region: obj.region,
                                    type: 'marker',
                                    coordinates: obj.coordinates,
                                    mapObject: marker
                                };
                                
                                mapObjects.push(markerObj);
                                
                                // Добавляем объект в список интерфейса
                                addObjectToList(markerObj);
                                
                                addedObjects++;
                            }
                        }
                    } catch (objError) {
                        console.error('Ошибка при добавлении объекта из истории:', objError, obj);
                    }
                });
                
                // Сохраняем объекты в localStorage после загрузки из истории
                try {
                    console.log('Сохраняем объекты в localStorage:', mapObjects);
                    
                    // Преобразуем объекты для сохранения
                    const objectsToSave = mapObjects.map(obj => ({
                        id: obj.id,
                        name: obj.name,
                        type: obj.type,
                        coordinates: obj.coordinates,
                        fillColor: obj.fillColor,
                        strokeColor: obj.strokeColor,
                        fillOpacity: obj.fillOpacity,
                        weight: obj.weight,
                        region: obj.region
                    }));
                    
                    // Сохраняем объекты
                    localStorage.setItem('map_objects', JSON.stringify(objectsToSave));
                    
                    // Дополнительно сохраняем счетчик объектов
                    if (typeof objectCounter !== 'undefined') {
                        localStorage.setItem('object_counter', objectCounter.toString());
                    }
                    
                    // Обновляем интерфейс
                    if (typeof updateObjectsList === 'function') {
                        updateObjectsList();
                    }
                    
                    // Если мы на странице дизайна, обновляем список объектов для дизайна
                    const isDesignPage = window.location.pathname.includes('design.html');
                    if (isDesignPage && typeof updateDesignObjectsList === 'function') {
                        updateDesignObjectsList();
                    }
                    
                    console.log('Объекты успешно сохранены в localStorage');
                } catch (saveError) {
                    console.error('Ошибка при сохранении объектов в localStorage:', saveError);
                }
            }
            
            // Показываем уведомление
            alert(`Карта загружена из истории. Добавлено объектов: ${addedObjects}`);
            
            return true;
        } catch (e) {
            console.error('Ошибка при загрузке карты из истории:', e);
            alert('Произошла ошибка при загрузке карты из истории');
            return false;
        }
    },
    
    // Удаление карты из истории
    removeFromHistory: function(mapId) {
        let history = this.getHistory();
        history = history.filter(item => item.id !== parseInt(mapId));
        localStorage.setItem('map_history', JSON.stringify(history));
    }
};

// Добавляем обработчик для кнопки "сохранить в историю"
document.addEventListener('DOMContentLoaded', function() {
    const saveHistoryButton = document.getElementById('save-history');
    if (saveHistoryButton) {
        // Проверяем, был ли уже добавлен обработчик
        if (!saveHistoryButton.hasAttribute('data-event-attached')) {
            saveHistoryButton.addEventListener('click', function() {
                MapHistory.saveToHistory();
            });
            // Отмечаем, что обработчик уже добавлен
            saveHistoryButton.setAttribute('data-event-attached', 'true');
        }
    } else {
        console.error('Кнопка "сохранить в историю" не найдена');
    }
});