// Инициализация карты
    // Инициализация карты (делаем её глобальной)
window.map = L.map("map", {
  center: [7.5, 7.5],
  zoom: 4,
  minZoom: 4,
  maxZoom: 11,
  zoomControl: false,
  attributionControl: false
});

const map = window.map; // чтобы ниже в этом файле всё продолжало работать

    

    // Слои для разных типов элементов
    const layers = {
      zones: L.layerGroup(),
      zoneOutlines: L.layerGroup(),
      nodes: L.layerGroup(),
      nodeGlows: L.layerGroup(),
      subtopics: L.layerGroup(),
      connections: L.layerGroup(),
      labels: L.layerGroup()
    };

    // === Логика фильтрации ===

// Обновление видимости по фильтрам
function updateFilters() {
  const activeCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(el => el.value);
  const activeSubcategories = Array.from(document.querySelectorAll('.subcategory-filter:checked')).map(el => el.value);
  const showSubtopics = document.querySelector('.element-filter[value="subtopics"]').checked;
  const showConnections = document.querySelector('.element-filter[value="connections"]').checked;
  const showNodes = document.querySelector('.element-filter[value="nodes"]').checked;

  // Фильтрация зон
  layers.zones.eachLayer(layer => {
    const name = layer.getTooltip()?.getContent?.() || "";
    if (activeCategories.includes(name)) layer.addTo(map);
    else map.removeLayer(layer);
  });

  // Фильтрация узлов
  layers.nodes.eachLayer(marker => {
    const cat = Object.values(categoryColors).find(c => c === marker.options.fillColor);
    const categoryName = Object.keys(categoryColors).find(key => categoryColors[key] === cat);
    if (showNodes && activeCategories.includes(categoryName)) marker.addTo(map);
    else map.removeLayer(marker);
  });

  // Фильтрация подтем (если хочешь, можно добавить позже)
  if (!showSubtopics) map.removeLayer(layers.subtopics);
  else layers.subtopics.addTo(map);

  // Связи
  if (!showConnections) map.removeLayer(layers.connections);
  else layers.connections.addTo(map);
}

// Обновление при каждом клике по чекбоксам
document.querySelectorAll('.category-filter, .subcategory-filter, .element-filter')
  .forEach(el => el.addEventListener('change', updateFilters));

    // Добавляем все слои на карту
    Object.values(layers).forEach(layer => layer.addTo(map));

    // Цвета для категорий
    const categoryColors = {
      "Философия": "#6bc1ff",
      "Классическая физика": "#ff6b6b",
      "Квантовая физика": "#b96bff",
      "Теория относительности": "#6bff9a",
      "Будущее физики": "#ffd86b",
      "Пропасть незнания": "#1f3d2d"
    };

    
   

   const zones = [
    {
    name: "Пропасть незнания",
    color: "#1f3d2d",
    shape: [
        // Нижняя граница (соединение с Теорией относительности - изменено с ребристостью)
        [13.0, 0.0],
        [13.2, -0.15],  // Небольшая впадина
        [13.5, 0.05],   // Первый выступ
        [13.7, -0.1],   // Впадина
        [14.0, 0.2],    // Выступ
        [14.3, -0.05],  // Впадина
        [14.5, 0.15],   // Выступ
        [14.8, 0.0],    // Плавный переход
        [15.0, 0.25],   // Выступ
        [15.2, 0.1],    // Небольшая впадина
        [15.5, 0.4],    // Конечная точка соединения
        
        // Начало хаотичной ребристости (не затрагиваем соединения)
        [15.7, 0.45],  // Небольшой выступ
        [15.9, 0.6],
        [16.0, 0.8],
        [16.1, 0.95],  // Мини-пик
        [16.3, 1.05],
        [16.5, 1.2],
        [16.6, 1.05],  // Небольшой провал
        [16.8, 0.9],
        [17.0, 1.0],
        
        // Центральная хаотичная часть
        [17.0, 1.3],   // Ступенька
        [16.95, 1.55], // Легкий изгиб
        [17.0, 1.8],
        [16.92, 2.1],  // Выступ
        [16.98, 2.35],
        [17.0, 2.5],
        [16.88, 2.75], // Зубчик
        [16.95, 3.05],
        [17.0, 3.2],
        [16.85, 3.5],  // Глубокий провал
        [16.93, 3.7],
        [17.0, 3.8],
        [16.97, 3.95], // Мелкая неровность
        [17.0, 4.0],
        
        // Верхняя граница (соединение с Философией - ключевые точки сохранены!)
        [16.8, 4.3],   // Эта точка должна остаться точно такой же!
        [16.5, 4.6],   // И эта тоже!
        [16.5, 4.8],   // Добавляем неровность перед ключевой точкой
        [16.45, 4.95], // Небольшой выступ
        [16.5, 5.0],   // Ключевая точка соединения - не меняем!
        
        // Правый бок (соединение с Философией - не меняем)
        [16.0, 5.0],   // Важная точка соединения
        [15.5, 5.4],   // Важная точка соединения
        [15.3, 5.55],  // Добавляем небольшую неровность
        [15.0, 5.8],   // Важная точка соединения
        [14.8, 5.9],   // Небольшой выступ
        [14.5, 6.0],   // Важная точка соединения
        [14.3, 6.1],   // Мелкая неровность
        [14.0, 6.2],   // Важная точка соединения
        [13.8, 6.05],  // Зубчик
        [13.5, 5.8],   // Важная точка соединения
        [13.3, 5.65],  // Небольшой изгиб
        [13.0, 5.5],   // Важная точка соединения
        
        // Левая граница (полностью синхронизирована с Теорией относительности)
        [13.0, 4.8],    // Начальная точка соединения
        [12.97, 4.65],  [13.03, 4.5],    // Сопряженные выступы
        [12.98, 4.35],  [13.0, 4.0],     // Плавный переход
        [12.94, 3.88],  [13.06, 3.72],   // Глубокие компенсирующие выступы
        [13.0, 3.5],    [12.975, 3.38],  // Микровыступ
        [13.025, 3.22], [12.955, 3.08],  // Хаотичный участок
        [13.0, 2.5],    [12.945, 2.38],  // Резкий выступ
        [13.055, 2.18], [13.0, 2.0],     // Возврат к фиксированной точке
        [12.972, 1.86], [13.028, 1.64],  // Связанная пара
        [13.0, 1.0],    [12.982, 0.62],  // Предфинальный изгиб
        [13.018, 0.28], [13.0, 0.0]      // Точное соединение
    ]
},
    {
        name: "Классическая физика",
        color: "#ff6b6b",
        shape: [ 
            [5.5,5.5], [9.0,4.0], [11.0,5.5], [12.0,5.5], [13.0,5.5],
            [13.2,5.8], [13.0,6.1], [13.4,7.2], [12.9,8.3],
            [13.7,9.9], [13.0,10.5], [13.6,12.1], [13.0,13.0],
            [13.0,14.0], [12.0,14.0], [11.0,14.0], [10.0,13.5],
            [9.0,13.0], [8.0,13.5], [7.0,14.0], [6.0,13.0],
            [7.0,10.0], [6.2,9.0], [5.6,8.4], [5.6,7.0], [6.0,7.0], [7.0,5.5]
        ]
    },
   {
    name: "Будущее физики",
    color: "#ffd86b",
    shape: [
        // Неизмененная часть соединения с классической физикой
        [6.0, 13.0],
        [7.0, 14.0],
        [8.0, 13.5],
        [9.0, 13.0],
        [10.0, 13.5],
        [11.0, 14.0],
        [12.0, 14.0],
        [13.0, 14.0],
        
        // Точное соединение с философией (повторяем точки философии с небольшим смещением)
        [13.5, 14.5],
        [14.0, 15.0],
        [14.5, 15.2],
        [15.0, 15.5],
        [15.4, 15.8],
        [16.0, 16.0],
        [16.5, 15.8],
        [17.0, 15.0],
        
        // Правая граница (повторяем контур философии с небольшим смещением вправо)
        [17.1, 15.1],  // +0.1 по X для избежания наложения
        [17.1, 17.1],
        [16.8, 17.3],  // +0.1 по X
        [16.4, 17.5],  // +0.1 по X
        [16.0, 17.6],
        [15.9, 17.8],  // +0.1 по X
        [15.6, 18.0],  // +0.1 по X
        [15.1, 18.1],
        [14.8, 18.3],  // +0.1 по X
        [14.4, 18.5],  // +0.1 по X
        [14.0, 18.6],
        [13.9, 18.8],  // +0.1 по X
        [13.6, 19.0],  // +0.1 по X
        [13.1, 19.1],
        [12.8, 19.3],  // +0.1 по X
        [12.4, 19.5],  // +0.1 по X
        [12.0, 19.6],
        [11.9, 19.8],  // +0.1 по X
        [11.6, 20.0],  // +0.1 по X
        [11.1, 20.1],
        [10.8, 20.4],  // +0.1 по X
        [10.4, 20.5],  // +0.1 по X
        [10.0, 20.6],
        [9.8, 20.8],   // +0.1 по X
        [9.6, 21.0],   // +0.1 по X
        [9.1, 21.1],
        [8.8, 20.9],   // +0.1 по X
        [8.4, 20.7],   // +0.1 по X
        [8.0, 20.6],
        [7.8, 20.4],   // +0.1 по X
        [7.4, 20.2],   // +0.1 по X
        [7.0, 20.1],
        [6.8, 20.4],   // +0.1 по X
        [6.4, 20.5],   // +0.1 по X
        [6.0, 20.6],
        
        // Остальная часть без изменений
        [5.2, 20.2],
        [5.0, 19.8],
        [4.6, 19.9],
        [4.0, 19.4],
        [3.5, 19.7],
        [3.0, 19.2],
        [2.4, 19.5],
        [2.0, 19.0],
        [1.3, 19.3],
        [1.0, 18.8],
        [0.4, 19.1],
        [0.0, 18.6],
        [-0.5, 18.0],
        [-0.2, 17.2],
        [-0.7, 16.5],
        [0.1, 16.0],
        [-0.8, 15.5],
        [0.2, 15.3],
        [0.5, 15.0],
        [1.0, 15.2],
        [1.5, 15.4],
        [2.0, 15.6],
        [2.5, 15.8],
        [3.0, 16.0],
        [4.0, 15.5],
        [5.0, 15.0],
        [6.0, 14.5]
    ]
},
    {
        name: "Квантовая физика",
        color: "#b96bff",
        shape: [
            [4.0, 0.0],
            [3.5, -0.05],
            [3.0, 0.1],
            [2.5, -0.03],
            [2.0, 0.07],
            [1.5, -0.02],
            [1.0, 0.05],
            [0.5, -0.01],
            [0.0, 0.0],
            [-0.2, 0.5],
            [0.1, 1.0],
            [-0.3, 2.0],
            [0.2, 3.0],
            [-0.1, 4.0],
            [0.3, 5.0],
            [-0.2, 6.0],
            [0.1, 7.0],
            [-0.3, 8.0],
            [0.2, 9.0],
            [-0.1, 10.0],
            [0.3, 11.0],
            [-0.2, 12.0],
            [0.1, 13.0],
            [-0.3, 14.0],
            [0.2, 15.0],
            [0.5, 15.0],   // Новые точки для более плотного соединения
            [1.0, 15.2],
            [1.5, 15.4],
            [2.0, 15.6],
            [2.5, 15.8],
            [3.0, 16.0],
            [4.0, 15.5],
            [5.0, 15.0],
            [6.0, 14.5],
            [6.0, 13.0],
            [7.0, 10.0],
            [6.2, 9.0],
            [5.6, 8.4],
            [5.6, 7.0],
            [6.0, 7.0],
            [7.0, 5.5],
            [5.5, 5.5],
            [5.0, 4.0],
            [4.5, 2.0],
            [4.0, 1.0],
            [4.0, 0.0]
        ]
    },
    {
    name: "Философия",
    color: "#6bc1ff",
    shape: [
        // Соединение с Классической физикой
        [13.0, 5.5],
        [13.2, 5.8],
        [13.0, 6.1],
        [13.4, 7.2],
        [12.9, 8.3],
        [13.7, 9.9],
        [13.0, 10.5],
        [13.6, 12.1],
        [13.0, 13.0],
        [13.0, 14.0],

        // Плавное соединение с Будущим физики
        [13.5, 14.5],  // Добавлена промежуточная точка
        [14.0, 15.0],
        [14.5, 15.2],  // Новая ребристая точка
        [15.0, 15.5],
        [15.4, 15.8],  // Новая ребристая точка
        [16.0, 16.0],
        [16.5, 15.8],  // Новая ребристая точка
        
        // Ребристая правая граница
        [17.0, 15.0],
        [17.2, 14.5],  // Выступ вправо
        [17.0, 14.0],
        [17.3, 13.5],  // Выступ вправо
        [17.0, 13.0],
        [17.2, 12.5],  // Выступ вправо
        [17.0, 12.0],
        [17.3, 11.5],  // Выступ вправо
        [17.0, 11.0],
        [17.2, 10.5],  // Выступ вправо
        [17.0, 10.0],
        [17.3, 9.5],   // Выступ вправо
        [17.0, 9.0],
        [17.2, 8.5],   // Выступ вправо
        [17.0, 8.0],
        [17.3, 7.5],   // Выступ вправо
        [17.0, 7.0],
        [17.2, 6.5],   // Выступ вправо
        [17.0, 6.0],   // Начало соединения с Пропастью
        
        // Совпадение с нижней границей Пропасти незнания
        [16.8, 4.3],
        [16.5, 4.6],
        [16.5, 4.8],   // Добавлено для ребристости
        [16.45, 4.95], // Добавлено для ребристости
        [16.5, 5.0],
        [16.0, 5.0],
        [15.5, 5.4],
        [15.3, 5.55],  // Добавлено для ребристости
        [15.0, 5.8],
        [14.8, 5.9],   // Добавлено для ребристости
        [14.5, 6.0],
        [14.3, 6.1],   // Добавлено для ребристости
        [14.0, 6.2],
        [13.8, 6.05],  // Добавлено для ребристости
        [13.5, 5.8],
        [13.3, 5.65],  // Добавлено для ребристости
        [13.0, 5.5]
    ]
},
    {
    "name": "Теория относительности",
    "color": "#6bff9a",
    "shape": [
        // Левая часть (без изменений)
        [4.0, 1.0],
        [4.5, 2.0],
        [5.0, 4.0],
        [5.5, 5.5],
        
        // Верхние соединения (без изменений)
        [9.0, 4.0],
        [11.0, 5.5],
        [12.0, 5.5],
        [13.0, 5.5],
        [13.0, 5.0],
        [13.0, 4.8],
        [12.97, 4.65],
        [13.03, 4.5],
        [12.98, 4.35],
        [13.0, 4.0],
        [12.94, 3.88],
        [13.06, 3.72],
        [13.0, 3.5],
        [12.975, 3.38],
        [13.025, 3.22],
        [12.955, 3.08],
        [13.0, 2.5],
        [12.945, 2.38],
        [13.055, 2.18],
        [13.0, 2.0],
        [12.972, 1.86],
        [13.028, 1.64],
        [13.0, 1.0],
        [12.982, 0.62],
        [13.018, 0.28],
        
        // Модифицированная правая нижняя часть (вытянута вниз)
        [13.0, 0.0],    // Точка соединения с Квантовой физикой
        [12.5, -0.5],   // Новый глубокий выступ
        [12.0, -0.3],
        [11.5, -0.6],   // Максимальное углубление
        [11.0, -0.4],
        [10.5, -0.7],   // Еще одно углубление
        [10.0, -0.5],
        [9.5, -0.8],    // Самая нижняя точка
        [9.0, -0.6],
        [8.5, -0.4],
        [8.0, -0.2],
        [7.5, 0.0],
        [7.0, 0.1],
        [6.5, 0.0],
        [6.0, 0.2],
        [5.5, 0.0],
        [5.0, 0.3],
        [4.5, 0.1],
        [4.0, 0.4],     // Плавный подъем к начальной точке
        [4.0, 1.0]      // Замыкаем полигон
    ]
},
];
    // Добавляем зоны на карту
    zones.forEach(zone => {
      // Контур зоны
      L.polygon(zone.shape, {
        color: '#000',
        weight: 2,
        fillOpacity: 0,
        opacity: 1,
        className: 'outer-stroke'
      }).addTo(layers.zoneOutlines);

      // Заполнение зоны
      const polygon = L.polygon(zone.shape, {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.3,
        weight: 1,
        opacity: 1
      }).addTo(layers.zones);

      // Подпись зоны
      const center = getPolygonCenter(zone.shape);
      const label = L.tooltip({
        permanent: true,
        direction: "center",
        className: "zone-label",
        content: zone.name
      }).setLatLng(center).addTo(layers.zones);

      // Инициализация прозрачности в зависимости от начального зума
      const initialZoom = map.getZoom();
      const minZoomForLabels = 4;
      label.getElement().style.opacity = Math.max(0, 1.0 - (initialZoom - minZoomForLabels) * 0.3);
      label.getElement().style.fontSize = `${Math.max(10, 13 - (initialZoom - minZoomForLabels) * 0.5)}px`;
    });

    // Основные узлы
    const mainNodes = [
      { id: "philosophy_core", lat: 15.0, lng: 10.0, name: 'Философия', category: "Философия" },
      { id: "classical_core", lat: 9.0, lng: 9.0, name: 'Классическая физика', category: "Классическая физика" },
      { id: "quantum_core", lat: 2.5, lng: 9.0, name: 'Квантовая физика', category: "Квантовая физика" },
      { id: "relativity_core", lat: 8.0, lng: 3.0, name: 'Теория относительности', category: "Теория относительности" },
      { id: "future_core", lat: 9.0, lng: 15.0, name: 'Будущее физики', category: "Будущее физики" },
      { id: "unknown_core", lat: 14.5, lng: 2.0, name: 'Пропасть незнания', category: "Пропасть незнания" },
    ];

    // Добавляем основные узлы
    mainNodes.forEach(node => {
      const color = categoryColors[node.category];
      
      // Свечение узла
      L.circleMarker([node.lat, node.lng], {
        radius: 15,
        fillColor: color,
        color: "transparent",
        weight: 0,
        fillOpacity: 0.1
      }).addTo(layers.nodeGlows);

      // Сам узел
      const marker = L.circleMarker([node.lat, node.lng], {
        radius: 8,
        fillColor: color,
        color: "#fff",
        weight: 1.5,
        opacity: 0.9,
        fillOpacity: 1
      }).addTo(layers.nodes);

      // Подсказка для узла
      marker.bindTooltip(node.name, {
        permanent: true,
        direction: 'top',
        className: 'node-tooltip',
        offset: [0, -10]
      });

      // Сохраняем ссылку на узел для создания связей
      node.marker = marker;
      
      // Обработчик клика для узла
      let lastClickTime = 0;
      marker.on('click', function(e) {
        const now = Date.now();
        if (now - lastClickTime < 30) { // Двойной клик (интервал 300ms)
          resetHighlight();
          lastClickTime = 0;
          return;
        }
        lastClickTime = now;
        
        highlightNode(node.id);
        showModal(node);
      });
    });

    // Все подтемы
    // moved allTopics to allTopics.js

