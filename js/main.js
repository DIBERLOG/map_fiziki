(() => {
  "use strict";

  // ========= Helpers =========
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const safe = (fn) => { try { fn(); } catch (e) { console.error(e); } };

  function debounce(fn, ms = 200) {
    let t = null;
    return function(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  function esc(s) {
    if (s === undefined || s === null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function isValidLatLng(lat, lng) {
    return typeof lat === "number" && typeof lng === "number" &&
           isFinite(lat) && isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  }

  // ========= Config =========
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
      center: [7.5, 7.5],
      zoom: 4,
      minZoom: 4,
      maxZoom: 11,
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      tileOpts: { attribution: "© OpenStreetMap contributors" }
    }
  };

  // ========= State =========
  const STATE = {
    map: window.map || null,
    allTopics: window.allTopics || [],
    categoryColors: window.categoryColors || {},
    carousel: { images: [], index: 0 },
    originalMarkerStyles: new Map(),
    audio: { transition: null, warning: null },
    currentLoaderTimeout: null
  };

  const APP = {
    CONFIG,
    STATE,
    helpers: { $, $$, safe, debounce, esc, isValidLatLng }
  };

  window.APP = APP;

  document.addEventListener("DOMContentLoaded", () => {
    APP.STATE.allTopics = Array.isArray(window.allTopics) ? window.allTopics : [];
    APP.STATE.categoryColors = window.categoryColors || {};

    const backHomeBtn = document.getElementById("back-home");
    const mapTransitionOverlay = document.getElementById("map-transition-overlay");
    const startMapTransition = (href) => {
      if (document.body.classList.contains("is-map-transitioning")) return;
      document.body.classList.add("is-map-transitioning");
      if (mapTransitionOverlay) mapTransitionOverlay.setAttribute("aria-hidden", "false");
      setTimeout(() => { window.location.href = href; }, 1150);
    };
    if (backHomeBtn) {
      backHomeBtn.addEventListener("click", () => startMapTransition("index.html"));
    }

    async function fetchJson(path) {
      try {
        const res = await fetch(path, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (_) {
        return null;
      }
    }

    async function loadModalData() {
      const base = "data/modal_data";
      const [desc, formulas, history, applications, variables, images, formulaExplanations, connectionExplanations] = await Promise.all([
        fetchJson(`${base}/descriptions.json`),
        fetchJson(`${base}/formulas.json`),
        fetchJson(`${base}/history.json`),
        fetchJson(`${base}/applications.json`),
        fetchJson(`${base}/variables.json`),
        fetchJson(`${base}/images.json`),
        fetchJson(`${base}/formula_explanations.json`),
        fetchJson(`${base}/connections_explanations.json`)
      ]);
      window.descriptions = desc || {};
      window.formulas = formulas || {};
      window.variables = variables || {};
      window.images = images || {};
      window.formulaExplanations = formulaExplanations || {};
      window.connectionExplanations = connectionExplanations || [];
      window.additionalData = {
        history: history || {},
        applications: applications || {}
      };
    }

    function hasFormulaData(value) {
      if (value == null) return false;
      if (Array.isArray(value)) {
        return value.some((item) => item != null && String(item).trim());
      }
      if (typeof value === "object") {
        if (Array.isArray(value.latex)) {
          return value.latex.some((item) => item != null && String(item).trim());
        }
        if (value.latex != null) return Boolean(String(value.latex).trim());
        return false;
      }
      return Boolean(String(value).trim());
    }

    function hasVariableData(value) {
      if (value == null) return false;
      if (Array.isArray(value)) {
        return value.some((item) => item != null && String(item).trim());
      }
      if (typeof value === "object") {
        const symbol = (value.symbol || "").toString().trim();
        const meaning = (value.meaning || "").toString().trim();
        return Boolean(symbol || meaning);
      }
      return Boolean(String(value).trim());
    }

    function filterTopicsByData(topics) {
      const list = Array.isArray(topics) ? topics : [];
      const descriptions = window.descriptions || {};
      const formulas = window.formulas || {};
      const variables = window.variables || {};
      const filtered = [];
      list.forEach((topic) => {
        const key = topic && (topic.id || topic.name);
        if (!key) return;
        const hasFormulas = hasFormulaData(formulas[key]);
        const hasVariables = hasVariableData(variables[key]);
        const desc = descriptions[key];
        const hasDescription = desc != null && String(desc).trim();
        let status = null;

        if (hasFormulas && hasVariables) {
          status = "complete";
        } else if (hasDescription && !hasFormulas && !hasVariables) {
          status = "legacy";
        } else if (hasDescription || hasFormulas || hasVariables) {
          status = "incomplete";
        }

        if (!hasFormulas && !hasVariables && !hasDescription) {
          console.warn("node hidden (no data):", key);
          return;
        }

        topic.status = status;
        filtered.push(topic);
      });
      return filtered;
    }

    window.auditModalDataIntegrity = function auditModalDataIntegrity() {
      const descriptions = window.descriptions || {};
      const formulas = window.formulas || {};
      const variables = window.variables || {};
      const allKeys = new Set([
        ...Object.keys(descriptions),
        ...Object.keys(formulas),
        ...Object.keys(variables)
      ]);
      const rows = Array.from(allKeys).sort().map((key) => ({
        key,
        description: Object.prototype.hasOwnProperty.call(descriptions, key),
        formulas: Object.prototype.hasOwnProperty.call(formulas, key),
        variables: Object.prototype.hasOwnProperty.call(variables, key)
      }));
      console.table(rows);
      return rows;
    };


    function initAppModules() {
      if (typeof window.initMapModule === "function") window.initMapModule(APP);
      if (typeof window.initFilterModule === "function") window.initFilterModule(APP);
      if (typeof window.initGraphLayoutModule === "function") window.initGraphLayoutModule(APP);
      if (typeof window.initModalsModule === "function") window.initModalsModule(APP);
      if (typeof window.initSearchModule === "function") window.initSearchModule(APP);
      if (typeof window.initLayersModule === "function") window.initLayersModule(APP);
    }

    const connectionDefaultStyle = { color: "#dddddd", opacity: 0.4, weight: 1 };
    const connectionDimStyle = { color: "#777777", opacity: 0.12, weight: 0.8 };
    const connectionHighlightStyle = { color: "#ffffff", opacity: 1, weight: 2.5 };

    function getDefaultConnectionStyle(conn) {
      return {
        color: (conn && conn.color) ? conn.color : connectionDefaultStyle.color,
        opacity: connectionDefaultStyle.opacity,
        weight: connectionDefaultStyle.weight
      };
    }

    function resetHighlight() {
      const connections = window.connections || [];
      connections.forEach(conn => {
        if (!conn || !conn.line) return;
        try { conn.line.setStyle(getDefaultConnectionStyle(conn)); } catch (_) {}
      });
    }

    function highlightNode(nodeId) {
      if (!nodeId) return;
      const connections = window.connections || [];
      const connectedIds = new Set([nodeId]);
      let hasAny = false;

      connections.forEach(conn => {
        if (!conn || !conn.line) return;
        const isHit = conn.source === nodeId || conn.target === nodeId;
        if (isHit) {
          hasAny = true;
          connectedIds.add(conn.source);
          connectedIds.add(conn.target);
          try { conn.line.setStyle(connectionHighlightStyle); } catch (_) {}
        } else {
          try { conn.line.setStyle(connectionDimStyle); } catch (_) {}
        }
      });

      const originalStyles = APP.STATE.originalMarkerStyles;
      const allNodes = [
        ...(window.mainNodes || []),
        ...(APP.STATE.allTopics || [])
      ];

      allNodes.forEach(node => {
        if (!node || !node.marker || typeof node.marker.setStyle !== "function") return;
        const currentOpacity = node.marker.options?.opacity ?? 0;
        const currentFill = node.marker.options?.fillOpacity ?? 0;
        if (currentOpacity === 0 && currentFill === 0) return;
        if (!originalStyles.has(node.id)) {
          originalStyles.set(node.id, { opacity: currentOpacity, fillOpacity: currentFill });
        }
        const isConnected = connectedIds.has(node.id);
        const opacity = isConnected ? 1 : 0.2;
        const fillOpacity = isConnected ? Math.max(0.9, currentFill) : Math.min(0.2, currentFill);
        try { node.marker.setStyle({ opacity, fillOpacity }); } catch (_) {}
      });

      if (!hasAny) resetHighlight();
    }

    function clearMarkerHighlights() {
      const originalStyles = APP.STATE.originalMarkerStyles;
      if (!originalStyles || originalStyles.size === 0) return;
      originalStyles.forEach((style, id) => {
        const node = APP.STATE.allTopics.find(t => t.id === id) ||
          (window.mainNodes || []).find(n => n.id === id);
        if (node && node.marker && typeof node.marker.setStyle === "function") {
          try { node.marker.setStyle(style); } catch (_) {}
        }
      });
      originalStyles.clear();
    }

    window.resetHighlight = resetHighlight;
    window.highlightNode = highlightNode;

    document.addEventListener("dblclick", (e) => {
      const target = e.target;
      if (target && target.closest) {
        if (target.closest(".node-marker") || target.closest(".node-tooltip")) return;
      }
      if (target && target.tagName === "circle" && target.classList && target.classList.contains("leaflet-interactive")) return;
      resetHighlight();
      clearMarkerHighlights();
    });

    // Плавно скрываем общий лоадер страницы
    const pageLoader = APP.helpers.$(APP.CONFIG.selectors.pageLoader);
    const hideLoader = () => {
      if (!pageLoader) return;
      pageLoader.style.opacity = "0";
      setTimeout(() => { pageLoader.style.display = "none"; }, 500);
    };
    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
    }

    loadModalData().then(() => {
      APP.STATE.allTopics = filterTopicsByData(APP.STATE.allTopics);
      window.allTopics = APP.STATE.allTopics;
      const statusRows = (APP.STATE.allTopics || []).map((topic) => ({
        key: topic && (topic.id || topic.name),
        status: topic && topic.status
      }));
      console.table(statusRows);
      initAppModules();
    });
  });
})();
