// Переменная для хранения скопированного стиля
var copiedStyle = null;

// Функция для добавления объекта в список дизайна
function addObjectToDesignList(obj) {
    const designList = document.getElementById('design-list');
    const designEmpty = document.getElementById('design-empty');
    
    if (designList && designEmpty) {
        designEmpty.style.display = 'none';
        
        const designItem = document.createElement('div');
        designItem.className = 'design-item';
        designItem.dataset.id = obj.id;
        
        let objectType = 'неизвестно';
        if (obj.type === 'polygon') {
            objectType = 'полигон';
        } else if (obj.type === 'marker') {
            objectType = 'точка';
        }
        
        // Создаем цветовые коды в формате RGB
        const fillColor = obj.mapObject.options.fillColor || '#3366FF';
        const strokeColor = obj.mapObject.options.color || '#000000';
        const fillOpacity = obj.mapObject.options.fillOpacity || 0.3;
        const weight = obj.mapObject.options.weight || 2;
        
        // Заполняем элемент данными с новым дизайном
        designItem.innerHTML = `
            <div class="design-number">${obj.id}</div>
            <div class="design-name">${obj.name || 'Без названия'}</div>
            <div class="design-type">${objectType}</div>
            <div class="design-colors">
                <div class="color-section">
                    <span class="color-label">Заливка:</span>
                    <div class="color-preview fill-preview" style="background-color: ${fillColor}"></div>
                    <button class="color-value fill-value" title="Нажмите для выбора цвета">${fillColor}</button>
                    <input type="color" class="design-color-fill color-picker" value="${fillColor}">
                </div>
                <div class="color-section">
                    <span class="color-label">Обводка:</span>
                    <div class="color-preview stroke-preview" style="background-color: ${strokeColor}"></div>
                    <button class="color-value stroke-value" title="Нажмите для выбора цвета">${strokeColor}</button>
                    <input type="color" class="design-color-stroke color-picker" value="${strokeColor}">
                </div>
            </div>
            <div class="design-params">
                <div class="param-section">
                    <span class="param-label">Прозрачность:</span>
                    <input type="range" class="param-slider opacity-slider" min="0" max="1" step="0.1" value="${fillOpacity}">
                    <span class="param-value opacity-value">${Math.round(fillOpacity * 100)}%</span>
                </div>
                <div class="param-section">
                    <span class="param-label">Толщина:</span>
                    <input type="range" class="param-slider weight-slider" min="1" max="10" step="1" value="${weight}">
                    <span class="param-value weight-value">${weight}px</span>
                </div>
            </div>
            <div class="design-actions">
                <button class="design-copy" title="Копировать стиль">Копировать стиль</button>
                <button class="design-paste" title="Вставить стиль" ${copiedStyle ? '' : 'disabled'}>Вставить стиль</button>
            </div>

        `;
        
        // Добавляем обработчики для выбора цвета
        const fillPreview = designItem.querySelector('.fill-preview');
        const strokePreview = designItem.querySelector('.stroke-preview');
        const fillValue = designItem.querySelector('.fill-value');
        const strokeValue = designItem.querySelector('.stroke-value');
        const fillPicker = designItem.querySelector('.design-color-fill');
        const strokePicker = designItem.querySelector('.design-color-stroke');
        
        // Обработчики для слайдеров
        const opacitySlider = designItem.querySelector('.opacity-slider');
        const opacityValue = designItem.querySelector('.opacity-value');
        const weightSlider = designItem.querySelector('.weight-slider');
        const weightValue = designItem.querySelector('.weight-value');
        
        // Обработчик для заливки
        fillValue.addEventListener('click', function() {
            fillPicker.click();
        });
        
        fillPicker.addEventListener('change', function() {
            const newColor = this.value;
            fillPreview.style.backgroundColor = newColor;
            fillValue.textContent = newColor;
            if (obj.mapObject) {
                obj.mapObject.setStyle({
                    fillColor: newColor,
                    fillOpacity: parseFloat(opacitySlider.value)
                });
                
                // Сохраняем цвет заливки в объект
                obj.fillColor = newColor;
                
                // Сохраняем объекты в localStorage
                MapStorage.saveObjects(mapObjects);
            }
        });
        
        // Обработчик для обводки
        strokeValue.addEventListener('click', function() {
            strokePicker.click();
        });
        
        strokePicker.addEventListener('change', function() {
            const newColor = this.value;
            strokePreview.style.backgroundColor = newColor;
            strokeValue.textContent = newColor;
            if (obj.mapObject) {
                obj.mapObject.setStyle({
                    color: newColor,
                    weight: parseInt(weightSlider.value)
                });
                
                // Сохраняем цвет обводки в объект
                obj.strokeColor = newColor;
                
                // Сохраняем объекты в localStorage
                MapStorage.saveObjects(mapObjects);
            }
        });
        
        // Обработчик для прозрачности
        opacitySlider.addEventListener('input', function() {
            const newOpacity = parseFloat(this.value);
            opacityValue.textContent = Math.round(newOpacity * 100) + '%';
            
            if (obj.mapObject) {
                obj.mapObject.setStyle({
                    fillOpacity: newOpacity
                });
                
                // Сохраняем прозрачность в объект
                obj.fillOpacity = newOpacity;
                
                // Сохраняем объекты в localStorage
                MapStorage.saveObjects(mapObjects);
            }
        });
        
        // Обработчик для толщины
        weightSlider.addEventListener('input', function() {
            const newWeight = parseInt(this.value);
            weightValue.textContent = newWeight + 'px';
            
            if (obj.mapObject) {
                obj.mapObject.setStyle({
                    weight: newWeight
                });
                
                // Сохраняем толщину в объект
                obj.weight = newWeight;
                
                // Сохраняем объекты в localStorage
                MapStorage.saveObjects(mapObjects);
            }
        });
        
        // Добавляем обработчики для кнопок копирования и вставки стиля
        const copyButton = designItem.querySelector('.design-copy');
        const pasteButton = designItem.querySelector('.design-paste');
        
        copyButton.addEventListener('click', function() {
            // Копируем стиль текущего объекта
            copiedStyle = {
                fillColor: obj.mapObject.options.fillColor || '#3366FF',
                strokeColor: obj.mapObject.options.color || '#000000',
                fillOpacity: obj.mapObject.options.fillOpacity || 0.3,
                weight: obj.mapObject.options.weight || 2
            };
            
            // Активируем все кнопки вставки
            document.querySelectorAll('.design-paste').forEach(btn => {
                btn.removeAttribute('disabled');
            });
            
            // Показываем уведомление
            showNotification('Стиль скопирован');
        });
        
        pasteButton.addEventListener('click', function() {
            if (copiedStyle) {
                // Применяем скопированный стиль к текущему объекту
                if (obj.mapObject) {
                    obj.mapObject.setStyle({
                        fillColor: copiedStyle.fillColor,
                        color: copiedStyle.strokeColor,
                        fillOpacity: copiedStyle.fillOpacity,
                        weight: copiedStyle.weight
                    });
                    
                    // Обновляем значения в интерфейсе
                    fillPreview.style.backgroundColor = copiedStyle.fillColor;
                    fillValue.textContent = copiedStyle.fillColor;
                    fillPicker.value = copiedStyle.fillColor;
                    
                    strokePreview.style.backgroundColor = copiedStyle.strokeColor;
                    strokeValue.textContent = copiedStyle.strokeColor;
                    strokePicker.value = copiedStyle.strokeColor;
                    
                    opacitySlider.value = copiedStyle.fillOpacity;
                    opacityValue.textContent = Math.round(copiedStyle.fillOpacity * 100) + '%';
                    
                    weightSlider.value = copiedStyle.weight;
                    weightValue.textContent = copiedStyle.weight + 'px';
                    
                    // Сохраняем значения в объект
                    obj.fillColor = copiedStyle.fillColor;
                    obj.strokeColor = copiedStyle.strokeColor;
                    obj.fillOpacity = copiedStyle.fillOpacity;
                    obj.weight = copiedStyle.weight;
                    
                    // Сохраняем объекты в localStorage
                    MapStorage.saveObjects(mapObjects);
                    
                    // Показываем уведомление
                    showNotification('Стиль применен');
                }
            }
        });
        
        // Удаляем или комментируем обработчик для кнопки удаления
        /*
        const removeButton = designItem.querySelector('.design-remove');
        removeButton.addEventListener('click', function() {
            // Удаляем объект из списка
            designItem.remove();
            
            // Удаляем объект с карты
            if (obj.mapObject) {
                map.removeLayer(obj.mapObject);
            }
            
            // Удаляем объект из массива
            const index = mapObjects.findIndex(item => item.id === obj.id);
            if (index !== -1) {
                mapObjects.splice(index, 1);
            }
            
            // Сохраняем объекты в localStorage
            MapStorage.saveObjects(mapObjects);
            
            // Если список пуст, показываем сообщение
            if (mapObjects.length === 0) {
                designEmpty.style.display = 'block';
            }
        });
        */
        
        // Добавляем элемент в список
        designList.appendChild(designItem);
    }
}

