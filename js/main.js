// Определение различных стилей карт
var mapStyles = {
    sateline: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        name: 'sateline',
        type: 'tile'
    },
    sateline_night: {
        url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/2012-01-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg',
        attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
        name: 'VIIRS Night 2012',
        type: 'tile',
        minZoom: 1,
        maxZoom: 8,
        bounds: [[-85.05112878, -180], [85.05112878, 180]]
    },
    Dark_theme: {
        url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        name: 'Dark_theme',
        type: 'tile',
    },
    White_theme: {
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        name: 'CartoDB Voyager (No Labels)',
        type: 'tile',
    },
    



    OSM: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        name: 'OSM',
        type: 'tile'
    },
    ria: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
        name: 'РИА',
        type: 'tile'
    },
    m24: {
        url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        name: 'М24',
        type: 'tile'
    },
    rbc: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        name: 'РБК',
        type: 'tile'
    },


    yandex_maps: {
        url: 'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=1&lang=ru_RU',
        attribution: '&copy; <a href="https://yandex.ru/maps">Яндекс Карты</a>',
        name: 'Yandex Maps 22',
        type: 'tile'
    },
    google_maps: {
        url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
        name: 'Google Maps',
        type: 'tile'
    },
    



    // Стили Mapbox
    RIK_facts: {
        url: 'https://api.mapbox.com/styles/v1/maps-emg/cmawjms4n006401s66qsofy1y/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFwcy1lbWciLCJhIjoiY203a3JpNXFuMDN6eTJqczZwZTU0cXJiZyJ9.SQldh9xV4GA5Nx7WbLrJBg',
        attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'RIK_facts',
        type: 'tile'
    },
    RIK_prime: {
        url: 'https://api.mapbox.com/styles/v1/maps-emg/cmawk9ruw006301paftd73cfl/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFwcy1lbWciLCJhIjoiY203a3JpNXFuMDN6eTJqczZwZTU0cXJiZyJ9.SQldh9xV4GA5Nx7WbLrJBg',
        attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'RIK_prime',
        type: 'tile'
    },
    RIK_news: {
        url: 'https://api.mapbox.com/styles/v1/maps-emg/cmawk026g006g01qx76kj2ghw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFwcy1lbWciLCJhIjoiY203a3JpNXFuMDN6eTJqczZwZTU0cXJiZyJ9.SQldh9xV4GA5Nx7WbLrJBg',
        attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'RIK_news',
        type: 'tile'
    },
    RIK_azia: {
        url: 'https://api.mapbox.com/styles/v1/maps-emg/cmawkfhj600w501s55v9w0cv6/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFwcy1lbWciLCJhIjoiY203a3JpNXFuMDN6eTJqczZwZTU0cXJiZyJ9.SQldh9xV4GA5Nx7WbLrJBg',
        attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'RIK_azia',
        type: 'tile'
    },
    RIK_vopros: {
        url: 'https://api.mapbox.com/styles/v1/maps-emg/cmawkkeqk005q01sdd71w3y36/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFwcy1lbWciLCJhIjoiY203a3JpNXFuMDN6eTJqczZwZTU0cXJiZyJ9.SQldh9xV4GA5Nx7WbLrJBg',
        attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'RIK_vopros',
        type: 'tile'
    },
    RIK_gortex: {
        url: 'https://api.mapbox.com/styles/v1/maps-emg/cmawkpj71005d01qx1crjci70/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFwcy1lbWciLCJhIjoiY203a3JpNXFuMDN6eTJqczZwZTU0cXJiZyJ9.SQldh9xV4GA5Nx7WbLrJBg',
        attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'RIK_gortex',
        type: 'tile'
    },
    RIK_stop: {
        url: 'https://api.mapbox.com/styles/v1/maps-emg/cmawkveu4005m01s95b3gdb3o/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFwcy1lbWciLCJhIjoiY203a3JpNXFuMDN6eTJqczZwZTU0cXJiZyJ9.SQldh9xV4GA5Nx7WbLrJBg',
        attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'RIK_stop',
        type: 'tile'
    },
    RIK_m24: {
        url: 'https://api.mapbox.com/styles/v1/maps-emg/cmawkznk600w601s543hmafc5/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFwcy1lbWciLCJhIjoiY203a3JpNXFuMDN6eTJqczZwZTU0cXJiZyJ9.SQldh9xV4GA5Nx7WbLrJBg',
        attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'RIK_m24',
        type: 'tile'
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

// Счетчик для уникальных идентификаторов объектов
var objectCounter = 1;

// Массив для хранения объектов карты
var mapObjects = [];

// Объект для работы с localStorage
var MapStorage = {
    // Сохранение объектов в localStorage
    saveObjects: function(objects) {
        // Создаем копию массива объектов без ссылок на объекты Leaflet
        const objectsToSave = objects.map(obj => {
            return {
                id: obj.id,
                name: obj.name,
                region: obj.region,
                type: obj.type,
                coordinates: obj.coordinates,
                fillColor: obj.fillColor || (obj.mapObject ? obj.mapObject.options.fillColor : '#3366FF'),
                strokeColor: obj.strokeColor || (obj.mapObject ? obj.mapObject.options.color : '#000000'),
                fillOpacity: obj.fillOpacity || (obj.mapObject ? obj.mapObject.options.fillOpacity : 0.3),
                weight: obj.weight || (obj.mapObject ? obj.mapObject.options.weight : 2)
            };
        });
        
        // Сохраняем в localStorage
        localStorage.setItem('map_objects', JSON.stringify(objectsToSave));
    },
    
    // Загрузка объектов из localStorage
    loadObjects: function() {
        const objectsJson = localStorage.getItem('map_objects');
        if (objectsJson) {
            return JSON.parse(objectsJson);
        }
        return [];
    },
    
    // Очистка объектов в localStorage
    clearObjects: function() {
        localStorage.removeItem('map_objects');
    }
};

// Инициализация карты без элементов управления
var map;
document.addEventListener('DOMContentLoaded', function() {
    map = L.map('map', {
        zoomControl: false,  // Убираем кнопки масштабирования
        attributionControl: false  // Убираем атрибуцию
    }).setView([55.7558, 37.6173], 10); // Москва по умолчанию
});

// Переменные для отслеживания активного режима рисования
var drawingMode = null;
var drawingPolygon = false;
var polygonPoints = [];
var tempPolygon = null;

// Загружаем объекты и настройки карты при инициализации страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли параметр load в URL
    const urlParams = new URLSearchParams(window.location.search);
    const loadMapId = urlParams.get('load');
    
    if (loadMapId) {
        // Загружаем карту из истории
        MapHistory.loadFromHistory(parseInt(loadMapId));
    } else {
        // Загружаем сохраненные настройки карты (независимо от наличия объектов)
        loadMapSettings();
        
        // Загружаем сохраненные объекты
        loadSavedObjects();
    }
    
    // Добавляем обработчики для кнопок инструментов
    setupToolButtons();
});

