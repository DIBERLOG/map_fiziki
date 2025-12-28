// script.js — полностью готовый файл
// Сохраните как js/script.js и подключите в index.html
// Комментарии на русском, все слушатели локальные, нет "глобальных ловушек"

// eslint-disable-next-line no-unused-vars
(() => {
  "use strict";

  /* ============================
     Общие помощники / guards
     ============================ */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const safe = (fn) => { try { fn(); } catch (e) { console.error(e); } };

  // простой debounce
  function debounce(fn, ms = 200) {
    let t = null;
    return function(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // escape HTML (для вставок в innerHTML)
  function esc(s) {
    if (s === undefined || s === null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // проверка координат
  function isValidLatLng(lat, lng) {
    return typeof lat === "number" && typeof lng === "number" &&
           isFinite(lat) && isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  }

  /* ============================
     Конфигурация (можно править)
     ============================ */
  const CONFIG = {
    selectors: {
      mapContainer: "#map",
      toggleFilter: "#toggle-filter",
      closeFilter: "#close-filter",
      filterPanel: "#filter-panel",
      modal: "#modal",
      additionalModal: "#additional-modal",
      imageLoader: "#image-loader",
      pageLoader: ".loader-wrapper",
      carouselInner: "#carousel-inner",
      carouselIndicators: "#carousel-indicators",
      carouselPrev: ".carousel-control.prev",
      carouselNext: ".carousel-control.next",
      searchInput: "#search-input",
      zoomInBtn: "#zoom-in",
      zoomOutBtn: "#zoom-out",
      zoomBtn: "#zoomBtn",
      imageZoomView: "#imageZoomView",
      imageZoomContent: "#imageZoomContent",
      imageZoomClose: "#imageZoomClose",
      infoPanel: "#info-panel",
      searchResults: "#searchResults"
    },
    audio: {
      transition: "assets/sound/transition-9.mp3",
      warningVolume: 0.6
    },
    style: {
      highlightRadius: 14,
      highlightOpacity: 1,
      defaultRadius: 6,
      defaultFillOpacity: 0.9
    },
    mapDefaults: {
      center: [55.751244, 37.618423],
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      tileOpts: { attribution: "© OpenStreetMap contributors" }
    }
  };

  /* ============================
     Состояние приложения
     ============================ */
  const STATE = {
    map: window.map || null,     // если карта уже создана в index.html, возьмём её
    allTopics: window.allTopics || [],      // ожидаемые данные: массив топиков
    categoryColors: window.categoryColors || {}, // цвета по категориям (опционально)
    carousel: {
      images: [],
      index: 0
    },
    originalMarkerStyles: new Map(), // для возврата стилей
    audio: {
      transition: null,
      warning: null
    },
    currentLoaderTimeout: null
  };

  /* ============================
     Инициализация DOM-элементов после загрузки
     ============================ */
  document.addEventListener("DOMContentLoaded", () => {
    // селекторы
    const toggleBtn = $(CONFIG.selectors.toggleFilter);
    const closeBtn = $(CONFIG.selectors.closeFilter);
    const panel = $(CONFIG.selectors.filterPanel);

    const modal = $(CONFIG.selectors.modal);
    const additionalModal = $(CONFIG.selectors.additionalModal);

    const imageLoader = $(CONFIG.selectors.imageLoader);
    const pageLoader = $(CONFIG.selectors.pageLoader);

    const carouselInner = $(CONFIG.selectors.carouselInner);
    const indicators = $(CONFIG.selectors.carouselIndicators);
    const prevControl = $(CONFIG.selectors.carouselPrev);
    const nextControl = $(CONFIG.selectors.carouselNext);

    const searchInput = $(CONFIG.selectors.searchInput);
    const searchResultsContainer = $(CONFIG.selectors.searchResults);

    const zoomInBtn = $(CONFIG.selectors.zoomInBtn);
    const zoomOutBtn = $(CONFIG.selectors.zoomOutBtn);
    const zoomBtn = $(CONFIG.selectors.zoomBtn);
    const imageZoomView = $(CONFIG.selectors.imageZoomView);
    const imageZoomContent = $(CONFIG.selectors.imageZoomContent);
    const imageZoomClose = $(CONFIG.selectors.imageZoomClose);

    // локальные ссылки на данные
    let allTopics = Array.isArray(STATE.allTopics) ? STATE.allTopics : [];
    let categoryColors = STATE.categoryColors || {};

    /* ============================
       Если карта ещё не создана — создаём Leaflet-карту
       (безопасно: если у вас своя карта — этот код не испортит её)
       ============================ */
    function ensureMap() {
      if (STATE.map && typeof STATE.map.getCenter === "function") return STATE.map;

      const mapContainer = $(CONFIG.selectors.mapContainer);
      if (!mapContainer) {
        console.warn("Контейнер карты не найден. Проверьте, что в HTML есть элемент #map");
        return null;
      }

      try {
        // eslint-disable-next-line no-undef
        const m = L.map(mapContainer, { zoomControl: true, minZoom: CONFIG.mapDefaults.minZoom, maxZoom: CONFIG.mapDefaults.maxZoom })
          .setView(CONFIG.mapDefaults.center, CONFIG.mapDefaults.zoom);

        

        STATE.map = m;
        return m;
      } catch (e) {
        console.error("Не удалось инициализировать Leaflet-карту:", e);
        return null;
      }
    }

    // инициализируем карту (если нужно)
    const map = ensureMap();

    /* ============================
       FILTER PANEL: открыть/закрыть
       ============================ */
    if (toggleBtn && closeBtn && panel) {
      toggleBtn.addEventListener("click", () => {
        panel.style.display = "block";
        requestAnimationFrame(() => panel.classList.add("visible"));
        toggleBtn.classList.add("hidden");
      });
      closeBtn.addEventListener("click", () => {
        panel.classList.remove("visible");
        setTimeout(() => {
          panel.style.display = "none";
          toggleBtn.classList.remove("hidden");
        }, 450);
      });
    }

    /* ============================
       Подкатегории — раскрытие
       ============================ */
    $$(".category-block .expandable").forEach(block => {
      block.addEventListener("click", () => {
        const parent = block.closest(".category-block");
        const subGroup = parent && parent.querySelector(".sub-filter-group");
        if (!subGroup) return;
        parent.classList.toggle("open");
        subGroup.classList.toggle("open");
      });
    });

    /* =================================================
       Подсветка — логика (лампочки / белая вспышка)
       ================================================= */
    // для хранения оригинального стиля каждой точки
    const originalMarkerStyles = STATE.originalMarkerStyles;

    function saveOriginalStyle(id, marker) {
      if (!id || !marker) return;
      if (!originalMarkerStyles.has(id)) {
        originalMarkerStyles.set(id, {
          radius: marker.options.radius,
          color: marker.options.color,
          fillColor: marker.options.fillColor,
          fillOpacity: marker.options.fillOpacity,
          weight: marker.options.weight
        });
      }
    }

    function restoreOriginalStyle(id, marker) {
      if (!id || !marker) return;
      const data = originalMarkerStyles.get(id);
      if (!data) return;
      marker.setStyle({
        radius: data.radius,
        color: data.color,
        fillColor: data.fillColor,
        fillOpacity: data.fillOpacity,
        weight: data.weight
      });
      originalMarkerStyles.delete(id);
    }

    // toggle подсветки — белая / обратно
    function toggleHighlight(id, btn) {
      const topic = allTopics.find(t => t.id === id);
      if (!topic || !topic.marker) return;
      const marker = topic.marker;

      if (originalMarkerStyles.has(id)) {
        // уже подсвечено, сбросим
        restoreOriginalStyle(id, marker);
        if (btn) btn.classList.remove("active");
        return;
      }

      // сохраним оригинал
      saveOriginalStyle(id, marker);

      // установим стиль подсветки
      if (btn) btn.classList.add("active");
      marker.setStyle({
        radius: CONFIG.style.highlightRadius,
        color: "#ffffff",
        fillColor: "#ffffff",
        fillOpacity: CONFIG.style.highlightOpacity,
        weight: 2
      });

      // пан к маркеру (аккуратно)
      if (map && typeof marker.getLatLng === "function") {
        safe(() => map.panTo(marker.getLatLng()));
      }
    }

    // highlight + длинное пульсирование + flyTo
    function highlightAndZoomWhite(id, btn) {
  const topic = allTopics.find(t => t.id === id);
  if (!topic || !topic.marker) return;

  const marker = topic.marker;
  const latlng = marker.getLatLng ? marker.getLatLng() : null;

  // сохранить оригинальный стиль
  saveOriginalStyle(id, marker);
  const original = originalMarkerStyles.get(id);

  // --- МЯГКОЕ АДАПТИВНОЕ ПРИБЛИЖЕНИЕ ---
  if (map && latlng) {
    const currentZoom = map.getZoom ? map.getZoom() : CONFIG.mapDefaults.zoom;
    let targetZoom = currentZoom;

    if (currentZoom < 6) targetZoom = 7;
    else if (currentZoom < 9) targetZoom = currentZoom + 1;

    try {
      map.flyTo(latlng, targetZoom, {
        animate: true,
        duration: 1.0
      });
    } catch (e) {}
  }

  // подсветка кнопки
  if (btn) btn.classList.add("active");

  // --- ЯРКАЯ ПОДСВЕТКА ТОЧКИ ---
  marker.setStyle({
    radius: (CONFIG.style.highlightRadius || 8) + 2,
    color: "#ffffff",
    fillColor: "#ffffff",
    fillOpacity: 1,
    weight: 1
  });

  // --- МЯГКАЯ ПУЛЬСАЦИЯ ---
  let pulseActive = true;
  const pulseInterval = setInterval(() => {
    if (!pulseActive) return;
    const cur = marker.options.fillOpacity || 1;
    marker.setStyle({ fillOpacity: cur === 1 ? 0.45 : 1 });
  }, 550);

  // --- ВОССТАНОВЛЕНИЕ ЧЕРЕЗ 10 СЕК ---
  setTimeout(() => {
    pulseActive = false;
    clearInterval(pulseInterval);

    if (btn) btn.classList.remove("active");

    if (original) {
      restoreOriginalStyle(id, marker);
    } else {
      marker.setStyle({
        radius: CONFIG.style.defaultRadius || 5,
        fillOpacity: CONFIG.style.defaultFillOpacity || 1,
        weight: 1
      });
    }
  }, 10000);
}


    // делегированный обработчик "лампочек"
document.addEventListener("click", (e) => {
  const btn = e.target.closest && e.target.closest(".eye-btn");
  if (!btn) return;
  const id = btn.dataset && btn.dataset.id;
  if (!id) return;

  // перед новой подсветкой убираем старую, если функция доступна
  if (window.resetHighlight && typeof window.resetHighlight === "function") {
    window.resetHighlight();
  }

  // запускаем только красивый эффект приближения и белой вспышки
  highlightAndZoomWhite(id, btn);
});



    /* ============================
       Map zoom controls (кнопки + клавиши)
       ============================ */
    (function initMapZoomControls() {
      const m = map || STATE.map || ensureMap() || window.map;
      const btnIn = zoomInBtn;
      const btnOut = zoomOutBtn;
      if (!btnIn || !btnOut || !m) return;

      function updateZoomButtons() {
        const z = m.getZoom();
        if (z >= m.getMaxZoom()) {
          btnIn.classList.add("disabled");
          btnIn.setAttribute("disabled", "true");
        } else {
          btnIn.classList.remove("disabled");
          btnIn.removeAttribute("disabled");
        }
        if (z <= m.getMinZoom()) {
          btnOut.classList.add("disabled");
          btnOut.setAttribute("disabled", "true");
        } else {
          btnOut.classList.remove("disabled");
          btnOut.removeAttribute("disabled");
        }
      }

      btnIn.addEventListener("click", () => { if (m.getZoom() < m.getMaxZoom()) m.zoomIn(); updateZoomButtons(); });
      btnOut.addEventListener("click", () => { if (m.getZoom() > m.getMinZoom()) m.zoomOut(); updateZoomButtons(); });

      m.on("zoomend zoomlevelschange moveend", updateZoomButtons);
      document.addEventListener("keydown", (ev) => {
        if (ev.target && (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA")) return;
        if (ev.key === "+" || ev.key === "=") { if (m.getZoom() < m.getMaxZoom()) m.zoomIn(); updateZoomButtons(); }
        else if (ev.key === "-") { if (m.getZoom() > m.getMinZoom()) m.zoomOut(); updateZoomButtons(); }
      });

      updateZoomButtons();
    })();

    /* ============================
       Page loader: плавное скрытие
       ============================ */
    if (pageLoader) {
      window.addEventListener("load", () => {
        pageLoader.style.opacity = "0";
        setTimeout(() => { pageLoader.style.display = "none"; }, 500);
      });
    }

    /* ============================
       WARN ENTITY: предупреждение при полном отдалении (minZoom)
       ============================ */
    (function initWarningEntity() {
      const warning = $("#warning-entity");
      const mapEl = $("#map");
      if (!warning || !map || !mapEl) return;

      const sound = new Audio(CONFIG.audio.transition);
      sound.volume = CONFIG.audio.warningVolume;
      let soundReady = false;
      const unlockSound = () => {
        // теневой пробный запуск - для обхода автоплей блокировок в браузерах
        sound.play().then(() => {
          sound.pause();
          sound.currentTime = 0;
          soundReady = true;
          document.removeEventListener("click", unlockSound);
          document.removeEventListener("mousemove", unlockSound);
          document.removeEventListener("touchstart", unlockSound);
          document.removeEventListener("pointerdown", unlockSound);
        }).catch(() => {});
      };
      document.addEventListener("click", unlockSound);
      document.addEventListener("mousemove", unlockSound);
      document.addEventListener("touchstart", unlockSound, { passive: true });
      document.addEventListener("pointerdown", unlockSound);

      let isVisible = false;
      let textTimer = null;

      map.on("zoomend", () => {
        const currentZoom = map.getZoom();
        const minZoom = map.getMinZoom();
        if (currentZoom <= minZoom && !isVisible) {
          isVisible = true;
          mapEl.classList.add("darkened");
          warning.style.display = "flex";
          warning.style.opacity = "0";
          warning.style.top = "-300px";
          warning.style.animation = "floatEntity 4s ease-in-out infinite";
          setTimeout(() => {
            warning.style.top = "25%";
            warning.style.opacity = "1";
            if (soundReady) { sound.currentTime = 0; sound.play().catch(()=>{}); }
          }, 100);

          const message = warning.querySelector(".message");
          if (message) {
            let toggle = false;
            textTimer = setInterval(() => {
              message.style.transition = "opacity 1.5s ease";
              message.style.opacity = "0";
              setTimeout(() => {
                message.textContent = toggle ? "Дальше нельзя, возвращайся обратно!" : "Ты слишком далеко зашел...";
                toggle = !toggle;
                message.style.opacity = "1";
              }, 1500);
            }, 20000);
          }
        } else if (currentZoom > minZoom && isVisible) {
          isVisible = false;
          mapEl.classList.remove("darkened");
          clearInterval(textTimer);
          warning.style.transition = "top 1.2s ease, opacity 1.2s ease";
          warning.style.opacity = "0";
          warning.style.top = "-300px";
          warning.style.animation = "none";
          setTimeout(() => warning.style.display = "none", 1200);
        }
      });
    })();

    /* ============================
       КАРУСЕЛЬ и загрузка изображений:
       fetchImagesForTopic + renderCarousel
       ============================ */

    // небольшой словарь пользовательских картинок (локально)
    const userImages = {
      "ontology": [
        "https://iai.tv/assets/Uploads/Maudlin-Final.webp",
        "https://education.cosmosmagazine.com/wp-content/uploads/2021/02/Header_Quantum-Philosophy_640x360.png"
      ],
      "epistemology": [
        "https://upload.wikimedia.org/wikipedia/commons/9/9c/Knowledge_representation_diagram.png",
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Epistemology_graph.svg",
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/Scientific_method_diagram.svg",
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Probability_distribution_diagram.svg"
      ],
      "quantum_philosophy": [
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Quantum_mechanics_double-slit_experiment.png",
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Quantum_superposition_diagram.svg"
      ]
    };

    // функция для определения категории по имени (хитро, но просто)
    function detectCategory(name) {
      name = (name || "").toLowerCase();
      if (name.match(/(вселен|галак|космос|релятив|астро|звезд|планет)/)) return "astro";
      if (name.match(/(квант|атом|частиц|суперпозиция|энергет|волнов)/)) return "quantum";
      if (name.match(/(тепл|давлен|энтроп|термо)/)) return "thermo";
      if (name.match(/(электр|магнит|индукц|напряж|ток)/)) return "electro";
      if (name.match(/(механ|движ|ускор|сила|инерц)/)) return "mechanics";
      if (name.match(/(оптик|свет|линз|зеркал)/)) return "optics";
      if (name.match(/(философ|сознани|реальн|смысл|эпистем)/)) return "philosophy";
      return "general";
    }

    // основные "поисковые" источники — попытки с ручным порядком
    // === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ЗАГРУЗКИ ИЗОБРАЖЕНИЙ ИЗ ВНЕШНИХ ИСТОЧНИКОВ ===

// Wikipedia (RU)
async function tryRuWiki(q) {
  try {
    const url = `https://ru.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(q)}`;
    const r = await fetch(url);
    if (!r.ok) return [];
    const d = await r.json();
    return (d.items || [])
      .filter(i => Array.isArray(i.srcset) && i.srcset.length)
      .slice(0, 3)
      .map(i => i.srcset[0].src)
      .filter(Boolean);
  } catch (e) {
    console.error("tryRuWiki error:", e);
    return [];
  }
}

// Wikipedia (EN)
async function tryEnWiki(q) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(q)}`;
    const r = await fetch(url);
    if (!r.ok) return [];
    const d = await r.json();
    return (d.items || [])
      .filter(i => Array.isArray(i.srcset) && i.srcset.length)
      .slice(0, 3)
      .map(i => i.srcset[0].src)
      .filter(Boolean);
  } catch (e) {
    console.error("tryEnWiki error:", e);
    return [];
  }
}

// NASA images (для астротем)
async function tryNASA(q) {
  try {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&media_type=image`;
    const r = await fetch(url);
    if (!r.ok) return [];
    const d = await r.json();
    const items = d.collection?.items || [];
    return items
      .map(i => i.links && i.links[0] && i.links[0].href)
      .filter(Boolean)
      .slice(0, 3);
  } catch (e) {
    console.error("tryNASA error:", e);
    return [];
  }
}

// Wikimedia Commons
async function tryCommons(q) {
  try {
    const api =
      "https://commons.wikimedia.org/w/api.php" +
      "?action=query" +
      "&generator=search" +
      `&gsrsearch=${encodeURIComponent(q)}` +
      "&gsrlimit=5" +
      "&prop=imageinfo" +
      "&iiprop=url" +
      "&format=json" +
      "&origin=*";

    const r = await fetch(api);
    if (!r.ok) return [];
    const d = await r.json();
    const pages = d.query?.pages || {};
    return Object.values(pages)
      .map(p => p.imageinfo && p.imageinfo[0] && p.imageinfo[0].url)
      .filter(Boolean)
      .slice(0, 3);
  } catch (e) {
    console.error("tryCommons error:", e);
    return [];
  }
}

// Pixabay (опционально, если ключ рабочий — иначе просто вернёт [])
async function tryPixabay(q) {
  try {
    const KEY = "34381645-67b9b6ef3e0cfd0b7df18a1b1"; // если не работает — просто будет []
    if (!KEY) return [];
    const url = `https://pixabay.com/api/?key=${KEY}&q=${encodeURIComponent(q)}&image_type=photo&per_page=3`;
    const r = await fetch(url);
    if (!r.ok) return [];
    const d = await r.json();
    return (d.hits || [])
      .slice(0, 3)
      .map(i => i.webformatURL)
      .filter(Boolean);
  } catch (e) {
    console.error("tryPixabay error:", e);
    return [];
  }
}

// fallback: заглушки (можем не использовать, но оставим)
const defaultImages = [
  "https://via.placeholder.com/640x360?text=No+Image+1",
  "https://via.placeholder.com/640x360?text=No+Image+2"
];

// Определение категории (если у тебя уже есть detectCategory — можно использовать его)
function detectCategoryForImages(topicName, category) {
  if (category) return category;

  const t = (topicName || "").toLowerCase();
  if (t.includes("квант") || t.includes("quantum")) return "quantum";
  if (t.includes("звезд") || t.includes("astro") || t.includes("cosmo")) return "astro";
  if (t.includes("философ") || t.includes("ontology") || t.includes("epistemology")) return "philosophy";
  return "general";
}

// Основная функция поиска изображений из внешних библиотек
async function fetchImagesForTopic(topicName, category = null) {
  // 0) если вообще нет темы — считаем, что нечего искать
  if (!topicName) return [];

  // 1) если есть локальные пользовательские изображения (userImages) — используем
  if (userImages && userImages[topicName]) {
    console.log("🟦 userImages для", topicName);
    return userImages[topicName].slice();
  }

  const query = (topicName || "").replace(/_/g, " ").trim();
  const cat = detectCategoryForImages(topicName, category);

  // 2) порядок провайдеров по типу темы
  const order = {
    quantum:      [tryEnWiki, tryRuWiki, tryCommons],
    astro:        [tryNASA, tryEnWiki, tryRuWiki, tryCommons],
    philosophy:   [tryRuWiki, tryEnWiki, tryCommons],
    general:      [tryRuWiki, tryEnWiki, tryCommons, tryPixabay]
  };

  const providers = order[cat] || order.general;

  for (const fn of providers) {
    try {
      const imgs = await fn(query);
      if (imgs && imgs.length) return imgs;
    } catch (e) {
      console.error("image provider error:", e);
    }
  }

  // НИЧЕГО НЕ НАШЛИ — возвращаем пустой массив
  return [];
}



    /* ============================
       Карусель: render / update / controls
       ============================ */
    let carouselImages = STATE.carousel.images;
    let currentIndex = STATE.carousel.index;

    function renderCarousel(imgs = []) {
      carouselImages = imgs.slice();
      currentIndex = 0;
      STATE.carousel.images = carouselImages;
      STATE.carousel.index = currentIndex;

      if (!carouselInner || !indicators) return;

      carouselInner.innerHTML = "";
      indicators.innerHTML = "";

      if (!imgs || imgs.length === 0) {
  const empty = document.createElement("div");
  empty.className = "carousel-item no-images";

  empty.innerHTML = `
    <div class="no-images-wrapper">
      <div class="no-images-emoji">😔</div>
      <div class="no-images-text">Изображения не найдены,<br>возможно ошибка — обновите страницу</div>
    </div>
  `;

  carouselInner.appendChild(empty);
  updateCarousel();
  return;
}




      imgs.forEach((src, i) => {
        const slide = document.createElement("div");
        slide.className = "carousel-item";
        slide.style.backgroundImage = `url('${src}')`;
        slide.setAttribute("data-index", String(i));
        carouselInner.appendChild(slide);

        const dot = document.createElement("div");
        dot.className = "carousel-indicator";
        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
          currentIndex = i;
          updateCarousel();
        });

        indicators.appendChild(dot);
      });

      updateCarousel();
    }

    function updateCarousel() {
      if (!carouselInner) return;
      const container = document.querySelector(".image-carousel");
      if (!container) return;
      const width = container.clientWidth || 640;
      carouselInner.style.transition = "transform 0.45s ease";
      carouselInner.style.transform = `translateX(-${currentIndex * width}px)`;

      Array.from(indicators.children).forEach((d, i) => d.classList.toggle("active", i === currentIndex));
      // обновим глобальное состояние
      STATE.carousel.images = carouselImages;
      STATE.carousel.index = currentIndex;
    }

    function moveCarousel(delta) {
      if (!carouselImages || carouselImages.length === 0) return;
      currentIndex = (currentIndex + delta + carouselImages.length) % carouselImages.length;
      updateCarousel();
    }

    // связываем кнопки управления каруселью, если существуют
    try {
      const prev = prevControl || document.querySelector(".prev");
      const next = nextControl || document.querySelector(".next");
      prev && prev.addEventListener("click", () => moveCarousel(-1));
      next && next.addEventListener("click", () => moveCarousel(1));
      // клавиши <- и ->
      document.addEventListener("keydown", (ev) => {
        if (ev.key === "ArrowLeft") moveCarousel(-1);
        if (ev.key === "ArrowRight") moveCarousel(1);
      });
    } catch (e) { /* ignore */ }

    /* ============================
       showModal — надстройка с загрузкой картинок
       ============================ */
    const originalShowModal = window.showModal;
window.showModal = async function(node) {
  try {
    if (typeof originalShowModal === "function") originalShowModal(node);

    if (!modal) return;

    modal.style.display = "block";
    modal.classList.add("show");

    if (imageLoader) imageLoader.style.display = "block";
    if (indicators) indicators.innerHTML = "";
    if (carouselInner) carouselInner.innerHTML = "";

    const hideLoaderTimeout = setTimeout(() => {
      if (imageLoader) imageLoader.style.display = "none";
    }, 15000);
    STATE.currentLoaderTimeout = hideLoaderTimeout;

    let imageUrls = [];

    // 1) Сначала твой глобальный словарь window.images по id точки
    if (window.images && node && node.id && Array.isArray(window.images[node.id])) {
      imageUrls = window.images[node.id].slice();
    }

    // 2) Потом поле img у самой точки, если такое есть
    if (!imageUrls.length && Array.isArray(node?.img)) {
      imageUrls = node.img.slice();
    }

    // 3) Потом внешние библиотеки
    if (!imageUrls.length) {
      const topicKey = node?.id || node?.name || "";
      imageUrls = await fetchImagesForTopic(topicKey, node?.category || null);
    }

    // 4) Рендерим карусель (если пусто — внутри выведется текст)
    if (imageUrls && imageUrls.length > 0) {
      renderCarousel(imageUrls);
    } else {
      renderCarousel([]);
    }

    clearTimeout(hideLoaderTimeout);
    STATE.currentLoaderTimeout = null;
    if (imageLoader) imageLoader.style.display = "none";
  } catch (e) {
    console.error("showModal error", e);
    try {
      if (modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
      }
    } catch (_) {}
  }
};



    /* ============================
       Закрытие модалок (плавно)
       ============================ */
    $$(".close-modal, .close-btn.close-modal, .close-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!modal) return;
        if (imageLoader) imageLoader.style.display = "none";
        if (STATE.currentLoaderTimeout) { clearTimeout(STATE.currentLoaderTimeout); STATE.currentLoaderTimeout = null; }

        modal.classList.remove("show");
        setTimeout(() => { modal.style.display = "none"; }, 250);
      });
    });

    $$(".close-additional-modal").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!additionalModal) return;
        additionalModal.classList.remove("show");
        setTimeout(() => { additionalModal.style.display = "none"; }, 200);
      });
    });

    /* ============================
       ZOOM картинок (fullscreen)
       ============================ */
    if (zoomBtn && imageZoomView && imageZoomContent) {
      zoomBtn.addEventListener("click", () => {
        if (!carouselImages || carouselImages.length === 0) return;
        const url = carouselImages[currentIndex];
        imageZoomContent.style.backgroundImage = `url('${url}')`;
        imageZoomContent.innerHTML = "";
        imageZoomView.style.display = "flex";
      });

      if (imageZoomClose) {
        imageZoomClose.addEventListener("click", () => {
          imageZoomView.style.display = "none";
        });
      }

      imageZoomView.addEventListener("click", (ev) => {
        if (ev.target === imageZoomView) imageZoomView.style.display = "none";
      });
    }

    /* ============================
       ZOOM формул (всплывающее окно)
       ============================ */
    $$(".formula-zoom").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const block = btn.closest(".formula-block");
        if (!block) return;
        const contentEl = block.querySelector(".formula-content") || block.querySelector("#modal-formula");
        if (!contentEl) return;
        const html = contentEl.innerHTML;
        const formulaZoomView = $("#formulaZoomView");
        const formulaZoomContent = $("#formulaZoomContent");
        if (!formulaZoomContent || !formulaZoomView) return;
        formulaZoomContent.style.backgroundImage = "none";
        formulaZoomContent.innerHTML = `<div style="font-size:48px;color:white;text-align:center;">${html}</div>`;
        formulaZoomView.style.display = "flex";
        if (window.MathJax) {
          if (typeof MathJax.typesetPromise === "function") {
            MathJax.typesetPromise([formulaZoomContent]);
          } else if (typeof MathJax.typeset === "function") {
            MathJax.typeset([formulaZoomContent]);
          }
        }
      });
    });
    $("#formulaZoomClose")?.addEventListener("click", () => { $("#formulaZoomView") && ($("#formulaZoomView").style.display = "none"); });
    $("#formulaZoomView")?.addEventListener("click", (ev) => { if (ev.target === $("#formulaZoomView")) $("#formulaZoomView").style.display = "none"; });

    /* ============================
       Поиск и фильтрация точек (search)
       ============================ */
    if (searchInput) {
      // делаем debounce, чтобы не дергать UI на каждом символе
      searchInput.addEventListener("input", debounce((e) => {
        const v = (e.target.value || "").trim();
        filterPoints(v);
      }, 180));
    }

    function filterPoints(query) {
      const q = (query || "").toLowerCase();
      if (!allTopics || allTopics.length === 0) return;
      allTopics.forEach(topic => {
        const name = (topic.name || "").toLowerCase();
        const match = !q || name.includes(q) || (topic.tags || []).some(t => (t || "").toLowerCase().includes(q));
        // Если маркер поддерживает setStyle — лучше менять opacity через setStyle (с circleMarker)
        if (topic.marker && typeof topic.marker.setStyle === "function") {
          try {
            topic.marker.setStyle({ opacity: match ? 1 : 0.15, fillOpacity: match ? 0.9 : 0.15 });
          } catch (e) {
            // fallback: если нет setStyle — попытаемся setOpacity
            try { topic.marker.setOpacity && topic.marker.setOpacity(match ? 1 : 0.15); } catch (_) {}
          }
        } else if (topic.marker && typeof topic.marker.setOpacity === "function") {
          topic.marker.setOpacity(match ? 1 : 0.15);
        }
      });
    }

    // служебная функция: отображение результатов поиска (если есть DOM-контейнер)
    window.displaySearchResults = function(searchResults) {
      if (!searchResultsContainer) return;
      searchResultsContainer.innerHTML = "";
      if (!searchResults || searchResults.length === 0) {
        searchResultsContainer.textContent = "По запросу не найдено результатов.";
        return;
      }
      searchResults.forEach(result => {
        const div = document.createElement("div");
        div.className = "result-item";
        div.innerHTML = `<strong>${esc(result.type === 'description' ? "Описание" : "Переменная")}</strong>: ${esc(result.key)}<br>` +
          (result.type === 'description'
            ? `Описание: ${esc(result.note)}<br>История: ${esc(result.history)}<br>Применение: ${esc(result.application)}`
            : `Значение переменной: ${esc(result.value)}`);
        searchResultsContainer.appendChild(div);
      });
    };

    /* ============================
       Экспорт утилит в window (если нужна внешняя интеграция)
       ============================ */
    window.fetchImagesForTopic = fetchImagesForTopic;
    window.renderCarousel = renderCarousel;
    window.updateCarousel = updateCarousel;
    window.carouselState = () => ({ images: carouselImages.slice(), index: currentIndex });
    window.filterPoints = filterPoints;

    /* ============================
       Сброс карусели при ресайзе
       ============================ */
    window.addEventListener("resize", debounce(() => { safe(() => updateCarousel()); }, 120));
    safe(() => updateCarousel());

    /* ============================
       ----- Дополнительно: если у вас есть данные allTopics, привязать маркеры к карте -----
       Этот блок аккуратно создаёт circleMarker'ы (Leaflet) и сохраняет в topic.marker.
       Если у вас своя реализация — можно этот блок пропустить.
       ============================ */
    (function attachMarkersToMap() {
      if (!map) return;
      if (!Array.isArray(allTopics) || !allTopics.length) return;

      // создаём группу слоёв, чтобы было удобно удалить/перерисовать
      // eslint-disable-next-line no-undef
      const markersGroup = L.layerGroup().addTo(map);

      // очистим старые маркеры, если они были
      allTopics.forEach(t => {
        if (t.marker && t.marker.remove) {
          try { t.marker.remove(); } catch (_) {}
        }
      });

      allTopics.forEach(topic => {
        if (!topic || !topic.id) return;
        if (!isValidLatLng(topic.lat, topic.lng)) {
          console.warn("Тема без координат (пропущено):", topic.id);
          return;
        }

        // eslint-disable-next-line no-undef
const marker = L.circleMarker([topic.lat, topic.lng], {
  radius: topic.radius || CONFIG.style.defaultRadius,
  fillColor: topic.color || (categoryColors[topic.category] || "#ffffffff"),
  color: topic.stroke || "#f8f8f8ff",
  weight: 1,
  opacity: 0.9,
  fillOpacity: topic.fillOpacity || CONFIG.style.defaultFillOpacity,
  className: "node-marker"   // ← добавлено
});


        // привязать tooltip и popup при клике
        const title = topic.name || topic.id;
        marker.bindTooltip(title, { permanent: false, direction: "top" });
        marker.on("click", () => {
          // подсветка всех связей этой точки (включая connections)
          if (typeof window.highlightNode === "function") {
            window.highlightNode(topic.id);
          }

          // при клике можно открывать модалку с изображениями или инфо-панель
          if (typeof window.showModal === "function") {
            window.showModal(topic);
          } else {
            // fallback: открыть инфо-панель
            $("#info-panel") && ($("#info-panel").innerHTML = `<h3>${esc(title)}</h3><p>${esc(topic.description || "")}</p>`);
          }
        });

        // hover эффекты
        marker.on("mouseover", () => {
          try { marker.setStyle({ weight: 2, radius: (topic.radius || CONFIG.style.defaultRadius) + 1 }); } catch (_) {}
        });
        marker.on("mouseout", () => {
          if (originalMarkerStyles.has(topic.id)) return; // если подсвечено — не менять
          try { marker.setStyle({ weight: 1, radius: topic.radius || CONFIG.style.defaultRadius }); } catch (_) {}
        });

        marker.addTo(markersGroup);
        topic.marker = marker; // сохраняем референс в объекте topic
      });
    })();

    /* ============================
       Звуковой модуль: transition + предупреждение
       ============================ */
    (function initAudio() {
      try {
        STATE.audio.transition = new Audio(CONFIG.audio.transition);
        STATE.audio.transition.preload = "auto";
      } catch (e) {
        console.warn("Audio transition init failed", e);
        STATE.audio.transition = null;
      }
    })();

  }); // end DOMContentLoaded

})(); // end IIFE