// Делаем данные глобально доступными для script.js
window.categoryColors = categoryColors;
window.allTopics = allTopics;

// === Радиальное дерево с равными расстояниями между узлами ===
const classicalCenter = mainNodes.find(n => n.id === "classical_core");
const BASE_RADIUS = 0.3;     // расстояние от центра до первого уровня
const STEP = 0.2;            // одинаковое расстояние между уровнями
const ANGLE_SPREAD = Math.PI / 3; // угол раскрытия подветвей

// 1. Берём главные ветви
const classicalRoots = allTopics.filter(
  t => t.category === "Классическая физика" && t.parent === "classical_core"
);

const fullCircle = 2 * Math.PI;
const rootStep = fullCircle / classicalRoots.length;

// 2. Расставляем главные ветви по окружности
classicalRoots.forEach((root, i) => {
  const baseAngle = i * rootStep;

  // Координаты первого уровня
  root.lat = classicalCenter.lat + BASE_RADIUS * Math.sin(baseAngle);
  root.lng = classicalCenter.lng + BASE_RADIUS * Math.cos(baseAngle);

  // Построение подветвей с одинаковыми расстояниями
  placeSubtreeEqual(root.id, baseAngle, 1);
});

// 3. Рекурсивное размещение
function placeSubtreeEqual(parentId, baseAngle = 0, depth = 1) {
  
  const parent = allTopics.find(t => t.id === parentId);
  const children = allTopics.filter(
    t => t.parent === parentId && t.category === "Классическая физика"
  );
  if (children.length === 0) return;

  // 🧭 Ручные координаты для точек
  const manualPositions = {
  // === Маятники (расположены дугой вокруг узла pendulum_types) ===
  "condensed_matter": { lat: 7.7, lng: 9.9 }, // Физика конденсированных сред
  "statistical_physics": { lat: 8.1, lng: 12.4 }, // Статистическая физика

  "math_pendulum":   { lat: 7.1, lng: 9.7 },   // Математический маятник
  "phys_pendulum":   { lat: 7.3, lng: 9.8 },   // Физический маятник
  "torsion_pendulum":{ lat: 7.5, lng: 9.7 },   // Крутильный маятник
  "spring_pendulum": { lat: 7.7, lng: 9.9 },   // Пружинный маятник
  "amplitude": { lat: 9.7, lng: 10.5 },        // Амплитуда
  "wave_relations": { lat: 7.6, lng: 8.9 },    // Взаимосвязь параметров волн
  "angular_momentum": { lat: 7.1, lng: 7.99 }, // Момент импульса
  "conservation": { lat: 7.6, lng: 7.9 },      // Законы сохранения
  "illuminance_intensity": { lat: 9.4, lng: 7.8 }, // Зависимость освещённости
  "intensity_angle": { lat: 9.6, lng: 7.8 },   // Связь силы света и телесного угла
  "photometric_quantities": { lat: 9.91, lng: 8.8 }, // Фотометрические величины
  "refractive_index": { lat: 9.99, lng: 8.88 }, // Показатель преломления
  "malus_law": { lat: 9.7, lng: 7.6 },         // Закон Малюса
  "light_intensity": { lat: 9.91, lng: 9.1 },  // Интенсивность света
  "lagrange": { lat: 9.3, lng: 7.9 },          // Метод Лагранжа
  "solid_angle": { lat: 9.91, lng: 8.5 },      // Телесный угол
  "focal_length": { lat: 9.98, lng: 8.5 },     // Фокусное расстояние
  "lorentz_force": { lat: 9.91, lng: 9.4 },    // Сила Лоренца
  "luminous_intensity": { lat: 10.25, lng: 8.8 }, // Сила света
  "state_equations": { lat: 9.91, lng: 9.6 },  // Уравнения состояния
  "energy_density": { lat: 9.71, lng: 9.7 },   // Плотность энергии поля
  "emf": { lat: 9.99, lng: 9.6 },              // ЭДС
  "faraday_law": { lat: 9.79, lng: 9.6 },      // Закон Фарадея
  "resistance": { lat: 9.4, lng: 9.9 },        // Электрическое сопротивление
  "h_theorem": { lat: 9.85, lng: 9.7 },        // H-теорема Больцмана
  "capacitors": { lat: 9.5, lng: 10.5 },       // Конденсаторы
  "free_fall": { lat: 7.6, lng: 9.9 },         // Свободное падение
  "accel_motion": { lat: 8.5, lng: 9.9 },      // Равноускоренное движение
  "harmonic": { lat: 8.53, lng: 10.1 },        // Гармонические колебания
  "dynamics": { lat: 8.2, lng: 9.77 },         // Динамика 
  "thermo_laws": { lat: 9.6, lng: 9.9 },       // Законы термодинамики
  "hamilton": { lat: 9.2, lng: 8.4 }, // Метод Гамильтона
  "period_frequency": { lat: 7.0, lng: 8.7 }, // Связь периода и частоты
  "wien_law": { lat: 9.5, lng: 7.7 }, // Закон смещения Вина
  "magnetism": { lat: 10.0, lng: 10.0 }, // Магнетизм
  "electrostatics": { lat: 10.2, lng: 9.4 }, // Электростатика
  "gas_laws": { lat: 9.85, lng: 9.9 }, // Газовые законы
  "light_sources": { lat: 9.7, lng: 8.5 }, // Характеристики источников света
  "capacitance": { lat: 9.6, lng: 10.6 }, // Ёмкость конденсатора
  "light_characteristics": { lat: 9.75, lng: 9.3 }, // Основные характеристики света
  "circuit_laws": { lat: 9.8, lng: 9.8 }, // Законы электрических цепей
  "entropy": { lat: 9.2, lng: 9.5 }, // Энтропия
  "electric_fields": { lat: 10.1, lng: 9.3 }, // Электрические поля
  "em_oscillations": { lat: 10.4, lng: 9.5 }, // Электромагнитные колебания
  "electric_charge": { lat: 9.99, lng: 9.2 }, // Электрический заряд и его свойства
  "em_flux_density":  { lat: 10.1, lng: 9.0 }, // Плотность потока ЭМ излучения
  "em_wave_speed": { lat: 8.6, lng: 11.8 }, // Скорость распространения электричества
  "current": { lat: 11.4, lng: 8.4 }, // Электрический ток
  "nuclear_relations": { lat: 9.3, lng: 11.1 }, // Взаимосвязь ядерных параметров
  "currents_interaction": { lat: 12.3, lng: 8.6 }, // Взаимодействие токов
  "diffusion_phenomena": { lat: 11.0, lng: 12.3 }, // Диффузионные явления
  "wave_relations": { lat: 7.2, lng: 8.9 }, // Взаимосвязь параметров волн

  // === Физика и механика ===
  "diffusion_applications": { lat: 8.9, lng: 10.8 }, // Применение уравнения диффузии
  "navier_stokes": { lat: 9.5, lng: 9.9 },          // Уравнения Навье-Стокса
  "equilibrium": { lat: 9.0, lng: 9.5 },           // Условия равновесия

  // === Кинематика и дочерние точки ===
  "kinematics": { lat: 8.0, lng: 9.0 },            // Кинематика
  "kinematics_relativity": { lat: 7.8, lng: 8.8 }, // Относительность движения
  "uniform_motion": { lat: 7.5, lng: 9.0 },        // Равномерное движение
  "kinematics_motion": { lat: 7.3, lng: 9.2 },    // Движение точки
  "kinematics_rotation": { lat: 7.6, lng: 9.5 },  // Вращательное движение
  "free_fall_kin": { lat: 7.5, lng: 9.3 },        // Свободное падение (кинематика)

  // === Остальные отдельные точки ===
  "oscillation_period": { lat: 9.4, lng: 7.25 },  // Период колебаний
  "electricity_speed": { lat: 12.6, lng: 8.8 }    // Скорость распространения электричества
};

  // угол между дочерними точками
  const angleSpread = Math.PI / 2; // например 90° для раскрытия ветвей
  const stepAngle = children.length > 1 ? angleSpread / (children.length - 1) : 0;
  const startAngle = baseAngle - angleSpread / 2;

  const radius = BASE_RADIUS + depth * STEP;

  children.forEach((child, i) => {
    // ✅ Если есть ручные координаты — применяем их
    if (manualPositions[child.id]) {
      child.lat = manualPositions[child.id].lat;
      child.lng = manualPositions[child.id].lng;
      console.log(`✅ Manual position applied for ${child.name || child.id}`);
    } else {
      // 📐 Автоматическое радиальное размещение вокруг родителя
      const angle = startAngle + i * stepAngle;
      child.lat = parent.lat + radius * Math.sin(angle);
      child.lng = parent.lng + radius * Math.cos(angle);
    }

    // 🔹 Рекурсивно размещаем дочерние точки
    placeSubtreeEqual(child.id, baseAngle, depth + 1);
  });
}