// Функция для настройки кнопок инструментов
function setupToolButtons() {
    // Настройка кнопок масштаба
    document.querySelectorAll('#scale-tools .tool-button[data-zoom]').forEach(btn => {
        btn.addEventListener('click', function() {
            const zoomLevel = parseInt(this.getAttribute('data-zoom'));
            changeMapZoom(zoomLevel);
        });
    });
    
    // Настройка кнопок дизайна с учетом прав пользователя
    const currentUser = getCurrentUser();
    document.querySelectorAll('#design-tools .tool-button[data-style]').forEach(btn => {
        const style = btn.getAttribute('data-style');
        const toolItem = btn.closest('.tool-item'); // Получаем родительский элемент tool-item
        
        // Если пользователь авторизован, проверяем доступность стиля
        if (currentUser) {
            // Получаем доступные стили пользователя
            const availableStyles = [...currentUser.baseStyles, ...currentUser.additionalStyles];
            
            // Если стиль недоступен, скрываем весь tool-item
            if (!availableStyles.includes(style)) {
                toolItem.style.display = 'none';
            } else {
                toolItem.style.display = 'block';
                btn.addEventListener('click', function() {
                    changeMapStyle(style);
                });
            }
        } else {
            // Если пользователь не авторизован, показываем только базовые стили
            const baseStyles = ["sateline", "sateline_night","OSM", "ria", "yandex_maps", "google_maps", "Dark_theme", "White_theme"]; // Базовые стили по умолчанию
            
            if (!baseStyles.includes(style)) {
                toolItem.style.display = 'none';
            } else {
                toolItem.style.display = 'block';
                btn.addEventListener('click', function() {
                    changeMapStyle(style);
                });
            }
        }
    });
    
    // Настройка кнопки полигонов
    const polygonButton = document.querySelector('.tools-container:not(#design-tools):not(#scale-tools) .tool-item:nth-child(1) .tool-button');
    if (polygonButton) {
        polygonButton.addEventListener('click', function() {
            toggleDrawingMode('polygon', this);
        });
    }
    
    // Настройка кнопки точек
    const markerButton = document.querySelector('.tools-container:not(#design-tools):not(#scale-tools) .tool-item:nth-child(2) .tool-button');
    if (markerButton) {
        markerButton.addEventListener('click', function() {
            toggleDrawingMode('marker', this);
        });
    }
    
    // Настройка кнопки очистки объектов
    const clearButton = document.getElementById('clear-objects');
    if (clearButton) {
        clearButton.addEventListener('click', clearAllObjects);
    }
    
    // Настройка кнопки сохранения карты
    const saveButton = document.getElementById('save-map');
    if (saveButton) {
        saveButton.addEventListener('click', saveMapAsImage);
    }
    
    // Добавляем обработчик для поля поиска
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
                                    addPolygonToMap(coordinates, displayName, regionName);
                                } else if (data[0].geojson.type === "MultiPolygon") {
                                    const multiCoordinates = data[0].geojson.coordinates.map(polygon => 
                                        polygon[0].map(coord => [parseFloat(coord[1]), parseFloat(coord[0])])
                                    );
                                    addPolygonToMap(multiCoordinates[0], displayName, regionName);
                                } else {
                                    // Если тип geojson не полигон, добавляем как маркер
                                    addMarkerToMap([lat, lon], displayName, regionName);
                                }
                            } else {
                                // Если нет geojson данных, добавляем как маркер
                                addMarkerToMap([lat, lon], displayName, regionName);
                            }
                        }
                        
                        // Центрируем карту на найденном объекте
                        map.setView([lat, lon], 10);
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
}

