// Определение различных стилей карт
var mapStyles = {
    dark: {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        name: 'Тёмная карта'
    },
    news: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        name: 'Новости'
    },
    ria: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
        name: 'РИА'
    },
    m24: {
        url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        name: 'М24'
    },
    rbc: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        name: 'РБК'
    }
};

// Определение масштабов для разных уровней
var zoomLevels = {
    country: 3,    // Страна
    region: 6,     // Регион
    city: 10,      // Город
    street: 15     // Улица
};

// Текущий слой карты
var currentTileLayer = null;

// Инициализация карты без элементов управления
var map = L.map('map', {
    zoomControl: false,  // Убираем кнопки масштабирования
    attributionControl: false  // Убираем атрибуцию
}).setView([55.7558, 37.6173], 10); // Москва по умолчанию

// Функция для изменения стиля карты
function changeMapStyle(style) {
    // Если уже есть слой карты, удаляем его
    if (currentTileLayer) {
        map.removeLayer(currentTileLayer);
    }
    
    // Получаем настройки для выбранного стиля
    var styleConfig = mapStyles[style];
    
    // Создаем новый слой карты
    currentTileLayer = L.tileLayer(styleConfig.url, {
        attribution: '',  // Убираем атрибуцию
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    
    // Обновляем активную кнопку в разделе дизайна
    document.querySelectorAll('#design-tools .tool-button').forEach(btn => {
        if (btn.getAttribute('data-style') === style) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Функция для изменения масштаба карты
function changeMapZoom(zoomLevel) {
    // Изменяем масштаб карты
    map.setZoom(zoomLevel);
    
    // Обновляем активную кнопку в разделе масштаба
    document.querySelectorAll('#scale-tools .tool-button').forEach(btn => {
        if (btn.hasAttribute('data-zoom') && parseInt(btn.getAttribute('data-zoom')) === zoomLevel) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Устанавливаем темную карту по умолчанию
changeMapStyle('dark');

// Обработчики событий для кнопок инструментов (Полигоны, Точки и т.д.)
document.querySelectorAll('.tools-container:not(#design-tools):not(#scale-tools) .tool-button').forEach(button => {
    button.addEventListener('click', function() {
        // Удаляем класс active у всех кнопок в той же группе
        const container = this.closest('.tools-container');
        container.querySelectorAll('.tool-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Добавляем класс active к нажатой кнопке
        this.classList.add('active');
    });
});

// Обработчики событий для кнопок дизайна
document.querySelectorAll('#design-tools .tool-button').forEach(button => {
    button.addEventListener('click', function() {
        // Получаем стиль карты из атрибута data-style
        const style = this.getAttribute('data-style');
        
        // Если стиль определен, меняем стиль карты
        if (style) {
            changeMapStyle(style);
        }
    });
});

// Обработчики событий для кнопок масштаба
document.querySelectorAll('#scale-tools .tool-button').forEach(button => {
    button.addEventListener('click', function() {
        // Получаем уровень масштаба из атрибута data-zoom
        const zoomLevel = this.getAttribute('data-zoom');
        
        // Если уровень масштаба определен, меняем масштаб карты
        if (zoomLevel) {
            changeMapZoom(parseInt(zoomLevel));
        }
    });
});

// Добавляем обработчик для поискового поля
document.querySelector('.search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const query = this.value;
        
        // Определяем, какой инструмент выбран (полигоны или точки)
        const polygonButton = document.querySelector('.tools-container:not(#design-tools):not(#scale-tools) .tool-item:nth-child(1) .tool-button');
        const markerButton = document.querySelector('.tools-container:not(#design-tools):not(#scale-tools) .tool-item:nth-child(2) .tool-button');
        
        // Проверяем, активна ли кнопка точек
        const isMarkerActive = markerButton && markerButton.classList.contains('active');
        
        fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&polygon_geojson=1&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    const displayName = data[0].display_name;
                    
                    const addressDetails = data[0].address || {};
                    const regionName = addressDetails.state || addressDetails.county || addressDetails.city || addressDetails.town || addressDetails.village || 'Неизвестно';
                    
                    // Если выбран инструмент "Точки", добавляем маркер
                    if (isMarkerActive) {
                        addMarkerToMap([lat, lon], displayName, regionName);
                    } 
                    // Иначе добавляем полигон (по умолчанию)
                    else {
                        if (data[0].geojson) {
                            if (data[0].geojson.type === "Polygon") {
                                // Преобразуем координаты для Leaflet (lat, lon)
                                const coordinates = data[0].geojson.coordinates[0].map(coord => [parseFloat(coord[1]), parseFloat(coord[0])]);
                                addPolygonToMap([coordinates], displayName, regionName);
                            } else if (data[0].geojson.type === "MultiPolygon") {
                                const multiCoordinates = data[0].geojson.coordinates.map(polygon =>
                                    polygon[0].map(coord => [parseFloat(coord[1]), parseFloat(coord[0])])
                                );
                                addPolygonToMap(multiCoordinates, displayName, regionName);
                            } else {
                                // Если тип geojson не полигон, добавляем как маркер
                                addMarkerToMap([lat, lon], displayName, regionName);
                            }
                        } else {
                            // Если нет geojson данных, добавляем как маркер
                            addMarkerToMap([lat, lon], displayName, regionName);
                        }
                    }
                } else {
                    alert('Адрес не найден');
                }
            })
            .catch(error => {
                console.error('Ошибка при геокодировании:', error);
                alert('Произошла ошибка при поиске адреса');
            });
    }
});

// Функция для получения границ региона из OpenStreetMap
function getRegionBoundary(regionName) {
    // Формируем запрос к Nominatim для поиска региона
    const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(regionName)}&limit=1&polygon_geojson=1`;
    
    // Выполняем запрос для поиска региона
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                // Получаем данные о регионе
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                const displayName = data[0].display_name;
                
                // Проверяем, есть ли GeoJSON данные
                if (data[0].geojson) {
                    // Создаем полигон из GeoJSON данных
                    const geoJsonData = data[0].geojson;
                    let polygon;
                    
                    if (geoJsonData.type === 'Polygon') {
                        // Для простого полигона
                        const coordinates = geoJsonData.coordinates[0].map(coord => [coord[1], coord[0]]);
                        polygon = L.polygon(coordinates, {color: '#3366FF', fillOpacity: 0.3}).addTo(map);
                    } else if (geoJsonData.type === 'MultiPolygon') {
                        // Для мультиполигона
                        const multiCoordinates = geoJsonData.coordinates.map(poly => 
                            poly[0].map(coord => [coord[1], coord[0]])
                        );
                        polygon = L.polygon(multiCoordinates, {color: '#3366FF', fillOpacity: 0.3}).addTo(map);
                    } else {
                        // Если тип не поддерживается, создаем маркер
                        polygon = L.marker([lat, lon]).addTo(map);
                    }
                    
                    // Центрируем карту на полигоне
                    if (polygon) {
                        map.fitBounds(polygon.getBounds());
                        
                        // Добавляем объект в список
                        // addObjectToList(regionName, displayName, 'полигон', polygon); // Старый неверный вызов
                        addPolygonToMap(multiCoordinates, displayName, regionName); // Исправленный вызов
                    }
                } else {
                    // Если GeoJSON данных нет, создаем маркер
                    const marker = L.marker([lat, lon]).addTo(map);
                    map.setView([lat, lon], 8);
                    
                    // Добавляем объект в список
                    // addObjectToList(regionName, displayName, 'точка', marker); // Старый неверный вызов
                    addMarkerToMap([lat, lon], displayName, regionName); // Исправленный вызов
                }
            } else {
                alert('Регион не найден');
            }
        })
        .catch(error => {
            console.error('Ошибка при поиске региона:', error);
            alert('Произошла ошибка при поиске региона');
        });
}

// Функция для геокодирования адреса через OpenStreetMap Nominatim
function geocodeAddress(address) {
    // Формируем URL для запроса к Nominatim API
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
    
    // Выполняем запрос
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Проверяем, есть ли результаты
            if (data && data.length > 0) {
                // Получаем координаты первого результата
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                
                // Перемещаем карту к найденным координатам
                map.setView([lat, lon], 12);
                
                // Добавляем маркер на карту
                const marker = L.marker([lat, lon]).addTo(map);
                
                // Создаем объект и добавляем его в список
                const obj = {
                    id: objectCounter++,
                    mapObject: marker,
                    name: display_name || 'Точка ' + objectCounter,
                    region: 'Регион',
                    type: 'marker'
                };
                
                // Добавляем объект в массив
                mapObjects.push(obj);
                
                // Добавляем объект в список
                addObjectToList(obj);
                
                // Центрируем карту на маркере
                map.setView([lat, lon], 10);
                
            } else {
                // Если результатов нет, выводим сообщение
                alert('Адрес не найден');
            }
        })
        .catch(error => {
            console.error('Ошибка при геокодировании:', error);
            alert('Произошла ошибка при поиске адреса');
        });
}

// Массив для хранения объектов на карте
var mapObjects = [];
var objectCounter = 1;

// Функция для добавления объекта в список
function addObjectToList(obj) {
    // Получаем список объектов
    const objectsList = document.getElementById('objects-list');
    const objectsEmpty = document.getElementById('objects-empty');
    
    if (objectsList && objectsEmpty) {
        // Скрываем сообщение о пустом списке
        objectsEmpty.style.display = 'none';
        
        // Создаем элемент для нового объекта
        const objectItem = document.createElement('div');
        objectItem.className = 'object-item';
        objectItem.dataset.id = obj.id;
        
        // Определяем тип объекта (полигон или точка)
        let objectType = 'неизвестно';
        if (obj.type === 'polygon') {
            objectType = 'полигон';
        } else if (obj.type === 'marker') {
            objectType = 'точка';
        } else if (obj.type === 'circle') {
            objectType = 'круг';
        }
        
        // Заполняем элемент данными
        objectItem.innerHTML = `
            <div class="object-number">${obj.id}</div>
            <div class="object-name">${obj.name || 'Без названия'}</div>
            <div class="object-region">${obj.region || 'Не указан'}</div>
            <div class="object-type">${objectType}</div>
            <button class="object-remove">×</button>
        `;
        
        // Добавляем обработчик для кнопки удаления
        const removeButton = objectItem.querySelector('.object-remove');
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                // Удаляем объект с карты
                map.removeLayer(obj.mapObject);
                
                // Удаляем объект из массива
                const index = mapObjects.findIndex(item => item.id === obj.id);
                if (index !== -1) {
                    mapObjects.splice(index, 1);
                }
                
                // Удаляем элемент из списка
                objectsList.removeChild(objectItem);
                
                // Если список пуст, показываем сообщение
                if (mapObjects.length === 0) {
                    objectsEmpty.style.display = 'block';
                    const clearButton = document.getElementById('clear-objects');
                    if (clearButton) {
                        clearButton.style.display = 'none';
                    }
                }
            });
        }
        
        // Добавляем элемент в список
        objectsList.appendChild(objectItem);
        
        // Показываем кнопку очистки данных
        const clearButton = document.getElementById('clear-objects');
        if (clearButton) {
            clearButton.style.display = 'block';
        }
    }
}

// Функция для добавления полигона на карту
function addPolygonToMap(coordinates, name, region) {
    // Создаем полигон
    const polygon = L.polygon(coordinates, {
        color: '#3366FF',
        fillColor: '#3366FF',
        fillOpacity: 0.3,
        weight: 2
    }).addTo(map);
    
    // Создаем объект для хранения данных
    const obj = {
        id: objectCounter++,
        mapObject: polygon,
        name: name || 'Полигон ' + objectCounter,
        region: region || 'Регион',
        type: 'polygon'
    };
    
    // Добавляем объект в массив
    mapObjects.push(obj);
    
    // Добавляем объект в список
    addObjectToList(obj);
    
    // Центрируем карту на полигоне
    map.fitBounds(polygon.getBounds());
    
    return obj;
}

// Функция для добавления точки на карту
function addMarkerToMap(coordinates, name, region) {
    // Создаем маркер
    const marker = L.marker(coordinates).addTo(map);
    
    // Создаем объект для хранения данных
    const obj = {
        id: objectCounter++,
        mapObject: marker,
        name: name || 'Точка ' + objectCounter,
        region: region || 'Регион',
        type: 'marker'
    };
    
    // Добавляем объект в массив
    mapObjects.push(obj);
    
    // Добавляем объект в список
    addObjectToList(obj);
    
    // Центрируем карту на маркере
    map.setView(coordinates, 10);
    
    return obj;
}

// Обработчик для кнопки очистки данных
const clearObjectsButton = document.getElementById('clear-objects');
if (clearObjectsButton) {
    clearObjectsButton.addEventListener('click', function() {
        // Удаляем все объекты с карты
        mapObjects.forEach(obj => {
            map.removeLayer(obj.mapObject);
        });
        
        // Очищаем массив объектов
        mapObjects = [];
        
        // Очищаем список объектов в интерфейсе
        const objectsList = document.getElementById('objects-list');
        const objectsEmpty = document.getElementById('objects-empty');
        
        if (objectsList && objectsEmpty) {
            // Удаляем все элементы, кроме сообщения о пустом списке
            const itemsToRemove = objectsList.querySelectorAll('.object-item');
            itemsToRemove.forEach(item => {
                objectsList.removeChild(item);
            });
            
            // Показываем сообщение о пустом списке
            objectsEmpty.style.display = 'block';
            
            // Скрываем кнопку очистки
            this.style.display = 'none';
            
            // Обновляем счетчик объектов
            objectCounter = 1;
        }
    });
}

// Обработчики для кнопок инструментов
const polygonButton = document.querySelector('.tools-container:not(#design-tools):not(#scale-tools) .tool-button:nth-child(1)');
const markerButton = document.querySelector('.tools-container:not(#design-tools):not(#scale-tools) .tool-button:nth-child(2)');

if (polygonButton) {
    polygonButton.addEventListener('click', function() {
        // Создаем полигон при клике на карту
        map.once('click', function(e) {
            // Создаем полигон вокруг точки клика
            const center = e.latlng;
            const radius = 0.01; // примерно 1 км
            
            // Создаем координаты для полигона (квадрат)
            const coordinates = [
                [center.lat + radius, center.lng - radius],
                [center.lat + radius, center.lng + radius],
                [center.lat - radius, center.lng + radius],
                [center.lat - radius, center.lng - radius]
            ];
            
            // Добавляем полигон на карту
            addPolygonToMap([coordinates], 'Полигон ' + objectCounter, 'Регион');
        });
    });
}

if (markerButton) {
    markerButton.addEventListener('click', function() {
        // Создаем точку при клике на карту
        map.once('click', function(e) {
            // Добавляем точку на карту
            addMarkerToMap([e.latlng.lat, e.latlng.lng], 'Точка ' + objectCounter, 'Регион');
        });
    });
}

// Обработчик для кнопки сохранения карты
const saveMapButton = document.getElementById('save-map');
if (saveMapButton) {
    saveMapButton.addEventListener('click', function() {
        // Показываем индикатор загрузки или сообщение
        this.textContent = 'сохранение...';
        const saveButton = this;
        
        // Получаем контейнер карты
        const mapContainer = document.querySelector('.map-container');
        
        // Используем dom-to-image для создания изображения
        domtoimage.toPng(mapContainer, {
            quality: 1,
            bgcolor: '#1A1A1A',
            filter: function(node) {
                // Убедимся, что все элементы карты включены
                return true;
            }
        })
        .then(function(dataUrl) {
            // Создаем ссылку для скачивания
            const link = document.createElement('a');
            
            // Устанавливаем атрибуты ссылки
            link.href = dataUrl;
            link.download = 'map_' + new Date().toISOString().slice(0, 10) + '.png';
            
            // Добавляем ссылку в документ (невидимую)
            document.body.appendChild(link);
            
            // Имитируем клик по ссылке для начала скачивания
            link.click();
            
            // Удаляем ссылку из документа
            document.body.removeChild(link);
            
            // Восстанавливаем текст кнопки
            saveButton.textContent = 'сохранить карту';
        })
        .catch(function(error) {
            console.error('Ошибка при сохранении карты:', error);
            
            // Восстанавливаем текст кнопки
            saveButton.textContent = 'сохранить карту';
            
            // Показываем сообщение об ошибке
            alert('Произошла ошибка при сохранении карты');
        });
    });
}