// Настройки для Fuse.js (нечеткий поиск)
const options = {
  keys: ['name'], // Поиск только по полю 'name'
  includeScore: true, // Включаем вычисление релевантности
  threshold: 0.4, // Уменьшаем чувствительность для лучшего поиска
  shouldSort: true,  // Сортировка результатов по релевантности
  ignoreLocation: true // Игнорируем местоположение символов
};

// Создаем экземпляр Fuse.js
const fuse = new Fuse(allTopics, options);

// Функция для фильтрации точек и приближения к найденной точке
function filterPoints(query) {
  // Выполняем поиск с использованием Fuse.js
  const results = fuse.search(query);

  // Получаем только найденные элементы
  const filteredTopics = results.map(result => result.item);

  // Если есть результаты, приближаем к первой найденной точке
  if (filteredTopics.length > 0) {
    const firstResult = filteredTopics[0];  // Берем первую найденную точку

    // Проверяем, есть ли маркер для этой точки
    if (firstResult.marker) {
      // Приближаем к найденной точке
      map.flyTo([firstResult.lat, firstResult.lng], 12, { animate: true, duration: 2.5 });

      // Дополнительно можно подсветить маркер (если нужно)
      firstResult.marker.setStyle({
        radius: 10,
        color: '#00f7ff98', // Красный цвет подсветки
        fillColor: '#ff0000',
        fillOpacity: 1
      });

      // Возвращаем маркер в исходный стиль через несколько секунд
      setTimeout(() => {
        firstResult.marker.setStyle({
          radius: 6,
          color: '#fff',
          fillColor: '#fdfdfdff',  // Исходный цвет
          fillOpacity: 1
        });
      }, 5000);  // Через 5 секунд вернуть в исходное состояние
    }
  }

  // Лог для проверки
  console.log(filteredTopics);  // Печатаем найденные точки
}

// Обработчик ввода в поле поиска
document.getElementById("search-input").addEventListener("input", (e) => {
  const query = e.target.value;  // Получаем текст из поля поиска
  filterPoints(query);  // Запускаем поиск
});