// Функция для переключения режима рисования
function toggleDrawingMode(mode, button) {
    // Если уже активен этот режим, отключаем его
    if (drawingMode === mode) {
        drawingMode = null;
        document.querySelectorAll('.tools-container .tool-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Если был активен режим рисования полигона, отменяем его
        if (mode === 'polygon' && drawingPolygon) {
            cancelPolygonDrawing();
        }
        
        // Возвращаем стандартный курсор
        document.getElementById('map').style.cursor = 'grab';
    } else {
        // Активируем выбранный режим
        drawingMode = mode;
        
        // Обновляем активную кнопку
        document.querySelectorAll('.tools-container .tool-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Меняем курсор в зависимости от режима
        if (mode === 'marker') {
            document.getElementById('map').style.cursor = 'crosshair';
        } else if (mode === 'polygon') {
            document.getElementById('map').style.cursor = 'crosshair';
            startPolygonDrawing();
        }
    }
}

// Функция для начала рисования полигона
function startPolygonDrawing() {
    drawingPolygon = true;
    polygonPoints = [];
    
    // Добавляем обработчик клика по карте
    map.on('click', onMapClickForPolygon);
}

// Функция для отмены рисования полигона
function cancelPolygonDrawing() {
    drawingPolygon = false;
    polygonPoints = [];
    
    // Удаляем временный полигон, если он есть
    if (tempPolygon) {
        map.removeLayer(tempPolygon);
        tempPolygon = null;
    }
    
    // Удаляем обработчик клика
    map.off('click', onMapClickForPolygon);
}

// Обработчик клика по карте для рисования полигона
function onMapClickForPolygon(e) {
    // Добавляем точку в массив
    polygonPoints.push([e.latlng.lat, e.latlng.lng]);
    
    // Если это первая точка, просто добавляем её
    if (polygonPoints.length === 1) {
        return;
    }
    
    // Если временный полигон уже существует, удаляем его
    if (tempPolygon) {
        map.removeLayer(tempPolygon);
    }
    
    // Создаем временный полигон
    tempPolygon = L.polygon(polygonPoints, {
        color: '#3366FF',
        fillColor: '#3366FF',
        fillOpacity: 0.3,
        weight: 2
    }).addTo(map);
    
    // Если у нас уже есть 3 или более точек, добавляем двойной клик для завершения
    if (polygonPoints.length >= 3 && !tempPolygon.hasEventListeners('dblclick')) {
        tempPolygon.on('dblclick', function() {
            // Создаем постоянный полигон
            const polygon = addPolygonToMap(polygonPoints);
            
            // Отменяем режим рисования
            cancelPolygonDrawing();
            
            // Отключаем режим рисования
            toggleDrawingMode('polygon', document.querySelector('.tool-button:has(.fi-rr-draw-square)'));
        });
    }
}

// Обработчик клика по карте
map.on('click', function(e) {
    if (drawingMode === 'marker') {
        // Добавляем маркер на карту
        addMarkerToMap([e.latlng.lat, e.latlng.lng]);
        
        // Отключаем режим рисования после добавления маркера
        toggleDrawingMode('marker', document.querySelector('.tool-button:has(.fi-rr-bullet)'));
    }
});

// Функция для загрузки сохраненных объектов
function loadSavedObjects() {
    const savedObjects = MapStorage.loadObjects();
    
    // Если есть сохраненные объекты, добавляем их на карту
    if (savedObjects && savedObjects.length > 0) {
        // Находим максимальный id среди сохраненных объектов
        let maxId = 0;
        savedObjects.forEach(obj => {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        });
        // Устанавливаем счетчик на следующее значение после максимального
        objectCounter = maxId + 1;
        
        // Очищаем список объектов перед добавлением новых
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
        }
        
        savedObjects.forEach(obj => {
            if (obj.type === 'marker') {
                // Для маркеров
                const coordinates = [obj.coordinates.lat, obj.coordinates.lng];
                addMarkerToMap(coordinates, obj.name, obj.region);
            } else if (obj.type === 'polygon') {
                // Для полигонов
                const polygon = L.polygon(obj.coordinates, {
                    color: obj.strokeColor || '#3366FF',
                    fillColor: obj.fillColor || '#3366FF',
                    fillOpacity: obj.fillOpacity || 0.3,
                    weight: obj.weight || 2
                }).addTo(map);
                
                // Создаем объект для хранения данных
                const newObj = {
                    id: obj.id || objectCounter++,
                    mapObject: polygon,
                    name: obj.name || 'Полигон',
                    region: obj.region || 'Регион',
                    type: 'polygon',
                    coordinates: obj.coordinates,
                    fillColor: obj.fillColor,
                    strokeColor: obj.strokeColor,
                    fillOpacity: obj.fillOpacity,
                    weight: obj.weight
                };
                
                // Добавляем объект в массив
                mapObjects.push(newObj);
                
                // Добавляем в список объектов
                const objectItem = document.createElement('div');
                objectItem.className = 'object-item';
                objectItem.dataset.id = newObj.id;
                
                objectItem.innerHTML = `
                    <div class="object-number">${newObj.id}</div>
                    <div class="object-name">${newObj.name || 'Без названия'}</div>
                    <div class="object-region">${newObj.region || 'Не указан'}</div>
                    <div class="object-type">полигон</div>
                    <button class="object-remove">×</button>
                `;
                
                // Добавляем обработчик для кнопки удаления
                const removeButton = objectItem.querySelector('.object-remove');
                if (removeButton) {
                    removeButton.addEventListener('click', function() {
                        // Удаляем объект с карты
                        map.removeLayer(newObj.mapObject);
                        
                        // Удаляем объект из массива
                        const index = mapObjects.findIndex(item => item.id === newObj.id);
                        if (index !== -1) {
                            mapObjects.splice(index, 1);
                        }
                        
                        // Удаляем элемент из списка
                        objectsList.removeChild(objectItem);
                        
                        // Если список пуст, показываем сообщение
                        if (mapObjects.length === 0) {
                            if (objectsEmpty) {
                                objectsEmpty.style.display = 'block';
                            }
                        }
                        
                        // Сохраняем обновленный список объектов
                        MapStorage.saveObjects(mapObjects);
                    });
                }
                
                // Добавляем элемент в список
                if (objectsList) {
                    objectsList.appendChild(objectItem);
                    
                    // Скрываем сообщение о пустом списке
                    if (objectsEmpty) {
                        objectsEmpty.style.display = 'none';
                    }
                }
            }
        });
        
        // Показываем кнопку очистки, если есть объекты
        const clearButton = document.getElementById('clear-objects');
        if (clearButton && mapObjects.length > 0) {
            clearButton.style.display = 'block';
        }
    }
}

// Функция для загрузки настроек карты
function loadMapSettings() {
    const settingsJson = localStorage.getItem('map_settings');
    if (settingsJson) {
        const settings = JSON.parse(settingsJson);
        
        // Применяем стиль карты
        if (settings.style) {
            changeMapStyle(settings.style);
        }
        
        // Применяем зум и центр карты
        if (settings.zoom && settings.center) {
            map.setView([settings.center.lat, settings.center.lng], settings.zoom);
        }
    } else {
        // Если настроек нет, устанавливаем темную карту по умолчанию
        changeMapStyle('dark');
    }
}

// Функция для изменения стиля карты
function changeMapStyle(style) {
    // Если уже есть слой карты, удаляем его
    if (currentTileLayer) {
        map.removeLayer(currentTileLayer);
    }
    
    // Получаем настройки для выбранного стиля
    const styleConfig = mapStyles[style];
    
    if (styleConfig.type === 'mapbox') {
        // Создаем слой Mapbox GL
        currentTileLayer = L.mapboxGL({
            style: styleConfig.style,
            accessToken: styleConfig.accessToken,
            attribution: ''
        }).addTo(map);
    } else {
        // Для обычных тайловых слоев используем стандартный L.tileLayer
        currentTileLayer = L.tileLayer(styleConfig.url, {
            attribution: styleConfig.attribution || '',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
    }
    
    // Обновляем активную кнопку в разделе дизайна
    document.querySelectorAll('#design-tools .tool-button').forEach(btn => {
        if (btn.getAttribute('data-style') === style) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Сохраняем настройки карты в localStorage
    saveMapSettings();
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
    
    // Сохраняем настройки карты в localStorage
    saveMapSettings();
}

// Функция для сохранения настроек карты (стиль и зум)
function saveMapSettings() {
    // Определяем текущий стиль карты
    let currentStyle = 'dark'; // По умолчанию
    
    document.querySelectorAll('#design-tools .tool-button').forEach(btn => {
        if (btn.classList.contains('active') && btn.hasAttribute('data-style')) {
            currentStyle = btn.getAttribute('data-style');
        }
    });
    
    // Сохраняем настройки в localStorage
    const settings = {
        style: currentStyle,
        zoom: map.getZoom(),
        center: map.getCenter()
    };
    
    localStorage.setItem('map_settings', JSON.stringify(settings));
}

// Функция для добавления полигона на карту
function addPolygonToMap(coordinates, name, region, fillColor, strokeColor) {
    // Создаем полигон
    const polygon = L.polygon(coordinates, {
        color: strokeColor || '#3366FF',
        fillColor: fillColor || '#3366FF',
        fillOpacity: 0.3,
        weight: 2
    }).addTo(map);
    
    // Создаем объект для хранения данных
    const obj = {
        id: objectCounter++,
        mapObject: polygon,
        name: name || 'Полигон ' + objectCounter,
        region: region || 'Регион',
        type: 'polygon',
        coordinates: coordinates,
        fillColor: fillColor || '#3366FF',
        strokeColor: strokeColor || '#3366FF'
    };
    
    // Добавляем объект в массив
    mapObjects.push(obj);
    
    // Добавляем объект в список
    addObjectToList(obj);
    
    // Сохраняем объекты в localStorage
    MapStorage.saveObjects(mapObjects);
    
    return obj;
}

// Функция для добавления маркера на карту
function addMarkerToMap(coordinates, name, region) {
    // Создаем маркер
    const marker = L.marker(coordinates).addTo(map);
    
    // Создаем объект для хранения данных
    const obj = {
        id: objectCounter++,
        mapObject: marker,
        name: name || 'Точка ' + objectCounter,
        region: region || 'Регион',
        type: 'marker',
        coordinates: {
            lat: coordinates[0],
            lng: coordinates[1]
        }
    };
    
    // Добавляем объект в массив
    mapObjects.push(obj);
    
    // Добавляем объект в список
    addObjectToList(obj);
    
    // Сохраняем объекты в localStorage
    MapStorage.saveObjects(mapObjects);
    
    return obj;
}

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
                
                // Сохраняем обновленный список объектов
                MapStorage.saveObjects(mapObjects);
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

// Добавляем обработчики событий для автоматического сохранения настроек
map.on('zoomend', function() {
    saveMapSettings();
});

map.on('moveend', function() {
    saveMapSettings();
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

// Функция для получения текущего пользователя из localStorage
function getCurrentUser() {
    const userJson = localStorage.getItem('current_user');
    return userJson ? JSON.parse(userJson) : null;
}

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

// Функция для очистки всех объектов с карты
function clearAllObjects() {
    // Удаляем все объекты с карты
    mapObjects.forEach(obj => {
        map.removeLayer(obj.mapObject);
    });
    
    // Очищаем массив объектов
    mapObjects = [];
    
    // Очищаем список объектов
    const objectsList = document.getElementById('objects-list');
    const objectsEmpty = document.getElementById('objects-empty');
    
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
    
    // Скрываем кнопку очистки
    const clearButton = document.getElementById('clear-objects');
    if (clearButton) {
        clearButton.style.display = 'none';
    }
    
    // Очищаем объекты в localStorage
    MapStorage.clearObjects();
}

// Функция для сохранения карты как изображения
function saveMapAsImage() {
    // Проверяем, не выполняется ли уже сохранение
    const saveButton = document.getElementById('save-map');
    if (saveButton.getAttribute('data-saving') === 'true') {
        return; // Предотвращаем повторное выполнение
    }
    
    // Устанавливаем флаг, что сохранение в процессе
    saveButton.setAttribute('data-saving', 'true');
    
    // Показываем индикатор загрузки или сообщение
    saveButton.textContent = 'сохранение...';
    
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
        
        // Сбрасываем флаг сохранения
        saveButton.setAttribute('data-saving', 'false');
    })
    .catch(function(error) {
        console.error('Ошибка при сохранении карты:', error);
        
        // Восстанавливаем текст кнопки
        saveButton.textContent = 'сохранить карту';
        
        // Показываем сообщение об ошибке
        alert('Произошла ошибка при сохранении карты');
        
        // Сбрасываем флаг сохранения
        saveButton.setAttribute('data-saving', 'false');
    });
}

// Функция для получения границ региона из OpenStreetMap
function getRegionBoundary(regionName) {
    // Формируем запрос к Nominatim для поиска региона
    const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(regionName)}&limit=1&polygon_geojson=1`;
    
    // Выполняем запрос для поиска региона
    return fetch(searchUrl)
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
                    let coordinates;
                    
                    if (geoJsonData.type === 'Polygon') {
                        // Для простого полигона
                        coordinates = geoJsonData.coordinates[0].map(coord => [coord[1], coord[0]]);
                        return {
                            type: 'polygon',
                            coordinates: coordinates,
                            name: displayName,
                            region: regionName
                        };
                    } else if (geoJsonData.type === 'MultiPolygon') {
                        // Для мультиполигона
                        const multiCoordinates = geoJsonData.coordinates.map(poly => 
                            poly[0].map(coord => [coord[1], coord[0]])
                        );
                        return {
                            type: 'polygon',
                            coordinates: multiCoordinates[0],
                            name: displayName,
                            region: regionName
                        };
                    } else {
                        // Если тип не поддерживается, возвращаем данные для маркера
                        return {
                            type: 'marker',
                            coordinates: [lat, lon],
                            name: displayName,
                            region: regionName
                        };
                    }
                } else {
                    // Если GeoJSON данных нет, возвращаем данные для маркера
                    return {
                        type: 'marker',
                        coordinates: [lat, lon],
                        name: displayName,
                        region: regionName
                    };
                }
            }
            return null;
        })
        .catch(error => {
            console.error('Ошибка при получении границ региона:', error);
            return null;
        });
}

// Глобальная переменная для хранения текущего стиля карты
window.currentMapStyle = localStorage.getItem('map_style') || 'ria';

// Добавляем в функцию setupToolButtons или в DOMContentLoaded
document.querySelectorAll('.design-style-button, [data-style]').forEach(btn => {
    btn.addEventListener('click', function() {
        const style = this.getAttribute('data-style') || this.dataset.style;
        if (style) {
            window.currentMapStyle = style;
            localStorage.setItem('map_style', style);
            
            // Если мы на вкладке дизайн, сохраняем также в специальный ключ
            if (window.location.hash === '#design' || document.querySelector('.tab-content[data-tab="design"].active')) {
                localStorage.setItem('design_map_style', style);
            }
        }
    });
});

// Функция инициализации списка объектов
function initializeObjectsList() {
    try {
        // Получаем сохраненные объекты из localStorage
        const savedObjectsJson = localStorage.getItem('map_objects');
        if (savedObjectsJson) {
            const savedObjects = JSON.parse(savedObjectsJson);
            
            // Проверяем, что массив mapObjects существует
            if (typeof mapObjects === 'undefined') {
                window.mapObjects = [];
            }
            
            // Добавляем каждый объект на карту и в список
            savedObjects.forEach(obj => {
                if (obj.type === 'polygon' && obj.coordinates) {
                    // Создаем полигон
                    const polygon = L.polygon(obj.coordinates, {
                        color: obj.strokeColor || '#000000',
                        fillColor: obj.fillColor || '#3366FF',
                        fillOpacity: obj.fillOpacity || 0.3,
                        weight: obj.weight || 2
                    }).addTo(map);
                    
                    // Добавляем в массив объектов
                    mapObjects.push({
                        id: obj.id,
                        mapObject: polygon,
                        name: obj.name,
                        type: 'polygon',
                        coordinates: obj.coordinates,
                        fillColor: obj.fillColor,
                        strokeColor: obj.strokeColor,
                        fillOpacity: obj.fillOpacity,
                        weight: obj.weight
                    });
                    
                    // Добавляем в список на странице
                    addObjectToList(obj.id, obj.name, 'полигон');
                }
            });
            
            // Обновляем интерфейс
            updateObjectsVisibility();
        }
    } catch (e) {
        console.error('Ошибка при инициализации списка объектов:', e);
    }
}

// Вызываем функцию после загрузки карты
map.on('load', function() {
    initializeObjectsList();
});

function saveMapSettings() {
    if (map) {
        const currentZoom = map.getZoom();
        const currentCenter = map.getCenter();
        const currentStyle = getCurrentMapStyle();
        
        localStorage.setItem('map_zoom', currentZoom);
        localStorage.setItem('map_center_lat', currentCenter.lat);
        localStorage.setItem('map_center_lng', currentCenter.lng);
        localStorage.setItem('map_style', currentStyle);
        
        console.log('Сохранены настройки карты:', {
            zoom: currentZoom,
            center: currentCenter,
            style: currentStyle
        });
    }
}

// Функция для загрузки сохраненных настроек карты
function loadMapSettings() {
    try {
        // Получаем сохраненные настройки
        const savedZoom = localStorage.getItem('map_zoom');
        const savedCenterLat = localStorage.getItem('map_center_lat');
        const savedCenterLng = localStorage.getItem('map_center_lng');
        const savedStyle = localStorage.getItem('map_style');
        
        // Устанавливаем масштаб и центр, если они сохранены
        if (savedZoom && savedCenterLat && savedCenterLng) {
            map.setView([parseFloat(savedCenterLat), parseFloat(savedCenterLng)], parseInt(savedZoom));
            console.log('Восстановлены настройки карты:', {
                zoom: savedZoom,
                center: [savedCenterLat, savedCenterLng]
            });
        }
        
        // Устанавливаем стиль карты
        if (savedStyle && mapStyles[savedStyle]) {
            changeMapStyle(savedStyle);
        } else {
            // Если стиль не сохранен или недействителен, используем стиль по умолчанию
            const baseStyles = ["dark", "news", "ria"]; // Базовые стили по умолчанию
            changeMapStyle(baseStyles[0]);
        }
    } catch (e) {
        console.error('Ошибка при загрузке настроек карты:', e);
    }
}

// ... existing code ...

// Добавляем сохранение настроек карты при переходе на другую страницу
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Добавляем обработчик для сохранения настроек при клике на ссылки навигации
    document.querySelectorAll('a[href="design.html"], a[href="index.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Сохраняем текущие настройки карты перед переходом
            saveMapSettings();
        });
    });
    
    // Добавляем обработчик для сохранения настроек при закрытии страницы
    window.addEventListener('beforeunload', function() {
        saveMapSettings();
    });
});