(() => {
  function computeFilterState(app) {
    const categoryEls = Array.from(document.querySelectorAll(".category-filter"));
    const activeCategories = categoryEls.filter(el => el.checked).map(el => el.value);
    const subcategoryEls = Array.from(document.querySelectorAll(".subcategory-filter"));
    const allTopicIds = new Set((app.STATE.allTopics || []).map(n => n.id));
    function resolveSubcategoryId(el) {
      const raw = el.value;
      if (allTopicIds.has(raw)) return raw;
      const label = el.closest("label");
      const eyeBtn = label && label.querySelector(".eye-btn");
      const mapped = eyeBtn && eyeBtn.dataset && eyeBtn.dataset.id;
      if (mapped && allTopicIds.has(mapped)) return mapped;
      return raw;
    }
    const activeSubcategories = new Set(subcategoryEls.filter(el => el.checked).map(resolveSubcategoryId));
    const connections = Array.isArray(window.connections) ? window.connections : [];

    const hasCategoryFilter = activeCategories.length !== categoryEls.length;
    const hasSubcategoryFilter = activeSubcategories.size !== subcategoryEls.length;

    const showSubtopics = document.querySelector('.element-filter[value="subtopics"]')?.checked;
    const showConnections = document.querySelector('.element-filter[value="connections"]')?.checked;
    const showNodes = document.querySelector('.element-filter[value="nodes"]')?.checked;

    const allNodes = [...(window.mainNodes || []), ...(app.STATE.allTopics || [])];
    const categoryById = new Map(allNodes.map(n => [n.id, n.category]));
    const parentById = new Map((app.STATE.allTopics || []).map(t => [t.id, t.parent]));
    const subtopicKeySet = new Set((app.STATE.allTopics || []).map(n => `${n.id}::${n.category}`));
    const activeCategoriesSet = new Set(activeCategories);

    const activeSubcategoriesByCategory = new Map();
    activeSubcategories.forEach(id => {
      const cat = categoryById.get(id);
      if (!cat) return;
      if (!activeSubcategoriesByCategory.has(cat)) activeSubcategoriesByCategory.set(cat, new Set());
      activeSubcategoriesByCategory.get(cat).add(id);
    });

    const singleSubcategoryIds = new Set();
    activeSubcategoriesByCategory.forEach((ids, cat) => {
      if (ids.size === 1 && (activeCategoriesSet.has(cat) || activeCategoriesSet.size === 0)) {
        ids.forEach(id => singleSubcategoryIds.add(id));
      }
    });

    function isUnderActiveSubcategory(nodeId) {
      let current = nodeId;
      while (current) {
        if (activeSubcategories.has(current)) return true;
        current = parentById.get(current);
      }
      return false;
    }

    const categoriesWithActiveSubcategories = new Set();
    (app.STATE.allTopics || []).forEach(n => {
      if (!n) return;
      if (!isUnderActiveSubcategory(n.id)) return;
      categoriesWithActiveSubcategories.add(n.category);
    });

    const visibleCategoryBase = new Set(activeCategories);
    categoriesWithActiveSubcategories.forEach(cat => visibleCategoryBase.add(cat));

    // If a category is checked but none of its subtopics are active, keep only its center node.
    const categoryOnlyCenter = new Set();
    if (hasSubcategoryFilter) {
      activeCategories.forEach(cat => {
        if (!categoriesWithActiveSubcategories.has(cat)) categoryOnlyCenter.add(cat);
      });
    }

    const baseVisibleIds = new Set();
    const baseVisibleKeys = new Set();

    function addVisible(node) {
      if (!node) return;
      baseVisibleIds.add(node.id);
      baseVisibleKeys.add(`${node.id}::${node.category}`);
    }

    if (showNodes) {
      (window.mainNodes || []).forEach(n => {
        if (visibleCategoryBase.has(n.category)) addVisible(n);
      });
    }

    if (showSubtopics) {
      (app.STATE.allTopics || []).forEach(n => {
        if (!visibleCategoryBase.has(n.category)) return;
        if (categoryOnlyCenter.has(n.category)) return;
        if (hasSubcategoryFilter) {
          if (isUnderActiveSubcategory(n.id)) addVisible(n);
          return;
        }
        addVisible(n);
      });
    }

    // Single subtopic selection: highlight the subtopic and its direct neighbors via links.
    const highlightIds = new Set();
    const highlightConnections = new Set();
    if (singleSubcategoryIds.size > 0) {
      connections.forEach(conn => {
        if (!conn) return;
        const isDirect = singleSubcategoryIds.has(conn.source) || singleSubcategoryIds.has(conn.target);
        if (!isDirect) return;
        highlightConnections.add(conn);
        highlightIds.add(conn.source);
        highlightIds.add(conn.target);
      });
      singleSubcategoryIds.forEach(id => highlightIds.add(id));
      (allNodes || []).forEach(n => {
        if (!n || !highlightIds.has(n.id)) return;
        if (!visibleCategoryBase.has(n.category)) return;
        addVisible(n);
      });
    }

    const visibleNodeIds = new Set(baseVisibleIds);
    const visibleNodeKeys = new Set(baseVisibleKeys);

    const visibleCategories = new Set(visibleCategoryBase);
    visibleNodeKeys.forEach(key => {
      const parts = key.split("::");
      const cat = parts.length > 1 ? parts[1] : null;
      if (cat) visibleCategories.add(cat);
    });

    return {
      visibleNodeIds,
      visibleNodeKeys,
      visibleCategories,
      highlightIds,
      highlightConnections,
      highlightMode: singleSubcategoryIds.size > 0,
      showNodes,
      showSubtopics,
      showConnections
    };
  }

  function applyFilters(app) {
    const map = app.STATE.map;
    const layers = app.layers || {};
    const state = computeFilterState(app);

    function setTooltipVisibility(marker, show) {
      const tooltip = marker && marker.getTooltip && marker.getTooltip();
      const el = tooltip && tooltip.getElement && tooltip.getElement();
      if (!el) return;
      el.style.opacity = show ? "1" : "0";
      el.style.pointerEvents = show ? "auto" : "none";
      if (el.dataset) el.dataset.filterHidden = show ? "0" : "1";
    }

    function updateZoneLayer(layerGroup, visibleCategories) {
      if (!layerGroup) return;
      layerGroup.eachLayer(layer => {
        const name = layer.__zoneName || layer.getTooltip?.()?.getContent?.() || "";
        if (visibleCategories.has(name)) layer.addTo(map);
        else map.removeLayer(layer);
      });
    }

    function getBaseFillOpacity(node) {
      if (!node || !node.marker) return 1;
      if (typeof node.__baseFillOpacity === "number") return node.__baseFillOpacity;
      const base = typeof node.marker.options?.fillOpacity === "number" ? node.marker.options.fillOpacity : 1;
      node.__baseFillOpacity = base;
      return base;
    }

    function getBaseOpacity(node) {
      if (!node || !node.marker) return 0.9;
      if (typeof node.__baseOpacity === "number") return node.__baseOpacity;
      const base = typeof node.marker.options?.opacity === "number" ? node.marker.options.opacity : 0.9;
      node.__baseOpacity = base;
      return base;
    }

    function applyNodeStyle(node, visible, highlight, dim, isMain) {
      if (!node || !node.marker || !node.marker.setStyle) return;
      const baseOpacity = getBaseOpacity(node);
      const baseFill = getBaseFillOpacity(node);
      let opacity = 0;
      let fillOpacity = 0;

      if (visible) {
        if (highlight) {
          opacity = baseOpacity;
          fillOpacity = baseFill;
        } else if (dim) {
          opacity = 0.2;
          fillOpacity = Math.min(baseFill, 0.2);
        } else {
          opacity = baseOpacity;
          fillOpacity = baseFill;
        }
      }

      try { node.marker.setStyle({ opacity, fillOpacity }); } catch (e) {}
      setTooltipVisibility(node.marker, visible);

      if (isMain && node.glow && node.glow.setStyle) {
        const glowOpacity = visible ? (highlight ? 0.25 : 0.1) : 0;
        try { node.glow.setStyle({ opacity: glowOpacity, fillOpacity: glowOpacity }); } catch (e) {}
      }
    }

    updateZoneLayer(layers.zones, state.visibleCategories);
    updateZoneLayer(layers.zoneOutlines, state.visibleCategories);

    (window.mainNodes || []).forEach(n => {
      const key = `${n.id}::${n.category}`;
      const visible = state.showNodes && state.visibleNodeKeys.has(key) && state.visibleCategories.has(n.category);
      const highlight = state.highlightMode && state.highlightIds.has(n.id);
      // In highlight mode, dim visible nodes that are not part of the direct neighborhood.
      const dim = state.highlightMode && visible && !highlight;
      applyNodeStyle(n, visible, highlight, dim, true);
    });

    (app.STATE.allTopics || []).forEach(n => {
      const key = `${n.id}::${n.category}`;
      const visible = state.showSubtopics && state.visibleNodeKeys.has(key) && state.visibleCategories.has(n.category);
      const highlight = state.highlightMode && state.highlightIds.has(n.id);
      // In highlight mode, dim visible nodes that are not part of the direct neighborhood.
      const dim = state.highlightMode && visible && !highlight;
      applyNodeStyle(n, visible, highlight, dim, false);
    });

    if (!state.showSubtopics && layers.subtopics) map.removeLayer(layers.subtopics);
    else if (layers.subtopics) layers.subtopics.addTo(map);

    (Array.isArray(window.connections) ? window.connections : []).forEach(conn => {
      if (!conn || !conn.line || !conn.line.setStyle) return;
      const isVisible = state.visibleNodeIds.has(conn.source) && state.visibleNodeIds.has(conn.target);
      let opacity = 0;
      let weight = 1;

      if (state.showConnections && isVisible) {
        if (state.highlightMode) {
          const isDirect = state.highlightConnections.has(conn);
          opacity = isDirect ? 0.8 : 0.12;
          weight = isDirect ? 2 : 1;
        } else {
          opacity = 0.4;
          weight = 1;
        }
      }

      try { conn.line.setStyle({ color: conn.color || "#dddddd", weight, opacity }); } catch (e) {}
    });

    if (!state.showConnections && layers.connections) map.removeLayer(layers.connections);
    else if (layers.connections) layers.connections.addTo(map);
  }

  window.initFilterModule = function(app) {
    const { helpers, CONFIG } = app;
    const toggleBtn = helpers.$(CONFIG.selectors.toggleFilter);
    const closeBtn = helpers.$(CONFIG.selectors.closeFilter);
    const panel = helpers.$(CONFIG.selectors.filterPanel);

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

    helpers.$$(".category-block .expandable").forEach(block => {
      block.addEventListener("click", () => {
        const parent = block.closest(".category-block");
        const subGroup = parent && parent.querySelector(".sub-filter-group");
        if (!subGroup) return;
        parent.classList.toggle("open");
        subGroup.classList.toggle("open");
      });
    });

    document.querySelectorAll(".category-filter, .subcategory-filter, .element-filter")
      .forEach(el => el.addEventListener("change", () => applyFilters(app)));

    applyFilters(app);
  };
})();