// === КАРТИНКИ ДЛЯ ТОЧЕК (первый источник) ===
// Картинки для точек карты — БЛОК "ФИЛОСОФИЯ"
// moved images to images.dynamic.js

    // Связи между узлами (все сделаны бледно-серыми)
    const connections = [

// Квантовая физика (исправленные связи)
  {source: 'planck_formula', target: 'quantum_basics', color: '#dddddd'},
  {source: 'planck_formula', target: 'photon_energy', color: '#dddddd'},
  {source: 'planck_formula', target: 'quantum_optics', color: '#dddddd'},
  {source: 'quantum_basics', target: 'wave_particle', color: '#dddddd'},
  {source: 'quantum_basics', target: 'schrodinger', color: '#dddddd'},

  // Термодинамика и МКТ (актуальные связи)
  {source: 'mkt', target: 'ideal_gas', color: '#dddddd'},
  {source: 'mkt', target: 'maxwell', color: '#dddddd'},
  {source: 'thermodynamics', target: 'mkt', color: '#dddddd'},
  {source: 'thermodynamics', target: 'entropy', color: '#dddddd'},

  // Электромагнетизм (проверенные связи)
  {source: 'electromagnetism', target: 'electrostatics', color: '#dddddd'},
  {source: 'electromagnetism', target: 'current', color: '#dddddd'},
  {source: 'electromagnetism', target: 'magnetism', color: '#dddddd'},
  {source: 'magnetism', target: 'lorentz_force', color: '#dddddd'}, // Исправлено lorenz → lorentz
  {source: 'current', target: 'ohm_law', color: '#dddddd'},

  // Оптика (валидные связи)
  {source: 'optics', target: 'geo_optics', color: '#dddddd'},
  {source: 'optics', target: 'wave_optics', color: '#dddddd'},
  {source: 'light_laws', target: 'wien_law', color: '#dddddd'},
  {source: 'light_laws', target: 'rayleigh_jeans', color: '#dddddd'},

  // Механика (ключевые связи)
  {source: 'mechanics', target: 'kinematics', color: '#dddddd'},
  {source: 'mechanics', target: 'dynamics', color: '#dddddd'},
  {source: 'dynamics', target: 'newton_laws', color: '#dddddd'},
  {source: 'kinematics', target: 'uniform_motion', color: '#dddddd'},

  // Ядерная физика (сохраненные связи)
  {source: 'nuclear_physics', target: 'nuclear_relations', color: '#dddddd'},
  {source: 'nuclear_relations', target: 'moment_ratio_relation', color: '#dddddd'},

  // Философия (проверенные связи)
  {source: 'philosophy_core', target: 'quantum_philosophy', color: '#dddddd'},
  {source: 'philosophy_core', target: 'determinism', color: '#dddddd'},

  // Междисциплинарные связи (исправленные)
  {source: 'quantum_basics', target: 'special', color: '#dddddd'}, // Квантовая ↔ СТО
  {source: 'thermodynamics', target: 'quantum_thermo', color: '#dddddd'}, // Термодинамика ↔ Квантовая
  {source: 'maxwell', target: 'light_characteristics', color: '#dddddd'}, // Максвелл ↔ Оптика

{source: 'planck_formula', target: 'quantum_basics', color: '#dddddd'}, // Связь с основами квантовой физики
{source: 'planck_formula', target: 'photon_properties', color: '#dddddd'}, // Связь со свойствами фотонов
{source: 'planck_formula', target: 'photon_energy', color: '#dddddd'}, // Связь с энергией фотона
{source: 'planck_formula', target: 'quantum_optics', color: '#dddddd'}, // Связь с квантовой оптикой

    

  
// В массив connections
{source: 'mkt', target: 'h_theorem', color: '#dddddd'},
{source: 'mkt', target: 'gas_laws', color: '#dddddd'},
{source: 'gas_laws', target: 'boyle_mariotte', color: '#dddddd'},
{source: 'gas_laws', target: 'charles_law', color: '#dddddd'},
{source: 'gas_laws', target: 'dalton_law', color: '#dddddd'},

{source: 'mkt', target: 'molecular_motion', color: '#dddddd'},
{source: 'molecular_motion', target: 'mean_free_path', color: '#dddddd'},
{source: 'molecular_motion', target: 'molecular_speeds', color: '#dddddd'},

{source: 'mkt', target: 'state_equations', color: '#dddddd'},
{source: 'state_equations', target: 'clausius_clapeyron', color: '#dddddd'},
{source: 'state_equations', target: 'mendeleev_clapeyron', color: '#dddddd'},

{source: 'mkt', target: 'humidity', color: '#dddddd'},
{source: 'humidity', target: 'absolute_humidity', color: '#dddddd'},
{source: 'thermodynamics', target: 'heat_quantity', color: '#dddddd'},

    // В массив connections
{source: 'electromagnetism', target: 'electric_charge', color: '#dddddd'},
{source: 'electromagnetism', target: 'electric_fields', color: '#dddddd'},
{source: 'electromagnetism', target: 'circuit_laws', color: '#dddddd'},
{source: 'electromagnetism', target: 'current_interaction', color: '#dddddd'},
{source: 'electromagnetism', target: 'capacitance', color: '#dddddd'},

{source: 'magnetism', target: 'biot_savart', color: '#dddddd'},
{source: 'current', target: 'ohm_law', color: '#dddddd'},
{source: 'magnetism', target: 'faraday_law', color: '#dddddd'},
{source: 'current', target: 'kirchhoff_laws', color: '#dddddd'},
{source: 'magnetism', target: 'lorentz_force', color: '#dddddd'},

{source: 'current', target: 'resistance', color: '#dddddd'},
{source: 'electrostatics', target: 'capacitors', color: '#dddddd'},
{source: 'current', target: 'emf', color: '#dddddd'},
{source: 'current', target: 'power', color: '#dddddd'},
{source: 'electrostatics', target: 'energy_density', color: '#dddddd'},

      // Связи для ядерной физики
{source: 'nuclear_physics', target: 'nuclear_characteristics', color: '#dddddd'},
{source: 'nuclear_physics', target: 'nuclear_relations', color: '#dddddd'},
{source: 'transport', target: 'diffusion_phenomena', color: '#dddddd'},

// Связи внутри групп
{source: 'nuclear_characteristics', target: 'gyromagnetic_ratio', color: '#dddddd'},
{source: 'nuclear_characteristics', target: 'nuclear_magnetic_moment', color: '#dddddd'},
{source: 'diffusion_phenomena', target: 'diffusion_equation', color: '#dddddd'},
{source: 'nuclear_relations', target: 'moment_ratio_relation', color: '#dddddd'},
{source: 'nuclear_relations', target: 'diffusion_applications', color: '#dddddd'},

// Связи с существующими элементами
{source: 'gyromagnetic_ratio', target: 'nuclear_magnetic_moment', color: '#dddddd'},
{source: 'magnetism', target: 'nuclear_magnetic_moment', color: '#dddddd'},
{source: 'statistical_physics', target: 'diffusion_equation', color: '#dddddd'},
{source: 'maxwell', target: 'diffusion_equation', color: '#dddddd'},

      // Добавить в массив connections
{source: 'optics', target: 'light_characteristics', color: '#dddddd'},
{source: 'optics', target: 'light_sources', color: '#dddddd'},
{source: 'optics', target: 'optical_params', color: '#dddddd'},
{source: 'optics', target: 'spatial_params', color: '#dddddd'},
{source: 'optics', target: 'light_laws', color: '#dddddd'},
{source: 'optics', target: 'light_relations', color: '#dddddd'},

// Связи внутри групп
{source: 'light_characteristics', target: 'wavelength_visible', color: '#dddddd'},
{source: 'light_characteristics', target: 'wave_number', color: '#dddddd'},
{source: 'light_characteristics', target: 'light_intensity', color: '#dddddd'},
{source: 'light_characteristics', target: 'refractive_index', color: '#dddddd'},
{source: 'light_characteristics', target: 'photometric_quantities', color: '#dddddd'},

{source: 'light_sources', target: 'luminous_intensity', color: '#dddddd'},
{source: 'light_sources', target: 'luminosity', color: '#dddddd'},
{source: 'light_sources', target: 'brightness', color: '#dddddd'},
{source: 'light_sources', target: 'illuminance', color: '#dddddd'},
{source: 'light_sources', target: 'lens_characteristics', color: '#dddddd'},

{source: 'optical_params', target: 'focal_length', color: '#dddddd'},
{source: 'optical_params', target: 'optical_power', color: '#dddddd'},
{source: 'optical_params', target: 'angular_characteristics', color: '#dddddd'},

{source: 'spatial_params', target: 'solid_angle', color: '#dddddd'},

{source: 'light_laws', target: 'malus_law', color: '#dddddd'},
{source: 'light_laws', target: 'wien_law', color: '#dddddd'},
{source: 'light_laws', target: 'rayleigh_jeans', color: '#dddddd'},

{source: 'light_relations', target: 'intensity_angle', color: '#dddddd'},
{source: 'light_relations', target: 'illuminance_intensity', color: '#dddddd'},
{source: 'light_relations', target: 'brightness_luminosity', color: '#dddddd'},

// Связи с существующими элементами
{source: 'maxwell', target: 'light_characteristics', color: '#dddddd'},
{source: 'photometry', target: 'photometric_quantities', color: '#dddddd'},
{source: 'geo_optics', target: 'lens_characteristics', color: '#dddddd'},
{source: 'geo_optics', target: 'optical_params', color: '#dddddd'},
{source: 'wave_optics', target: 'light_characteristics', color: '#dddddd'},

      
      // Философия - внутренние связи
      {source: 'philosophy_core', target: 'ontology', color: '#dddddd'},
      {source: 'philosophy_core', target: 'epistemology', color: '#dddddd'},
      {source: 'philosophy_core', target: 'metaphysics', color: '#dddddd'},
      {source: 'philosophy_core', target: 'objective_reality', color: '#dddddd'},
      {source: 'philosophy_core', target: 'dark_matter_ontology', color: '#dddddd'},
      {source: 'philosophy_core', target: 'observer_role', color: '#dddddd'},
      {source: 'philosophy_core', target: 'scientific_method', color: '#dddddd'},
      {source: 'philosophy_core', target: 'time_metaphysics', color: '#dddddd'},
      {source: 'philosophy_core', target: 'anthropic_principle', color: '#dddddd'},
      {source: 'philosophy_core', target: 'quantum_philosophy', color: '#dddddd'},
      {source: 'philosophy_core', target: 'relativity_philosophy', color: '#dddddd'},
      {source: 'philosophy_core', target: 'consciousness_philosophy', color: '#dddddd'},
      {source: 'philosophy_core', target: 'determinism', color: '#dddddd'},
      {source: 'philosophy_core', target: 'field_nature', color: '#dddddd'},
      {source: 'philosophy_core', target: 'reality_nature', color: '#dddddd'},
      {source: 'philosophy_core', target: 'mathematical_methods', color: '#dddddd'},
      // Добавить в массив connections
{source: 'oscillations', target: 'wave_characteristics', color: '#dddddd'},
{source: 'harmonic', target: 'pendulum_types', color: '#dddddd'},
{source: 'harmonic', target: 'oscillation_params', color: '#dddddd'},
{source: 'electromagnetism', target: 'em_oscillations', color: '#dddddd'},
{source: 'mech_waves', target: 'wave_speeds', color: '#dddddd'},
{source: 'mech_waves', target: 'wave_effects', color: '#dddddd'},
{source: 'mech_waves', target: 'wave_relations', color: '#dddddd'},
// Дополнительные связи между параметрами

      // Классическая физика - внутренние связи
      {source: 'classical_core', target: 'mechanics', color: '#dddddd'},
      {source: 'classical_core', target: 'thermodynamics', color: '#dddddd'},
      {source: 'classical_core', target: 'electromagnetism', color: '#dddddd'},
      {source: 'classical_core', target: 'optics', color: '#dddddd'},
      {source: 'classical_core', target: 'analytical_mech', color: '#dddddd'},
      {source: 'classical_core', target: 'statistical_physics', color: '#dddddd'},
      {source: 'classical_core', target: 'nuclear_physics', color: '#dddddd'},
      {source: 'classical_core', target: 'condensed_matter', color: '#dddddd'},

      // Механика
      {source: 'mechanics', target: 'kinematics', color: '#dddddd'},
      {source: 'mechanics', target: 'dynamics', color: '#dddddd'},
      {source: 'mechanics', target: 'conservation', color: '#dddddd'},
      {source: 'mechanics', target: 'oscillations', color: '#dddddd'},
      {source: 'mechanics', target: 'statics', color: '#dddddd'},
      {source: 'mechanics', target: 'analytical_mech', color: '#dddddd'},

      // Кинематика
      {source: 'kinematics', target: 'kinematics_motion', color: '#dddddd'},
      {source: 'kinematics', target: 'kinematics_rotation', color: '#dddddd'},
      {source: 'kinematics', target: 'kinematics_relativity', color: '#dddddd'},
       {source: 'kinematics_motion', target: 'uniform_motion', color: '#dddddd'},
  {source: 'kinematics_motion', target: 'accel_motion', color: '#dddddd'},
  {source: 'kinematics_motion', target: 'free_fall', color: '#dddddd'},
  
  // Связи для динамики
  {source: 'forces', target: 'friction_forces', color: '#dddddd'},
  {source: 'equilibrium', target: 'lever_principle', color: '#dddddd'},
  
  // Связи для статики
  {source: 'pressure', target: 'liquid_pressure', color: '#dddddd'},
  
  // Связи для электромагнетизма
  {source: 'maxwell_eq', target: 'em_flux_density', color: '#dddddd'},

      // Динамика
      {source: 'dynamics', target: 'newton_laws', color: '#dddddd'},
      {source: 'dynamics', target: 'forces', color: '#dddddd'},
      {source: 'dynamics', target: 'complex_forces', color: '#dddddd'},

      // Законы сохранения
      {source: 'conservation', target: 'energy', color: '#dddddd'},
      {source: 'conservation', target: 'momentum', color: '#dddddd'},
      {source: 'conservation', target: 'angular_momentum', color: '#dddddd'},

      // Колебания и волны
      {source: 'oscillations', target: 'harmonic', color: '#dddddd'},
      {source: 'oscillations', target: 'damped', color: '#dddddd'},
      {source: 'oscillations', target: 'mech_waves', color: '#dddddd'},

      // Статика
      {source: 'statics', target: 'equilibrium', color: '#dddddd'},
      {source: 'statics', target: 'pressure', color: '#dddddd'},
      {source: 'statics', target: 'archimedes', color: '#dddddd'},

      // Термодинамика
      {source: 'thermodynamics', target: 'thermo_laws', color: '#dddddd'},
      {source: 'thermodynamics', target: 'entropy', color: '#dddddd'},
      {source: 'thermodynamics', target: 'heat_machines', color: '#dddddd'},
      {source: 'thermodynamics', target: 'mkt', color: '#dddddd'},

      // МКТ
      {source: 'mkt', target: 'ideal_gas', color: '#dddddd'},
      {source: 'mkt', target: 'maxwell', color: '#dddddd'},
      {source: 'mkt', target: 'transport', color: '#dddddd'},

      // Электромагнетизм
      {source: 'electromagnetism', target: 'electrostatics', color: '#dddddd'},
      {source: 'electromagnetism', target: 'current', color: '#dddddd'},
      {source: 'electromagnetism', target: 'magnetism', color: '#dddddd'},
      {source: 'electromagnetism', target: 'maxwell_eq', color: '#dddddd'},

      // Оптика
      {source: 'optics', target: 'geo_optics', color: '#dddddd'},
      {source: 'optics', target: 'wave_optics', color: '#dddddd'},
      {source: 'optics', target: 'photometry', color: '#dddddd'},

      // Аналитическая механика
      {source: 'analytical_mech', target: 'lagrange', color: '#dddddd'},
      {source: 'analytical_mech', target: 'hamilton', color: '#dddddd'},
      {source: 'analytical_mech', target: 'celestial', color: '#dddddd'},

      // Другие разделы
      {source: 'phase_transitions', target: 'thermodynamics', color: '#dddddd'},
      {source: 'phase_transitions', target: 'mkt', color: '#dddddd'},
      {source: 'phase_transitions', target: 'statistical_physics', color: '#dddddd'},
      {source: 'statistical_physics', target: 'thermodynamics', color: '#dddddd'},
      {source: 'nuclear_physics', target: 'thermodynamics', color: '#dddddd'},
      {source: 'condensed_matter', target: 'statistical_physics', color: '#dddddd'},

      // Квантовая физика - внутренние связи
      {source: 'quantum_core', target: 'quantum_basics', color: '#dddddd'},
      {source: 'quantum_core', target: 'atomic_physics', color: '#dddddd'},
      {source: 'quantum_core', target: 'quantum_effects', color: '#dddddd'},
      {source: 'quantum_core', target: 'qft', color: '#dddddd'},
      {source: 'quantum_core', target: 'quantum_apps', color: '#dddddd'},
      {source: 'quantum_core', target: 'particle_physics', color: '#dddddd'},

      // Основы квантовой физики
      {source: 'quantum_basics', target: 'wave_particle', color: '#dddddd'},
      {source: 'quantum_basics', target: 'schrodinger', color: '#dddddd'},
      {source: 'quantum_basics', target: 'uncertainty', color: '#dddddd'},
      {source: 'quantum_basics', target: 'wave_function', color: '#dddddd'},
      {source: 'quantum_basics', target: 'hilbert_space', color: '#dddddd'},

      // Атомная физика
      {source: 'atomic_physics', target: 'bohr_model', color: '#dddddd'},
      {source: 'atomic_physics', target: 'quantum_numbers', color: '#dddddd'},
      {source: 'atomic_physics', target: 'electron_spin', color: '#dddddd'},
      {source: 'atomic_physics', target: 'pauli', color: '#dddddd'},

      // Квантовые эффекты
      {source: 'quantum_effects', target: 'tunneling', color: '#dddddd'},
      {source: 'quantum_effects', target: 'entanglement', color: '#dddddd'},
      {source: 'quantum_effects', target: 'superposition', color: '#dddddd'},
      {source: 'quantum_effects', target: 'aharonov_bohm', color: '#dddddd'},

      // Квантовая теория поля
      {source: 'qft', target: 'qed', color: '#dddddd'},
      {source: 'qft', target: 'qcd', color: '#dddddd'},
      {source: 'qft', target: 'standard_model', color: '#dddddd'},
      {source: 'qft', target: 'higgs', color: '#dddddd'},

      // Приложения квантовой физики
      {source: 'quantum_apps', target: 'quantum_computing', color: '#dddddd'},
      {source: 'quantum_apps', target: 'quantum_crypto', color: '#dddddd'},
      {source: 'quantum_apps', target: 'quantum_sensors', color: '#dddddd'},
      {source: 'quantum_apps', target: 'quantum_thermo', color: '#dddddd'},
      {source: 'quantum_apps', target: 'quantum_optics', color: '#dddddd'},

      // Теория относительности - внутренние связи
      {source: 'relativity_core', target: 'special', color: '#dddddd'},
      {source: 'relativity_core', target: 'general', color: '#dddddd'},
      {source: 'relativity_core', target: 'cosmology', color: '#dddddd'},

      // Специальная теория относительности
      {source: 'special', target: 'postulates', color: '#dddddd'},
      {source: 'special', target: 'lorenz', color: '#dddddd'},
      {source: 'special', target: 'effects', color: '#dddddd'},
      {source: 'special', target: 'energy_momentum', color: '#dddddd'},

      // Эффекты СТО
      {source: 'effects', target: 'dilation', color: '#dddddd'},
      {source: 'effects', target: 'length_contraction', color: '#dddddd'},

      // Общая теория относительности
      {source: 'general', target: 'equivalence', color: '#dddddd'},
      {source: 'general', target: 'einstein_eq', color: '#dddddd'},
      {source: 'general', target: 'black_holes', color: '#dddddd'},
      {source: 'general', target: 'grav_waves', color: '#dddddd'},

      // Космология
      {source: 'cosmology', target: 'dark_matter', color: '#dddddd'},
      {source: 'cosmology', target: 'dark_energy', color: '#dddddd'},
      {source: 'cosmology', target: 'universe_evolution', color: '#dddddd'},

      // Будущее физики - внутренние связи
      {source: 'future_core', target: 'quantum_gravity', color: '#dddddd'},
      
            // Будущее физики - внутренние связи
            {source: 'future_core', target: 'beyond_standard', color: '#dddddd'},
      {source: 'future_core', target: 'quantum_tech', color: '#dddddd'},
      {source: 'future_core', target: 'fusion', color: '#dddddd'},
      {source: 'future_core', target: 'accelerators', color: '#dddddd'},
      {source: 'future_core', target: 'medical_physics', color: '#dddddd'},
      {source: 'future_core', target: 'neurophysics', color: '#dddddd'},
      {source: 'future_core', target: 'multiverse', color: '#dddddd'},
      {source: 'future_core', target: 'ai_physics', color: '#dddddd'},
      {source: 'future_core', target: 'tech_control', color: '#dddddd'},
      {source: 'future_core', target: 'scientific_status', color: '#dddddd'},
      {source: 'future_core', target: 'neutron_stars', color: '#dddddd'},
      {source: 'future_core', target: 'superconductivity', color: '#dddddd'},
      {source: 'future_core', target: 'semiconductors', color: '#dddddd'},
      {source: 'future_core', target: 'particle_accelerators', color: '#dddddd'},
      {source: 'future_core', target: 'chaos_theory', color: '#dddddd'},

      // Квантовая гравитация
      {source: 'quantum_gravity', target: 'string_theory', color: '#dddddd'},
      {source: 'quantum_gravity', target: 'loop_gravity', color: '#dddddd'},

      // Физика за пределами Стандартной модели
      {source: 'beyond_standard', target: 'neutrino', color: '#dddddd'},

      // Квантовые технологии
      {source: 'quantum_tech', target: 'quantum_information', color: '#dddddd'},
      {source: 'quantum_tech', target: 'quantum_simulators', color: '#dddddd'},

      // Пропасть незнания - внутренние связи
      {source: 'unknown_core', target: 'measurement_problem', color: '#dddddd'},
      {source: 'unknown_core', target: 'time_nature', color: '#dddddd'},
      {source: 'unknown_core', target: 'consciousness', color: '#dddddd'},
      {source: 'unknown_core', target: 'hierarchy', color: '#dddddd'},
      {source: 'unknown_core', target: 'anthropic', color: '#dddddd'},
      {source: 'unknown_core', target: 'time_arrow', color: '#dddddd'},
      {source: 'unknown_core', target: 'wave_collapse', color: '#dddddd'},
      {source: 'unknown_core', target: 'spacetime_discrete', color: '#dddddd'},
      {source: 'unknown_core', target: 'local_realism', color: '#dddddd'},
      {source: 'unknown_core', target: 'crisis_cosmology', color: '#dddddd'},

      // Междисциплинарные связи
      // Философия ↔ Классическая физика
      {source: 'objective_reality', target: 'newton_laws', color: '#dddddd'},
      {source: 'anthropic_principle', target: 'entropy', color: '#dddddd'},
      {source: 'time_metaphysics', target: 'thermodynamics', color: '#dddddd'},
      {source: 'field_nature', target: 'maxwell_eq', color: '#dddddd'},

      // Философия ↔ Квантовая физика
      {source: 'quantum_philosophy', target: 'quantum_basics', color: '#dddddd'},
      {source: 'observer_role', target: 'measurement_problem', color: '#dddddd'},
      {source: 'determinism', target: 'wave_function', color: '#dddddd'},

      // Философия ↔ Теория относительности
      {source: 'relativity_philosophy', target: 'special', color: '#dddddd'},
      {source: 'time_metaphysics', target: 'general', color: '#dddddd'},
      {source: 'reality_nature', target: 'cosmology', color: '#dddddd'},

      // Классическая физика ↔ Квантовая физика
      {source: 'mechanics', target: 'quantum_basics', color: '#dddddd'},
      {source: 'electromagnetism', target: 'qed', color: '#dddddd'},
      {source: 'thermodynamics', target: 'quantum_thermo', color: '#dddddd'},
      {source: 'optics', target: 'quantum_optics', color: '#dddddd'},

      // Классическая физика ↔ Теория относительности
      {source: 'mechanics', target: 'special', color: '#dddddd'},
      {source: 'electromagnetism', target: 'general', color: '#dddddd'},
      {source: 'celestial', target: 'cosmology', color: '#dddddd'},

      // Квантовая физика ↔ Теория относительности
      {source: 'quantum_basics', target: 'special', color: '#dddddd'},
      {source: 'quantum_effects', target: 'general', color: '#dddddd'},
      {source: 'qft', target: 'cosmology', color: '#dddddd'},

      // Все ↔ Будущее физики
      {source: 'future_core', target: 'philosophy_core', color: '#dddddd'},
      {source: 'future_core', target: 'classical_core', color: '#dddddd'},
      {source: 'future_core', target: 'quantum_core', color: '#dddddd'},
      {source: 'future_core', target: 'relativity_core', color: '#dddddd'},
      {source: 'future_core', target: 'unknown_core', color: '#dddddd'},
      { source: 'future_core', target: 'mass_defect', color: '#dddddd' },
      { source: 'future_core', target: 'decay_law', color: '#dddddd' },
      

      // Все ↔ Пропасть незнания
      {source: 'unknown_core', target: 'philosophy_core', color: '#dddddd'},
      {source: 'unknown_core', target: 'classical_core', color: '#dddddd'},
      {source: 'unknown_core', target: 'quantum_core', color: '#dddddd'},
      {source: 'unknown_core', target: 'relativity_core', color: '#dddddd'},

      // Новые пограничные темы (мосты между разделами)
      // Квантовая термодинамика
      {source: 'thermodynamics', target: 'quantum_information', color: '#dddddd'},
      {source: 'entropy', target: 'entanglement', color: '#dddddd'},
      {source: 'thermo_laws', target: 'measurement_problem', color: '#dddddd'},

      // Релятивистская квантовая механика
      {source: 'schrodinger', target: 'dirac_equation', color: '#dddddd'},
      {source: 'dirac_equation', target: 'special', color: '#dddddd'},
      {source: 'qft', target: 'lorenz', color: '#dddddd'},

      // Биофизика
      {source: 'quantum_effects', target: 'photosynthesis', color: '#dddddd'},
      {source: 'photosynthesis', target: 'energy', color: '#dddddd'},
      {source: 'neurophysics', target: 'quantum_sensors', color: '#dddddd'},

      // Астрофизика
      {source: 'black_holes', target: 'quantum_gravity', color: '#dddddd'},
      {source: 'cosmic_rays', target: 'standard_model', color: '#dddddd'},

      // Хаотические системы
      {source: 'determinism', target: 'chaos_theory', color: '#dddddd'},
      {source: 'chaos_theory', target: 'quantum_chaos', color: '#dddddd'},
      
      // Гидродинамика
      {source: 'hydrodynamics', target: 'navier_stokes', color: '#dddddd'},
      {source: 'navier_stokes', target: 'quantum_fluids', color: '#dddddd'},

      // Квантовые алгоритмы
      {source: 'quantum_algorithms', target: 'quantum_information', color: '#dddddd'},
      {source: 'quantum_algorithms', target: 'mathematical_methods', color: '#dddddd'},

      // Топологические изоляторы
      {source: 'topological_insulators', target: 'condensed_matter', color: '#dddddd'},
      {source: 'topological_insulators', target: 'general', color: '#dddddd'},

      // Голографический принцип
      {source: 'holographic_principle', target: 'string_theory', color: '#dddddd'},
      {source: 'holographic_principle', target: 'black_holes', color: '#dddddd'},
      {source: 'holographic_principle', target: 'quantum_information', color: '#dddddd'},

      // Интерпретации вероятности
      {source: 'probability_interpretations', target: 'copenhagen', color: '#dddddd'},
      {source: 'probability_interpretations', target: 'statistical_physics', color: '#dddddd'},

      // Квантовая биология
      {source: 'quantum_biology', target: 'photosynthesis', color: '#dddddd'},
      {source: 'quantum_biology', target: 'quantum_coherence', color: '#dddddd'},
      {source: 'magnetic_sense', target: 'electron_spin', color: '#dddddd'},

      // Квантовый мозг
      {source: 'quantum_mind', target: 'consciousness', color: '#dddddd'},
      {source: 'quantum_mind', target: 'superposition', color: '#dddddd'},

      // Археофизика
      {source: 'archaeophysics', target: 'nuclear_physics', color: '#dddddd'},

      // Практические приложения
      {source: 'mri_technology', target: 'electron_spin', color: '#dddddd'},
      {source: 'mri_technology', target: 'medical_physics', color: '#dddddd'},
      {source: 'solar_cells', target: 'thermodynamics', color: '#dddddd'},
      {source: 'solar_cells', target: 'future_core', color: '#dddddd'},
      {source: 'gps_systems', target: 'special', color: '#dddddd'},
      {source: 'gps_systems', target: 'celestial', color: '#dddddd'},

      // Исторические связи
      {source: 'least_action', target: 'analytical_mech', color: '#dddddd'},
      {source: 'least_action', target: 'feynman_path', color: '#dddddd'},
      {source: 'ether_theories', target: 'maxwell_eq', color: '#dddddd'},
      {source: 'ether_theories', target: 'special', color: '#dddddd'},
      // Перекрестные связи с другими разделами
      // Соединения с Квантовой физикой
      {source: 'quantum_physics', target: 'quantum_fluids', color: '#dddddd'},
      {source: 'quantum_physics', target: 'topological_insulators', color: '#dddddd'},

      {source: 'quantum_fluids', target: 'quantum_core', color: '#dddddd'},
      {source: 'topological_insulators', target: 'quantum_core', color: '#dddddd'},
      {source: 'quantum_fluids', target: 'topological_insulators', color: '#dddddd'},

      {source: 'proton_mass', target: 'future_core', color: '#dddddd'},

    ];

    // Описания для всех узлов
    // moved descriptions to descriptions.js

