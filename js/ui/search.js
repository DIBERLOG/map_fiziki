(() => {
  function filterPoints(app, query) {
    const q = (query || "").toLowerCase();
    const allTopics = app.STATE.allTopics || [];
    allTopics.forEach(topic => {
      const name = (topic.name || "").toLowerCase();
      const match = !q || name.includes(q) || (topic.tags || []).some(t => (t || "").toLowerCase().includes(q));
      if (topic.marker && typeof topic.marker.setStyle === "function") {
        try {
          topic.marker.setStyle({ opacity: match ? 1 : 0.15, fillOpacity: match ? 0.9 : 0.15 });
        } catch (e) {
          try { topic.marker.setOpacity && topic.marker.setOpacity(match ? 1 : 0.15); } catch (_) {}
        }
      } else if (topic.marker && typeof topic.marker.setOpacity === "function") {
        topic.marker.setOpacity(match ? 1 : 0.15);
      }
    });
  }

  window.initSearchModule = function(app) {
    const { CONFIG, helpers } = app;
    const searchInput = helpers.$(CONFIG.selectors.searchInput);
    const searchResultsContainer = helpers.$(CONFIG.selectors.searchResults);
    const searchOpen = helpers.$("#search-open");
    const searchModal = helpers.$("#search-modal");
    const searchClose = helpers.$("#search-close");
    const searchFind = helpers.$("#search-find");
    const searchSuggestions = helpers.$("#search-suggestions");
    const searchHistoryList = helpers.$("#search-history-list");
    const filterPanel = helpers.$(CONFIG.selectors.filterPanel);
    const filterToggle = helpers.$(CONFIG.selectors.toggleFilter);
    const map = app.STATE.map;
    const topics = app.STATE.allTopics || [];

    const fuse = (window.Fuse && topics.length)
      ? new window.Fuse(topics, {
        keys: ["name", "id", "tags"],
        includeScore: true,
        threshold: 0.35,
        distance: 120,
        minMatchCharLength: 1
      })
      : null;

    let lastResults = [];
    let activeIndex = -1;
    const searchHistory = [];
    const maxHistory = 6;

    function getTopicLabel(topic) {
      if (!topic) return "";
      const name = topic.name || topic.id || "Без названия";
      const category = topic.category ? ` [${topic.category}]` : "";
      return `${name}${category}`;
    }

    function getTopicLatLng(topic) {
      if (!topic) return null;
      if (topic.marker && typeof topic.marker.getLatLng === "function") {
        return topic.marker.getLatLng();
      }
      if (typeof topic.lat === "number" && typeof topic.lng === "number") {
        return { lat: topic.lat, lng: topic.lng };
      }
      return null;
    }

    function pulseMarker(topic) {
      if (!topic || !topic.marker || typeof topic.marker.setStyle !== "function") return;
      const originalStyles = app.STATE.originalMarkerStyles;
      if (!originalStyles.has(topic.id)) {
        originalStyles.set(topic.id, {
          opacity: topic.marker.options?.opacity,
          fillOpacity: topic.marker.options?.fillOpacity,
          color: topic.marker.options?.color,
          weight: topic.marker.options?.weight,
          fillColor: topic.marker.options?.fillColor
        });
      }
      topic.marker.setStyle({
        opacity: 1,
        fillOpacity: 1,
        color: "#cfe6ff",
        weight: 3,
        fillColor: "#8fc5ff"
      });
      setTimeout(() => {
        const prev = originalStyles.get(topic.id);
        if (prev) {
          try { topic.marker.setStyle(prev); } catch (_) {}
          originalStyles.delete(topic.id);
        }
      }, 1400);
    }

    function focusTopic(topic) {
      if (!topic) return;
      const latlng = getTopicLatLng(topic);
      if (map && latlng && typeof map.flyTo === "function") {
        const targetZoom = typeof map.getMaxZoom === "function"
          ? Math.max(map.getMaxZoom() - 1, 10)
          : 10;
        map.flyTo(latlng, targetZoom, { duration: 1.0 });
      }
      if (typeof window.showModal === "function") {
        window.showModal(topic);
      }
      pulseMarker(topic);
    }

    function renderSuggestions(results) {
      if (!searchSuggestions) return;
      searchSuggestions.innerHTML = "";
      if (!results.length) {
        activeIndex = -1;
        return;
      }
      results.forEach((res, idx) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "search-suggestion";
        if (idx === activeIndex) item.classList.add("is-active");
        item.innerHTML = `
          <span class="search-suggestion-name">${helpers.esc(res.item.name || res.item.id || "Без названия")}</span>
          <span class="search-suggestion-meta">${helpers.esc(res.item.category || "Тема")}</span>
        `;
        item.addEventListener("click", () => {
          focusTopic(res.item);
          addToHistory(res.item);
          closeSearchModal();
        });
        searchSuggestions.appendChild(item);
      });
    }

    function renderHistory() {
      if (!searchHistoryList) return;
      searchHistoryList.innerHTML = "";
      if (!searchHistory.length) return;
      searchHistory.forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "search-history-item";
        btn.textContent = item.label;
        btn.addEventListener("click", () => {
          focusTopic(item.topic);
          closeSearchModal();
        });
        searchHistoryList.appendChild(btn);
      });
    }

    function addToHistory(topic) {
      if (!topic) return;
      const label = getTopicLabel(topic);
      const existingIndex = searchHistory.findIndex((item) => item.id === topic.id);
      if (existingIndex !== -1) searchHistory.splice(existingIndex, 1);
      searchHistory.unshift({ id: topic.id, label, topic });
      if (searchHistory.length > maxHistory) searchHistory.pop();
      renderHistory();
    }

    function runSearch(value) {
      const q = (value || "").trim();
      if (!q) {
        lastResults = [];
        activeIndex = -1;
        renderSuggestions([]);
        filterPoints(app, "");
        return;
      }
      if (!fuse) return;
      const results = fuse.search(q).slice(0, 8);
      lastResults = results;
      activeIndex = results.length ? 0 : -1;
      renderSuggestions(results);
      filterPoints(app, q);
    }

    function openSearchModal() {
      if (!searchModal) return;
      if (filterPanel && filterPanel.classList.contains("visible")) {
        filterPanel.classList.remove("visible");
        setTimeout(() => {
          filterPanel.style.display = "none";
          if (filterToggle) filterToggle.classList.remove("hidden");
        }, 450);
      }
      searchModal.classList.add("show");
      searchModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-search-modal-open");
      if (searchInput) searchInput.focus();
      renderHistory();
    }

    function closeSearchModal() {
      if (!searchModal) return;
      searchModal.classList.remove("show");
      searchModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-search-modal-open");
      if (searchInput) {
        searchInput.value = "";
        filterPoints(app, "");
      }
      if (searchSuggestions) {
        searchSuggestions.innerHTML = "";
      }
      lastResults = [];
      activeIndex = -1;
    }

    if (searchOpen) {
      searchOpen.addEventListener("click", () => openSearchModal());
    }

    if (searchClose) {
      searchClose.addEventListener("click", () => closeSearchModal());
    }

    if (searchModal) {
      searchModal.addEventListener("click", (e) => {
        if (e.target === searchModal) closeSearchModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSearchModal();
    });

    if (searchInput) {
      searchInput.addEventListener("input", helpers.debounce((e) => {
        const v = (e.target.value || "").trim();
        runSearch(v);
      }, 180));
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (lastResults[activeIndex]) {
            const topic = lastResults[activeIndex].item;
            focusTopic(topic);
            addToHistory(topic);
            closeSearchModal();
          }
        }
      });
    }

    if (searchFind) {
      searchFind.addEventListener("click", () => {
        if (lastResults[activeIndex]) {
          const topic = lastResults[activeIndex].item;
          focusTopic(topic);
          addToHistory(topic);
          closeSearchModal();
        }
      });
    }

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
        div.innerHTML = `<strong>${helpers.esc(result.type === "description" ? "Описание" : "Переменная")}</strong>: ${helpers.esc(result.key)}<br>` +
          (result.type === "description"
            ? `Описание: ${helpers.esc(result.note)}<br>История: ${helpers.esc(result.history)}<br>Применение: ${helpers.esc(result.application)}`
            : `Значение переменной: ${helpers.esc(result.value)}`);
        searchResultsContainer.appendChild(div);
      });
    };

    window.filterPoints = (q) => filterPoints(app, q);
  };
})();
