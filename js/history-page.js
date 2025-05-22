// Функция для отображения списка сохраненных карт
function displayHistoryList() {
    const historyList = document.getElementById('history-list');
    const historyEmpty = document.getElementById('history-empty');
    
    // Получаем историю карт
    const history = MapHistory.getHistory();
    
    console.log('История карт:', history); // Отладочная информация
    
    // Если история пуста, показываем сообщение
    if (!history || history.length === 0) {
        if (historyEmpty) {
            historyEmpty.style.display = 'block';
        }
        return;
    }
    
    // Скрываем сообщение о пустой истории
    if (historyEmpty) {
        historyEmpty.style.display = 'none';
    }
    
    // Очищаем список
    historyList.innerHTML = '';
    
    // Добавляем каждую карту в список
    history.forEach(mapData => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.dataset.id = mapData.id;
        
        // Создаем заголовок с названием и датой
        const header = document.createElement('div');
        header.className = 'history-header';
        
        const name = document.createElement('div');
        name.className = 'history-name';
        name.textContent = mapData.name || 'Карта без названия';
        
        const date = document.createElement('div');
        date.className = 'history-date';
        date.textContent = mapData.date || new Date().toLocaleString('ru');
        
        header.appendChild(name);
        header.appendChild(date);
        
        // Создаем информацию о карте
        const info = document.createElement('div');
        info.className = 'history-info';
        
        const style = document.createElement('div');
        const styleName = (mapData.style && window.mapStyles && window.mapStyles[mapData.style]) 
            ? window.mapStyles[mapData.style].name 
            : mapData.style || 'Стандартный';
        style.textContent = `Стиль: ${styleName}`;
        
        const objects = document.createElement('div');
        objects.textContent = `Объектов: ${mapData.objects ? mapData.objects.length : 0}`;
        
        info.appendChild(style);
        info.appendChild(objects);
        
        // Создаем кнопки действий
        const actions = document.createElement('div');
        actions.className = 'history-actions';
        
        const loadButton = document.createElement('button');
        loadButton.className = 'history-load';
        loadButton.textContent = 'Загрузить';
        loadButton.addEventListener('click', function() {
            window.location.href = 'index.html?load=' + mapData.id;
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'history-delete';
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите удалить эту карту из истории?')) {
                MapHistory.removeFromHistory(mapData.id);
                displayHistoryList(); // Обновляем список
            }
        });
        
        actions.appendChild(loadButton);
        actions.appendChild(deleteButton);
        
        // Добавляем все элементы в карточку
        historyItem.appendChild(header);
        historyItem.appendChild(info);
        historyItem.appendChild(actions);
        
        // Добавляем карточку в список
        historyList.appendChild(historyItem);
    });
}

// Инициализация страницы истории
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, доступен ли объект MapHistory
    if (typeof MapHistory === 'undefined') {
        console.error('Объект MapHistory не найден!');
        
        // Создаем временный объект для отображения истории
        window.MapHistory = {
            getHistory: function() {
                const historyJson = localStorage.getItem('map_history');
                if (historyJson) {
                    try {
                        return JSON.parse(historyJson);
                    } catch (e) {
                        console.error('Ошибка при разборе JSON истории:', e);
                        return [];
                    }
                }
                return [];
            },
            removeFromHistory: function(mapId) {
                let history = this.getHistory();
                history = history.filter(item => item.id !== mapId);
                localStorage.setItem('map_history', JSON.stringify(history));
            }
        };
    }
    
    // Проверяем, доступен ли объект mapStyles
    if (typeof mapStyles === 'undefined') {
        window.mapStyles = {
            ria: { name: 'РИА' },
            dark: { name: 'Темная' },
            OSM: { name: 'OSM' },
            m24: { name: 'М24' },
            rbc: { name: 'РБК' },
            yandex_maps: { name: 'Yandex Maps' },
            google_maps: { name: 'Google' }, 
            sateline: { name: 'Спутник' },
            sateline_night: { name: 'Спутник ночной' },
            Dark_theme: { name: 'Тёмная тема' },
            White_theme: { name: 'Светлая тема' },
            RIK_facts: { name: 'Факты' },
            RIK_prime: { name: 'Прайм' },
            RIK_news: { name: 'Новости' },
            RIK_azia: { name: 'Азия' },
            RIK_vopros: { name: 'Вопрос Науки' },
            RIK_gortex: { name: 'Гортех' },
            RIK_stop: { name: 'Стопфейк' },
            RIK_m24: { name: 'Москва 24' },



        };
    }
    
    displayHistoryList();
});