window.additionalData = additionalData;

    // Текущее состояние карусели
    let carouselState = {
      currentIndex: 0,
      totalItems: 0
    };

    // Функция для проверки, находится ли точка внутри полигона
    function isPointInPolygon(point, polygon) {
      const x = point[0], y = point[1];
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];
        
        const intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    }

    // Функция для нахождения случайной точки внутри полигона
    function getRandomPointInPolygon(polygon) {
      // Находим границы полигона
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      polygon.forEach(point => {
        minX = Math.min(minX, point[0]);
        maxX = Math.max(maxX, point[0]);
        minY = Math.min(minY, point[1]);
        maxY = Math.max(maxY, point[1]);
      });
      
      // Генерируем случайные точки, пока не найдем внутри полигона
      let point;
      do {
        const x = minX + Math.random() * (maxX - minX);
        const y = minY + Math.random() * (maxY - minY);
        point = [x, y];
      } while (!isPointInPolygon(point, polygon));
      
      return point;
    }

    // Функция для вычисления центра полигона
    function getPolygonCenter(coords) {
      let x = 0, y = 0;
      coords.forEach(coord => {
        x += coord[0];
        y += coord[1];
      });
      return [x / coords.length, y / coords.length];
    }

   // Распределяем подтемы внутри зон
function distributeTopics() {
  const zonePolygons = {};
  zones.forEach(zone => {
    zonePolygons[zone.name] = zone.shape;
  });

  // Массив для хранения уже размещенных точек классической физики
  const placedClassicalPoints = [];

  allTopics.forEach(topic => {
    // Если заданы кастомные координаты, используем их
    if (topic.lat !== undefined && topic.lng !== undefined) {
      if (topic.category === "Классическая физика") {
        placedClassicalPoints.push([topic.lat, topic.lng]);
      }
      return;
    }

    const parentNode = [...mainNodes, ...allTopics].find(n => n.id === topic.parent);
    
    // Для классической физики - равномерное распределение по всей зоне с минимальным расстоянием
    if (topic.category === "Классическая физика") {
      const zoneShape = zonePolygons[topic.category];
      if (zoneShape) {
        const point = getUniformPointWithSpacing(zoneShape, placedClassicalPoints, 0.5); // 0.5 - минимальное расстояние
        topic.lat = point[0];
        topic.lng = point[1];
        placedClassicalPoints.push([point[0], point[1]]);
      }
      return;
    }    

    // Для остальных категорий - обычная логика распределения
    if (!parentNode) return;

    let point;
    let attempts = 0;
    const maxAttempts = 100;
    const zoneShape = zonePolygons[topic.category];
    
    const zoneCenter = getPolygonCenter(zoneShape);
    const parentPos = parentNode.lat && parentNode.lng 
      ? [parentNode.lat, parentNode.lng] 
      : zoneCenter;

    do {
      const angle = Math.random() * Math.PI * 2;
      const distance = 0.3 + Math.random() * 1.2;
      point = [
        parentPos[0] + Math.cos(angle) * distance,
        parentPos[1] + Math.sin(angle) * distance
      ];
      attempts++;
      
      if (attempts >= maxAttempts) {
        const centerAngle = Math.random() * Math.PI * 2;
        const centerDistance = Math.random() * 0.5;
        point = [
          zoneCenter[0] + Math.cos(centerAngle) * centerDistance,
          zoneCenter[1] + Math.sin(centerAngle) * centerDistance
        ];
        break;
      }
    } while (!isPointInPolygon(point, zoneShape));
    
    topic.lat = point[0];
    topic.lng = point[1];
  });
}