// Функция для выбора объекта для редактирования
function selectObjectForDesign(objectId) {
    const designList = document.getElementById('design-list');
    const designEmpty = document.getElementById('design-empty');
    
    if (designList) {
        // Очищаем текущий список дизайна
        designList.innerHTML = '';
        
        if (designEmpty) {
            designList.appendChild(designEmpty);
        }
        
        // Находим выбранный объект
        const selectedObject = mapObjects.find(obj => String(obj.id) === String(objectId));
        
        if (selectedObject) {
            // Скрываем сообщение о пустом списке
            if (designEmpty) {
                designEmpty.style.display = 'none';
            }
            // Добавляем объект в список дизайна
            addObjectToDesignList(selectedObject);
        } else {
            // Показываем сообщение о пустом списке
            if (designEmpty) {
                designEmpty.style.display = 'block';
            }
        }
    }
}

// Добавляем обработчик клика для объектов в списке
function initializeObjectSelection() {
    const objectsList = document.getElementById('objects-list');
    if (objectsList) {
        objectsList.addEventListener('click', function(e) {
            const objectItem = e.target.closest('.object-item');
            if (objectItem) {
                const objectId = objectItem.dataset.id;
                if (objectId) {
                    // Подсвечиваем выбранный объект
                    document.querySelectorAll('.object-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    objectItem.classList.add('selected');
                    
                    // Обновляем список дизайна
                    selectObjectForDesign(objectId);
                }
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeObjectSelection();
    
    // Инициализация карты с поддержкой Mapbox GL
    if (typeof map === 'undefined') {
        map = L.map('map', {
            zoomControl: false,
            attributionControl: false
        }).setView([55.7558, 37.6173], 10);

        // Добавляем базовый слой Mapbox GL
        var gl = L.mapboxGL({
            accessToken: 'pk.eyJ1IjoiZGVuaXNhdmNoZW5rbyIsImEiOiJjbTJkcW9haXgxZ3ZsMmpyMnJvNWtiajk0In0.9VQSet50FTEZ0qMkQCMcsQ',
            style: 'mapbox://styles/denisavchenko/cmal312n1000w01s5cpxgdczt',
            attribution: '© Mapbox'
        }).addTo(map);
    }
});

// Функция для изменения стиля карты
function changeMapStyle(style) {
    if (map) {
        // Удаляем текущий слой
        map.eachLayer(function(layer) {
            map.removeLayer(layer);
        });

        // Добавляем новый слой в зависимости от типа
        if (mapStyles[style]) {
            if (mapStyles[style].type === 'mapbox') {
                L.mapboxGL({
                    accessToken: mapStyles[style].accessToken,
                    style: mapStyles[style].style,
                    attribution: '© Mapbox'
                }).addTo(map);
            } else {
                L.tileLayer(mapStyles[style].url, {
                    attribution: mapStyles[style].attribution
                }).addTo(map);
            }
        }
    }
}

// Функция для отображения уведомления
function showNotification(message) {
    // Проверяем, существует ли уже уведомление
    let notification = document.getElementById('style-notification');
    
    if (!notification) {
        // Создаем элемент уведомления
        notification = document.createElement('div');
        notification.id = 'style-notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Устанавливаем текст и показываем уведомление
    notification.textContent = message;
    notification.classList.add('show');
    
    // Скрываем уведомление через 2 секунды
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Добавляем обработчик для кнопки сохранения карты
document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-map');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Проверяем, доступна ли функция из main.js
            if (typeof saveMapAsImage === 'function') {
                saveMapAsImage();
            } else {
                // Если функция недоступна, реализуем её здесь
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
                })
                .catch(function(error) {
                    console.error('Ошибка при сохранении карты:', error);
                    
                    // Восстанавливаем текст кнопки
                    saveButton.textContent = 'сохранить карту';
                    
                    // Показываем сообщение об ошибке
                    alert('Произошла ошибка при сохранении карты');
                });
            }
        });
    }
});