// Функция для получения точки с минимальным расстоянием от других точек
function getUniformPointWithSpacing(polygon, existingPoints, minDistance) {
  // Находим ограничивающий прямоугольник
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  polygon.forEach(point => {
    minX = Math.min(minX, point[0]);
    maxX = Math.max(maxX, point[0]);
    minY = Math.min(minY, point[1]);
    maxY = Math.max(maxY, point[1]);
  });
  
  let point;
  let attempts = 0;
  const maxAttempts = 1000;
  
  do {
    const x = minX + Math.random() * (maxX - minX);
    const y = minY + Math.random() * (maxY - minY);
    point = [x, y];
    attempts++;
    
    // Проверяем, находится ли точка внутри полигона
    const isInside = isPointInPolygon(point, polygon);
    
    // Проверяем минимальное расстояние до других точек
    let hasEnoughSpace = true;
    if (isInside && existingPoints.length > 0) {
      for (const existingPoint of existingPoints) {
        const distance = Math.sqrt(
          Math.pow(point[0] - existingPoint[0], 2) + 
          Math.pow(point[1] - existingPoint[1], 2)
        );
        if (distance < minDistance) {
          hasEnoughSpace = false;
          break;
        }
      }
    }
    
    if (isInside && hasEnoughSpace) {
      break;
    }
    
  } while (attempts < maxAttempts);
  
  // Если не удалось найти точку с требуемым расстоянием, используем любую точку внутри полигона
  if (attempts >= maxAttempts) {
    console.log(`Не удалось найти точку с минимальным расстоянием ${minDistance} после ${maxAttempts} попыток`);
    return getRandomPointInPolygon(polygon);
  }
  
  return point;
}

// Функция для равномерного распределения точек в полигоне
function getUniformPointInPolygon(polygon) {
  // Находим ограничивающий прямоугольник
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  polygon.forEach(point => {
    minX = Math.min(minX, point[0]);
    maxX = Math.max(maxX, point[0]);
    minY = Math.min(minY, point[1]);
    maxY = Math.max(maxY, point[1]);
  });
  
  // Пробуем найти точку внутри полигона
  let point;
  let attempts = 0;
  const maxAttempts = 1000;
  
  do {
    const x = minX + Math.random() * (maxX - minX);
    const y = minY + Math.random() * (maxY - minY);
    point = [x, y];
    attempts++;
  } while (!isPointInPolygon(point, polygon) && attempts < maxAttempts);
  
  // Если не удалось найти точку, используем случайную из существующего метода
  if (attempts >= maxAttempts) {
    return getRandomPointInPolygon(polygon);
  }
  
  return point;
}

    // Проверка распределения точек для всех зон
    function validateDistribution() {
      const zoneMap = {};
      zones.forEach(zone => {
        zoneMap[zone.name] = zone.shape;
      });

      allTopics.forEach(topic => {
        // Пропускаем точки с кастомными координатами
        if (topic.lat === undefined || topic.lng === undefined) return;

        const zoneShape = zoneMap[topic.category];
        if (!zoneShape) {
          console.error(`Не найдена зона для категории: ${topic.category}`);
          return;
        }

        if (!isPointInPolygon([topic.lat, topic.lng], zoneShape)) {
          console.warn(`Тема "${topic.name}" (${topic.category}) выходит за границы зоны!`);
          // Автоматическое исправление
          const point = getRandomPointInPolygon(zoneShape);
          topic.lat = point[0];
          topic.lng = point[1];
        }
      });
    }

// Создаем соединения между точками
function createConnections() {
  connections.forEach(conn => {
    const sourceNode = [...mainNodes, ...allTopics].find(n => n.id === conn.source);
    const targetNode = [...mainNodes, ...allTopics].find(n => n.id === conn.target);
    
    if (sourceNode && targetNode) {
      const sourcePos = sourceNode.marker ? sourceNode.marker.getLatLng() : [sourceNode.lat, sourceNode.lng];
      const targetPos = targetNode.marker ? targetNode.marker.getLatLng() : [targetNode.lat, targetNode.lng];
      
      const connection = L.polyline(
        [sourcePos, targetPos],
        { 
          color: conn.color || '#dddddd', // Все линии бледно-серые
          weight: 1,
          opacity: 0.4,
          className: 'faded-element connection-line'
        }
      ).addTo(layers.connections);

      // Сохраняем ссылку на соединение у узлов
      if (!sourceNode.connections) sourceNode.connections = [];
      if (!targetNode.connections) targetNode.connections = [];
      sourceNode.connections.push(connection);
      targetNode.connections.push(connection);

      // И главное: сохраняем саму линию в объекте связи
      conn.line = connection;
    }
  });
}

    // Добавляем все подтемы на карту
    allTopics.forEach(topic => {
      const color = categoryColors[topic.category];
      const parentNode = [...mainNodes, ...allTopics].find(n => n.id === topic.parent);
      
      if (!topic.lat || !topic.lng) return;

      // Маркер подтемы
      const marker = L.circleMarker([topic.lat, topic.lng], {
        radius: 6,
        fillColor: color,
        color: "#fff",
        weight: 0.8,
        opacity: 0.8,
        fillOpacity: 1
      }).addTo(layers.subtopics);

      topic.marker = marker;

      // Обработчик клика для подтемы
      let lastClickTime = 0;
      marker.on('click', function(e) {
        const now = Date.now();
        if (now - lastClickTime < 300) { // Двойной клик
          resetHighlight();
          lastClickTime = 0;
          return;
        }
        lastClickTime = now;
        
        highlightNode(topic.id);
        showModal(topic);
      });

      // Постоянная подпись
      const label = L.divIcon({
        html: `<div class="node-label">${topic.name}</div>`,
        className: 'node-label-container',
        iconSize: [0, 0]
      });
      
      L.marker([topic.lat, topic.lng], {
        icon: label,
        zIndexOffset: 1000
      }).addTo(layers.labels);

      
      // Связь с родительским узлом
      if (parentNode) {
        const parentPos = parentNode.marker 
          ? parentNode.marker.getLatLng() 
          : [parentNode.lat, parentNode.lng];
        
        const connection = L.polyline(
          [[topic.lat, topic.lng], parentPos],
          { 
            color: '#dddddd', // Бледно-серая линия
            weight: 1,
            opacity: 0.5
          }
        ).addTo(layers.connections);

        // Сохраняем ссылки
        topic.marker = marker;
        topic.connection = connection;
        topic.parentNode = parentNode;
      }
    });

// Функция для подсветки связанных узлов
function highlightNode(nodeId) {
  // Сначала возвращаем всё в базовое состояние
  resetHighlight();

  // Лёгко приглушаем ВСЕ точки и линии,
  // чтобы потом выделенные смотрелись контрастно
  allTopics.forEach(topic => {
    if (topic.marker) {
      topic.marker.setStyle({
        fillOpacity: 0.2,
        radius: 4,
        color: '#666666',
        weight: 0.5
      });
    }
    if (topic.connection) {
      topic.connection.setStyle({
        color: '#555555',
        opacity: 0.15,
        weight: 0.8
      });
    }
    if (topic.connections) {
      topic.connections.forEach(c => {
        c.setStyle({
          color: '#555555',
          opacity: 0.15,
          weight: 0.8
        });
      });
    }
  });

  mainNodes.forEach(node => {
    if (node.marker) {
      node.marker.setStyle({
        fillOpacity: 0.3,
        radius: 6,
        color: '#666666',
        weight: 1
      });
    }
    if (node.connections) {
      node.connections.forEach(c => {
        c.setStyle({
          color: '#555555',
          opacity: 0.15,
          weight: 0.8
        });
      });
    }
  });

  

  // Ищем выбранный узел
  const selectedNode = [...mainNodes, ...allTopics].find(n => n.id === nodeId);
  if (!selectedNode) return;

  // Вспомогательные функции яркой подсветки
  const highlightMarker = (marker) => {
    if (!marker) return;
    const baseRadius = marker.options.radius || 6;
    marker.setStyle({
      fillOpacity: 1,
      radius: baseRadius + 3,
      color: '#ffffff',
      weight: 2
    });
  };

  const highlightLine = (line) => {
    if (!line) return;
    line.setStyle({
      color: '#ffffff',
      opacity: 1,
      weight: 3
    });
  };

  // 1) Сам выбранный узел
  if (selectedNode.marker) {
    highlightMarker(selectedNode.marker);
  }

  // 2) Родитель + линия до него (если есть parent)
  if (selectedNode.parent) {
    const parentNode = [...mainNodes, ...allTopics].find(n => n.id === selectedNode.parent);
    if (parentNode && parentNode.marker) {
      highlightMarker(parentNode.marker);
    }
    if (selectedNode.connection) {
      highlightLine(selectedNode.connection);
    }
  }

  // 3) Дочерние узлы и их линии к выбранному
  const childNodes = allTopics.filter(t => t.parent === nodeId);
  childNodes.forEach(child => {
    if (child.marker) highlightMarker(child.marker);
    if (child.connection) highlightLine(child.connection);
  });

  // 4) Дополнительные связи из массива connections
  connections.forEach(conn => {
    if (conn.source === nodeId || conn.target === nodeId) {
      const otherId = (conn.source === nodeId) ? conn.target : conn.source;

      const otherNode = [...mainNodes, ...allTopics].find(n => n.id === otherId);
      if (otherNode && otherNode.marker) {
        highlightMarker(otherNode.marker);
      }

      const line = findConnectionLine(conn.source, conn.target);
      if (line) {
        highlightLine(line);
      }
    }
  });
}

// Вспомогательная функция для поиска линии соединения между двумя id
function findConnectionLine(sourceId, targetId) {
  const sourceNode = [...mainNodes, ...allTopics].find(n => n.id === sourceId);
  const targetNode = [...mainNodes, ...allTopics].find(n => n.id === targetId);

  if (!sourceNode || !targetNode) return null;

  const sourcePos = sourceNode.marker
    ? sourceNode.marker.getLatLng()
    : L.latLng(sourceNode.lat, sourceNode.lng);

  const targetPos = targetNode.marker
    ? targetNode.marker.getLatLng()
    : L.latLng(targetNode.lat, targetNode.lng);

  let found = null;

  layers.connections.eachLayer(layer => {
    if (found || !layer.getLatLngs) return;

    const latLngs = layer.getLatLngs();
    if (!Array.isArray(latLngs) || latLngs.length !== 2) return;

    const a = latLngs[0];
    const b = latLngs[1];

    const direct =
      a.equals(sourcePos) && b.equals(targetPos);
    const reverse =
      a.equals(targetPos) && b.equals(sourcePos);

    if (direct || reverse) {
      found = layer;
    }
  });

  return found;
}

    
    // Вспомогательная функция для поиска линии соединения

   // Функция для сброса подсветки
function resetHighlight() {
  // 🔹 Сбрасываем все подтемы
  allTopics.forEach(topic => {
    if (topic.marker) {
      topic.marker.setStyle({
        fillOpacity: 1,
        radius: 5,
        color: '#fff',
        weight: 1
      });
    }
    if (topic.connection) {
      topic.connection.setStyle({
        color: '#dddddd',
        opacity: 0.5,
        weight: 1
      });
    }
    if (topic.connections) {
      topic.connections.forEach(conn => {
        conn.setStyle({
          color: '#dddddd',
          opacity: 0.4,
          weight: 1
        });
      });
    }
  });
  
  // 🔹 Сбрасываем основные узлы
  mainNodes.forEach(node => {
    if (node.marker) {
      node.marker.setStyle({
        fillOpacity: 1,
        radius: 8,
        color: '#fff',
        weight: 1.5
      });
    }
    if (node.connections) {
      node.connections.forEach(conn => {
        conn.setStyle({
          color: '#dddddd',
          opacity: 0.4,
          weight: 1
        });
      });
    }
  });

  // 🔹 Сбрасываем все линии из массива connections
  connections.forEach(conn => {
    if (conn.line) {
      conn.line.setStyle({
        color: conn.color || '#dddddd',
        opacity: 0.4,
        weight: 1
      });
    }
  });
}

window.resetHighlight = resetHighlight;

    // Функция для обновления карусели изображений
    function updateCarousel(nodeId) {
      const carouselInner = document.getElementById('carousel-inner');
      const carouselIndicators = document.getElementById('carousel-indicators');
      
      // Очищаем карусель
      carouselInner.innerHTML = '';
      carouselIndicators.innerHTML = '';
      
      // Получаем изображения для текущего узла
      const images = additionalData.images[nodeId] || [];
      carouselState.totalItems = images.length;
      carouselState.currentIndex = 0;
      
      // Добавляем изображения в карусель
      images.forEach((imgSrc, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.style.backgroundImage = `url(${imgSrc})`;
        carouselInner.appendChild(item);
        
        // Добавляем индикатор
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => moveCarouselTo(index));
        carouselIndicators.appendChild(indicator);
      });
      
      // Обновляем позицию карусели
      moveCarouselTo(0);
    }

    // Функция для перемещения карусели
    function moveCarousel(direction) {
      const newIndex = carouselState.currentIndex + direction;
      
      // Проверяем границы
      if (newIndex < 0) {
        moveCarouselTo(carouselState.totalItems - 1);
      } else if (newIndex >= carouselState.totalItems) {
        moveCarouselTo(0);
      } else {
        moveCarouselTo(newIndex);
      }
    }

    // Функция для перемещения карусели к конкретному индексу
    function moveCarouselTo(index) {
      if (carouselState.totalItems === 0) return;
      
      // Ограничиваем индекс
      index = (index + carouselState.totalItems) % carouselState.totalItems;
      carouselState.currentIndex = index;
      
      // Обновляем позицию
      const carouselInner = document.getElementById('carousel-inner');
      carouselInner.style.transform = `translateX(-${index * 100}%)`;
      
      // Обновляем индикаторы
      const indicators = document.querySelectorAll('.carousel-indicator');
      indicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }

    // Функция для показа модального окна
function showModal(node) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalHistory = document.getElementById('modal-history');
  const modalApplications = document.getElementById('modal-applications');
  const modalVariables = document.getElementById('modal-variables');
  const modalFormula = document.getElementById('modal-formula');

  modalTitle.textContent = node.name;
  modalDescription.textContent = descriptions[node.id] || 'Описание отсутствует';
  modalHistory.textContent = additionalData.history[node.id] || 'Историческая справка отсутствует';
  modalApplications.textContent = additionalData.applications[node.id] || 'Информация о применении отсутствует';
  modalVariables.textContent = additionalData.variables[node.id] || 'Данные о переменных отсутствуют';

  // 🔹 Добавляем формулу (до отображения модалки)
  const formulaData = additionalData.formulas?.[node.id]?.latex;
  if (formulaData) {
    modalFormula.innerHTML = `\\(${formulaData}\\)`; // LaTeX формат
  } else {
    modalFormula.innerHTML = 'Формула отсутствует';
  }

  // 🔹 Теперь показываем окно
  modal.style.display = 'flex';

  // 🔹 Дожидаемся появления окна и рендерим формулу
  setTimeout(() => {
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([modal]);
    }
  }, 50);

  // 🔹 Обновляем карусель
  updateCarousel(node.id);
}

    // Обновлённая функция showAdditionalModal
function showAdditionalModal(type) {
  const additionalModal = document.getElementById('additional-modal');
  const additionalModalTitle = document.getElementById('additional-modal-title');
  const additionalModalContent = document.getElementById('additional-modal-content');
  
  let content = '';
  switch(type) {
    case 0:
      additionalModalTitle.textContent = 'Полное описание';
      content = document.getElementById('modal-description').textContent;
      break;
    case 1:
      additionalModalTitle.textContent = 'Историческая справка';
      content = document.getElementById('modal-history').textContent;
      break;
    case 2:
      additionalModalTitle.textContent = 'Практическое применение';
      content = document.getElementById('modal-applications').textContent;
      break;
    case 3:
      additionalModalTitle.textContent = 'Ключевые переменные';
      content = document.getElementById('modal-variables').textContent;
      break;
  }
  
  additionalModalContent.textContent = content;
  additionalModal.style.display = 'flex';
}

    // Обработчик закрытия модального окна
    document.querySelector('.close-modal').addEventListener('click', function() {
      document.getElementById('modal').style.display = 'none';
      
    });

    // Обработчик закрытия дополнительного модального окна
    document.querySelector('.close-additional-modal').addEventListener('click', function() {
      document.getElementById('additional-modal').style.display = 'none';
    });

    // Обработчик клика вне модального окна
    document.getElementById('modal').addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
        
      }
    });

    // Обработчик клика вне дополнительного модального окна
    document.getElementById('additional-modal').addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    });

    // Обработчик двойного клика на карте
map.on('dblclick', function() {
  resetHighlight();
});

    // Поиск по темам
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      allTopics.forEach(topic => {
        if (topic.marker) {
          const content = topic.name.toLowerCase();
          if (content.includes(searchTerm)) {
            topic.marker.setStyle({ fillOpacity: 0.8, radius: 7 });
            if (topic.connection) topic.connection.setStyle({ opacity: 0.8 });
            if (topic.connections) topic.connections.forEach(c => c.setStyle({ opacity: 0.8 }));
          } else {
            topic.marker.setStyle({ fillOpacity: 0.6, radius: 5 });
            if (topic.connection) topic.connection.setStyle({ opacity: 0.3 });
            if (topic.connections) topic.connections.forEach(c => c.setStyle({ opacity: 0.3 }));
          }
        }
      });
    });

    // Управление фильтрами
    function setupFilters() {
      document.querySelectorAll('.category-filter').forEach(filter => {
        filter.addEventListener('change', updateFilters);
      });

      document.querySelectorAll('.element-filter').forEach(filter => {
        filter.addEventListener('change', updateFilters);
      });
    }

    // Обновление фильтров
    function updateFilters() {
      const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(cb => cb.value);

      const selectedElements = Array.from(document.querySelectorAll('.element-filter:checked'))
        .map(cb => cb.value);

      // Фильтрация по категориям
      allTopics.forEach(topic => {
        const visible = selectedCategories.includes(topic.category);
        if (topic.marker) topic.marker.setStyle({ opacity: visible ? 0.8 : 0 });
        if (topic.connection) topic.connection.setStyle({ opacity: visible ? 0.5 : 0 });
        if (topic.connections) topic.connections.forEach(c => c.setStyle({ opacity: visible ? 0.4 : 0 }));
      });

      
      // Управление слоями
      

      if (selectedElements.includes('nodes')) {
        map.addLayer(layers.nodes);
        map.addLayer(layers.nodeGlows);
      } else {
        map.removeLayer(layers.nodes);
        map.removeLayer(layers.nodeGlows);
      }

      if (selectedElements.includes('subtopics')) {
        map.addLayer(layers.subtopics);
      } else {
        map.removeLayer(layers.subtopics);
      }

      if (selectedElements.includes('connections')) {
        map.addLayer(layers.connections);
      } else {
        map.removeLayer(layers.connections);
      }

      map.addLayer(layers.labels);
    }

    // Настройка системы масштабирования для заголовков
    function updateLabelsVisibility() {
      const currentZoom = map.getZoom();
      const maxZoomForNodeLabels = 7;
      const minZoomForZoneLabels = 1;
      
      let nodeOpacity = 0;
      let nodeFontSize = 8;
      if (currentZoom >= maxZoomForNodeLabels) {
        nodeOpacity = 0.9;
        nodeFontSize = 11;
      } else if (currentZoom >= maxZoomForNodeLabels - 1) {
        nodeOpacity = 0.9 * (currentZoom - (maxZoomForNodeLabels - 1));
        nodeFontSize = 8 + 3 * (currentZoom - (maxZoomForNodeLabels - 1));
      }
      
      let zoneOpacity = 0;
      let zoneFontSize = 10;
      if (currentZoom <= minZoomForZoneLabels) {
        zoneOpacity = 0.8;
        zoneFontSize = 13;
      } else if (currentZoom <= minZoomForZoneLabels + 2) {
        zoneOpacity = 0.8 * (1 - (currentZoom - minZoomForZoneLabels) / 2);
        zoneFontSize = 10 + 3 * (1 - (currentZoom - minZoomForZoneLabels) / 2);
      }
      
      document.querySelectorAll('.node-label').forEach(label => {
        label.style.opacity = nodeOpacity;
        label.style.fontSize = `${nodeFontSize}px`;
      });
      
      document.querySelectorAll('.zone-label').forEach(label => {
        label.style.opacity = zoneOpacity;
        label.style.fontSize = `${zoneFontSize}px`;
      });
    }

    // Инициализация
    distributeTopics();
    validateDistribution();
    setupFilters();
    createConnections();
    map.on('zoomend', updateLabelsVisibility);
    map.fitBounds([[3, 3], [13, 13]]);
    updateLabelsVisibility();

    // Сворачивание групп фильтров
    document.querySelectorAll('.filter-group-title').forEach(title => {
      title.addEventListener('click', () => {
        title.parentElement.classList.toggle('collapsed');
      });
    });

    // Добавляем обработчики свайпа для карусели
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.querySelector('.image-carousel');
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      const threshold = 50; // Минимальное расстояние свайпа
      
      if (touchStartX - touchEndX > threshold) {
        // Свайп влево - следующее изображение
        moveCarousel(1);
      } else if (touchEndX - touchStartX > threshold) {
        // Свайп вправо - предыдущее изображение
        moveCarousel(-1);
      }
    }
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");

  if (!searchInput) {
    console.warn("⚠️ Элемент #search-input не найден в DOM");
    return;
  }

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim().toLowerCase();
      if (!query) return;

      const match =
        allTopics.find(t => t.name.toLowerCase().includes(query)) ||
        mainNodes.find(n => n.name.toLowerCase().includes(query));

      if (match) {
        // Плавный зум на найденную точку
        map.flyTo([match.lat, match.lng], 12, { animate: true, duration: 1.5 });

        const color = categoryColors[match.category] || "#ffffff";
        const highlight = L.circleMarker([match.lat, match.lng], {
          radius: 12,
          color: color,
          fillColor: color,
          fillOpacity: 0.6,
          weight: 3,
        }).addTo(map)
          .bindTooltip(match.name, { permanent: true, direction: "top" })
          .openTooltip();

        // Открытие модалки для найденного результата
        if (typeof showModal === "function") showModal(match);

        // Убираем маркер через 3 секунды
        setTimeout(() => map.removeLayer(highlight), 3000);
      } else {
        console.warn("⚠️ Точка не найдена:", query);
      }
    }
  });
});

