(() => {
  const defaultImages = [
    "https://via.placeholder.com/640x360?text=Нет+изображений+1",
    "https://via.placeholder.com/640x360?text=Нет+изображений+2"
  ];

  async function fetchImagesForTopic(topicName, category = null) {
    const local = (window.images && window.images[topicName]) || [];
    if (local.length) return local.slice();
    return defaultImages;
  }

  function ensureCarouselLoader() {
    const container = document.querySelector(".image-carousel");
    if (!container) return null;
    let loader = container.querySelector(".carousel-loader");
    if (!loader) {
      loader = document.createElement("div");
      loader.className = "carousel-loader";
      loader.innerHTML = `<div class="carousel-spinner"></div>`;
      container.appendChild(loader);
    }
    return loader;
  }

  function toggleCarouselLoader(show) {
    const loader = ensureCarouselLoader();
    if (!loader) return;
    loader.classList.toggle("show", !!show);
  }

  async function preloadImages(imgs = []) {
    await Promise.all(
      (imgs || []).map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = img.onerror = () => resolve();
            img.src = src;
          })
      )
    );
  }

  window.initModalsModule = function(app) {
    const { CONFIG, STATE, helpers } = app;

    const modal = helpers.$(CONFIG.selectors.modal);
    const modalTitle = helpers.$("#modal-title");
    const modalDescription = helpers.$("#modal-description");
    const modalHistory = helpers.$("#modal-history");
    const modalApplications = helpers.$("#modal-applications");
    const modalVariables = helpers.$("#modal-variables");
    const modalFormula = helpers.$("#modal-formula");
    const modalFormulaExplanations = helpers.$("#modal-formula-explanations");
    const modalFormulaExplanationsList = helpers.$("#modal-formula-explanations-list");
    const modalConnectionExplanations = helpers.$("#modal-connection-explanations");
    const modalConnectionExplanationsList = helpers.$("#modal-connection-explanations-list");
    const copyTopicBtn = helpers.$(".copy-topic");

    const carouselInner = helpers.$(CONFIG.selectors.carouselInner);
    const indicators = helpers.$(CONFIG.selectors.carouselIndicators);
    const prevControl = helpers.$(CONFIG.selectors.carouselPrev);
    const nextControl = helpers.$(CONFIG.selectors.carouselNext);
    const zoomBtn = helpers.$(CONFIG.selectors.zoomBtn);
    const imageZoomView = helpers.$(CONFIG.selectors.imageZoomView);
    const imageZoomContent = helpers.$(CONFIG.selectors.imageZoomContent);
    const imageZoomClose = helpers.$(CONFIG.selectors.imageZoomClose);
    const formulaZoomView = helpers.$("#formulaZoomView");
    const formulaZoomContent = helpers.$("#formulaZoomContent");
    const formulaZoomClose = helpers.$("#formulaZoomClose");

    let carouselImages = STATE.carousel.images;
    let currentIndex = STATE.carousel.index;
    let achievementShown = false;
    const showAchievementToastOnce = () => {
      if (achievementShown) return;
      achievementShown = true;
      let toast = document.getElementById("achievement-toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "achievement-toast";
        toast.className = "achievement-toast";
        toast.innerHTML = `
          <img class="achievement-icon" src="assets/picture/favicon.ico" alt="" />
          <div class="achievement-content">
            <div class="achievement-title">Новое достижение!</div>
            <div class="achievement-text">тайное становится явью!</div>
          </div>
        `;
        document.body.appendChild(toast);
      }
      requestAnimationFrame(() => {
        toast.classList.add("is-visible");
      });
      setTimeout(() => {
        toast.classList.remove("is-visible");
      }, 15000);

      try {
        const audio = new Audio("assets/sound/s_achievement.mp3");
        audio.volume = 0.7;
        audio.play().catch(() => {});
      } catch (_) {}
    };

    function updateCarousel() {
      if (!carouselInner) return;
      const container = document.querySelector(".image-carousel");
      if (!container) return;
      const width = container.clientWidth || 640;
      carouselInner.style.transition = "transform 0.45s ease";
      carouselInner.style.transform = `translateX(-${currentIndex * width}px)`;
      Array.from(indicators?.children || []).forEach((d, i) => d.classList.toggle("active", i === currentIndex));
      STATE.carousel.images = carouselImages;
      STATE.carousel.index = currentIndex;
    }

    async function renderCarousel(imgs = []) {
      toggleCarouselLoader(true);
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
            <div class="no-images-emoji">🖼️</div>
            <div class="no-images-text">Изображения не найдены</div>
          </div>
        `;
        carouselInner.appendChild(empty);
        updateCarousel();
        toggleCarouselLoader(false);
        return;
      }

      let firstPreviewDone = false;
      imgs.forEach((src, i) => {
        const slide = document.createElement("div");
        slide.className = "carousel-item";
        slide.style.backgroundImage = `url('${src}')`;
        slide.setAttribute("data-index", String(i));
        carouselInner.appendChild(slide);

        const dot = document.createElement("div");
        dot.className = "carousel-indicator";
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => { currentIndex = i; updateCarousel(); });
        indicators.appendChild(dot);

        if (i === 0) {
          const img = new Image();
          img.onload = img.onerror = () => {
            if (firstPreviewDone) return;
            firstPreviewDone = true;
            toggleCarouselLoader(false);
          };
          img.src = src;
        }
      });

      await preloadImages(imgs);
      if (!firstPreviewDone) toggleCarouselLoader(false);
      updateCarousel();
    }

    function moveCarousel(delta) {
      if (!carouselImages || carouselImages.length === 0) return;
      currentIndex = (currentIndex + delta + carouselImages.length) % carouselImages.length;
      updateCarousel();
    }

    prevControl?.addEventListener("click", () => moveCarousel(-1));
    nextControl?.addEventListener("click", () => moveCarousel(1));
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "ArrowLeft") moveCarousel(-1);
      if (ev.key === "ArrowRight") moveCarousel(1);
    });

    if (carouselInner) {
      let startX = 0;
      let startY = 0;
      let tracking = false;
      const swipeThreshold = 40;
      const swipeRestraint = 60;

      carouselInner.addEventListener("touchstart", (e) => {
        const touch = e.touches && e.touches[0];
        if (!touch) return;
        startX = touch.clientX;
        startY = touch.clientY;
        tracking = true;
      }, { passive: true });

      carouselInner.addEventListener("touchmove", (e) => {
        if (!tracking) return;
        const touch = e.touches && e.touches[0];
        if (!touch) return;
        const dx = Math.abs(touch.clientX - startX);
        const dy = Math.abs(touch.clientY - startY);
        if (dx > dy) {
          e.preventDefault();
        }
      }, { passive: false });

      carouselInner.addEventListener("touchend", (e) => {
        if (!tracking) return;
        const touch = e.changedTouches && e.changedTouches[0];
        if (!touch) return;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        tracking = false;
        if (Math.abs(dx) >= swipeThreshold && Math.abs(dy) <= swipeRestraint) {
          moveCarousel(dx < 0 ? 1 : -1);
        }
      });
    }

    if (zoomBtn && imageZoomView && imageZoomContent) {
      zoomBtn.addEventListener("click", () => {
        if (!carouselImages || carouselImages.length === 0) return;
        const url = carouselImages[currentIndex];
        imageZoomContent.style.backgroundImage = `url('${url}')`;
        imageZoomContent.innerHTML = "";
        imageZoomView.style.display = "flex";
      });
      imageZoomClose?.addEventListener("click", () => { imageZoomView.style.display = "none"; });
      imageZoomView.addEventListener("click", (ev) => { if (ev.target === imageZoomView) imageZoomView.style.display = "none"; });
    }

    helpers.$$(".formula-zoom").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!formulaZoomView || !formulaZoomContent) return;
        const block = btn.closest(".formula-block");
        const contentEl = block?.querySelector(".formula-content") || modalFormula;
        if (!contentEl) return;
        formulaZoomContent.style.backgroundImage = "none";
        formulaZoomContent.innerHTML = contentEl.innerHTML;
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

    formulaZoomClose?.addEventListener("click", () => { formulaZoomView && (formulaZoomView.style.display = "none"); });
    formulaZoomView?.addEventListener("click", (ev) => { if (ev.target === formulaZoomView) formulaZoomView.style.display = "none"; });

    window.renderCarousel = renderCarousel;
    window.updateCarousel = updateCarousel;
    window.fetchImagesForTopic = fetchImagesForTopic;
    window.carouselState = () => ({ images: carouselImages.slice(), index: currentIndex });
    function formatVariables(value, fallbackText) {
      if (value === null || value === undefined) return fallbackText;
      if (Array.isArray(value)) {
        if (!value.length) return fallbackText;
        const parts = value.map((item) => {
          if (!item) return "";
          if (typeof item === "string") return item.trim();
          if (typeof item !== "object") return String(item).trim();
          const symbol = (item.symbol || "").toString().trim();
          const meaning = (item.meaning || "").toString().trim();
          if (symbol && meaning) return `${symbol} - ${meaning}`;
          return symbol || meaning;
        }).filter(Boolean);
        return parts.length ? parts.join("; ") : fallbackText;
      }
      if (typeof value === "object") {
        const symbol = (value.symbol || "").toString().trim();
        const meaning = (value.meaning || "").toString().trim();
        if (symbol && meaning) return `${symbol} - ${meaning}`;
        return symbol || meaning || fallbackText;
      }
      const str = String(value).trim();
      return str || fallbackText;
    }




    function normalizeFormulaLines(value) {
      if (value === null || value === undefined) return [];
      if (Array.isArray(value)) {
        return value.map((item) => (item == null ? "" : String(item).trim())).filter(Boolean);
      }
      if (typeof value === "object") {
        if (Array.isArray(value.latex)) {
          return value.latex.map((item) => (item == null ? "" : String(item).trim())).filter(Boolean);
        }
        if (value.latex != null) {
          const single = String(value.latex).trim();
          return single ? [single] : [];
        }
        return [];
      }
      const str = String(value).trim();
      return str ? [str] : [];
    }

    function typesetMath(elements) {
      if (window.MathJax) {
        if (typeof MathJax.typesetPromise === "function") {
          MathJax.typesetPromise(elements);
          return;
        }
        if (MathJax.startup && MathJax.startup.promise) {
          MathJax.startup.promise.then(() => {
            if (typeof MathJax.typesetPromise === "function") {
              MathJax.typesetPromise(elements);
            } else if (typeof MathJax.typeset === "function") {
              MathJax.typeset(elements);
            }
          });
          return;
        }
        if (typeof MathJax.typeset === "function") {
          MathJax.typeset(elements);
        }
        return;
      }
      let tries = 0;
      const timer = setInterval(() => {
        tries += 1;
        if (window.MathJax) {
          clearInterval(timer);
          typesetMath(elements);
          return;
        }
        if (tries >= 10) clearInterval(timer);
      }, 200);
    }

    function renderFormulas(container, value, fallbackText) {
      if (!container) return;
      const lines = normalizeFormulaLines(value);
      container.innerHTML = "";
      if (!lines.length) {
        container.textContent = fallbackText;
        return;
      }
      lines.forEach((latex) => {
        const line = document.createElement("div");
        line.className = "formula-line";
        line.innerHTML = `\[${latex}\]`;
        container.appendChild(line);
      });
      typesetMath([container]);
    }

    // Formula explanations block
    function renderFormulaExplanations(container, listContainer, explanations, formulaValue) {
      if (!container || !listContainer) return;
      listContainer.innerHTML = "";
      if (!Array.isArray(explanations) || explanations.length === 0) {
        container.style.display = "none";
        return;
      }
      const formulaLines = normalizeFormulaLines(formulaValue);
      let rendered = 0;
      explanations.forEach((item) => {
        if (!item || item.index == null) return;
        const index = Number(item.index);
        if (!Number.isFinite(index) || index < 1) return;
        if (!formulaLines.length || index > formulaLines.length) return;
        const explanation = item.explanation == null ? "" : String(item.explanation).trim();
        if (!explanation) return;
        const row = document.createElement("div");
        row.className = "formula-explanation-item";
        row.innerHTML = `
          <div class="formula-explanation-header">
            <span class="formula-explanation-index">(${index})</span>
            <span class="formula-explanation-label">Пояснение</span>
          </div>
          <div class="formula-explanation-text">${helpers.esc(explanation)}</div>
        `;
        listContainer.appendChild(row);
        rendered += 1;
      });
      container.style.display = rendered ? "block" : "none";
      if (rendered) typesetMath([listContainer]);
    }

    // Connections explanations block
    function renderConnectionsExplanation(nodeId, nodesById) {
      if (!modalConnectionExplanations || !modalConnectionExplanationsList || !nodeId) return;
      const allConnections = Array.isArray(window.connections) ? window.connections : [];
      const related = allConnections.filter(conn => conn && (conn.source === nodeId || conn.target === nodeId));
      modalConnectionExplanationsList.innerHTML = "";
      if (!related.length) {
        modalConnectionExplanations.style.display = "none";
        return;
      }
      const raw = window.connectionExplanations;
      const explanationMap = new Map();
      if (Array.isArray(raw)) {
        raw.forEach(item => {
          if (!item || !item.from || !item.to || !item.explanation) return;
          explanationMap.set(`${item.from} -> ${item.to}`, String(item.explanation).trim());
        });
      } else if (raw && typeof raw === "object") {
        Object.entries(raw).forEach(([key, value]) => {
          if (!value) return;
          explanationMap.set(String(key), String(value).trim());
        });
      }
      related.forEach((conn) => {
        const linkedId = conn.source === nodeId ? conn.target : conn.source;
        const linkedNode = nodesById.get(linkedId);
        const linkedName = linkedNode ? (linkedNode.name || linkedNode.id) : (linkedId || "Неизвестно");
        const directKey = `${conn.source} -> ${conn.target}`;
        const reverseKey = `${conn.target} -> ${conn.source}`;
        const explanation = explanationMap.get(directKey) || explanationMap.get(reverseKey) ||
          "Связь существует на концептуальном уровне курса физики.";
        const row = document.createElement("div");
        row.className = "connection-explanation-item";
        row.innerHTML = `
          <div class="connection-explanation-title">🔗 ${helpers.esc(linkedName)}</div>
          <div class="connection-explanation-meta">Причина связи:</div>
          <p class="connection-explanation-text">${helpers.esc(explanation)}</p>
        `;
        modalConnectionExplanationsList.appendChild(row);
      });
      modalConnectionExplanations.style.display = modalConnectionExplanationsList.children.length ? "block" : "none";
    }


    function renderVariables(container, value, fallbackText) {
      if (!container) return;
      const formatVariableLine = (line) => {
        if (line == null) return "";
        return String(line).replace(
          /\\[a-zA-Z]+(?:\\{[^}]*\\})?(?:_[a-zA-Z0-9]+|_{[^}]*})*(?:\\^[a-zA-Z0-9]+|\\^{[^}]*})*/g,
          (m) => `\\(${m}\\)`
        );
      };
      if (value === null || value === undefined) {
        container.textContent = fallbackText;
        return;
      }
      if (Array.isArray(value)) {
        container.innerHTML = "";
        if (!value.length) {
          container.textContent = fallbackText;
          return;
        }
        value.forEach((item) => {
          const line = item == null ? "" : String(item);
          if (line === "") {
            container.appendChild(document.createElement("br"));
            return;
          }
          const row = document.createElement("div");
          row.className = "variable-line";
          row.innerHTML = formatVariableLine(line);
          container.appendChild(row);
        });
        typesetMath([container]);
        return;
      }
      if (typeof value === "object") {
        const symbol = (value.symbol || "").toString().trim();
        const meaning = (value.meaning || "").toString().trim();
        if (symbol || meaning) {
          const text = symbol && meaning ? `${symbol} - ${meaning}` : (symbol || meaning);
          container.innerHTML = formatVariableLine(text);
          typesetMath([container]);
          return;
        }
      }
      const str = String(value).trim();
      container.innerHTML = formatVariableLine(str || fallbackText);
      typesetMath([container]);
    }

    window.showModal = async function(node) {
      if (!modal) return;
      document.body.classList.add("is-node-modal-open");
      const topic = node || {};
      const key = topic.id || topic.name;
      const descriptions = window.descriptions || {};
      const formulas = window.formulas || {};
      const variables = window.variables || {};
      const formulaExplanations = window.formulaExplanations || {};
      const extras = window.additionalData || {};
      const history = extras.history || {};
      const applications = extras.applications || {};
      const noDataText = "\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445";
      const descFallback = noDataText;
      const historyFallback = "";
      const applicationsFallback = "";
      const variablesFallback = noDataText;
      const formulaFallback = noDataText;
      const descText = descriptions[key];
      const historyText = history[key] ?? "";
      const applicationText = applications[key] ?? "";
      const variablesValue = variables[key];
      const formulaValue = formulas[key];
      const explanationsValue = formulaExplanations[key];
      const isEasterEgg = key === "future_easter_egg";
      const nodesById = new Map([
        ...(window.mainNodes || []),
        ...(app.STATE.allTopics || [])
      ].map(item => [item.id, item]));

      if (!isEasterEgg && (descText == null || (typeof descText === "string" && !descText.trim()))) {
        console.warn("Missing description for key:", key);
      }
      const formulaLines = normalizeFormulaLines(formulaValue);
      if (!isEasterEgg && !formulaLines.length) {
        console.warn("Missing formulas for key:", key);
      }
      let hasVariables = false;
      if (Array.isArray(variablesValue)) {
        hasVariables = variablesValue.some((item) => item != null && String(item).trim());
      } else if (variablesValue && typeof variablesValue === "object") {
        const symbol = (variablesValue.symbol || "").toString().trim();
        const meaning = (variablesValue.meaning || "").toString().trim();
        hasVariables = Boolean(symbol || meaning);
      } else if (variablesValue != null) {
        hasVariables = Boolean(String(variablesValue).trim());
      }
      if (!isEasterEgg && !hasVariables) {
        console.warn("Missing variables for key:", key);
      }

      const descriptionBlock = modalDescription && modalDescription.closest(".additional-modal");
      const formulaBlock = modalFormula && modalFormula.closest(".additional-modal");
      const variablesBlock = modalVariables && modalVariables.closest(".additional-modal");
      const historyBlock = modalHistory && modalHistory.closest(".additional-modal");
      const applicationsBlock = modalApplications && modalApplications.closest(".additional-modal");
      const feedbackBlock = modal && modal.querySelector(".feedback-modal");
      const descriptionTitle = descriptionBlock && descriptionBlock.querySelector("h3");
      const historyTitle = historyBlock && historyBlock.querySelector("h3");
      const toggleBlock = (el, visible) => {
        if (!el) return;
        el.style.display = visible ? "" : "none";
      };

      modalTitle && (modalTitle.textContent = isEasterEgg
        ? "Физика как пространство, а не список формул"
        : (topic.name || topic.id || "Без названия"));
      modalDescription && (modalDescription.textContent = descText && String(descText).trim() ? descText : descFallback);
      modalHistory && (modalHistory.textContent = historyText || historyFallback);
      modalApplications && (modalApplications.textContent = applicationText || applicationsFallback);
      renderVariables(modalVariables, variablesValue, variablesFallback);
      renderFormulas(modalFormula, formulaValue, formulaFallback);
      renderFormulaExplanations(modalFormulaExplanations, modalFormulaExplanationsList, explanationsValue, formulaValue);
      renderConnectionsExplanation(key, nodesById);

      if (isEasterEgg) {
        toggleBlock(descriptionBlock, true);
        toggleBlock(historyBlock, true);
        toggleBlock(formulaBlock, false);
        toggleBlock(variablesBlock, false);
        toggleBlock(applicationsBlock, false);
        toggleBlock(feedbackBlock, false);
        if (descriptionTitle) descriptionTitle.textContent = "Мой путь разработки интерактивной карты физики";
        if (historyTitle) historyTitle.textContent = "От идеи к системе: история проекта";
        modalFormulaExplanations && (modalFormulaExplanations.style.display = "none");
        modalConnectionExplanations && (modalConnectionExplanations.style.display = "none");
        showAchievementToastOnce();
      } else {
        toggleBlock(descriptionBlock, true);
        toggleBlock(historyBlock, true);
        toggleBlock(formulaBlock, true);
        toggleBlock(variablesBlock, true);
        toggleBlock(applicationsBlock, true);
        toggleBlock(feedbackBlock, true);
        if (descriptionTitle) descriptionTitle.textContent = "Описание";
        if (historyTitle) historyTitle.textContent = "История";
      }

      modal.classList.add("show");
      requestAnimationFrame(() => typesetMath([modal]));

      const imgsPromise = fetchImagesForTopic(key, topic.category);
      imgsPromise
        .then((imgs) => renderCarousel(imgs))
        .catch((e) => console.error(e));
    };

    async function copyTextToClipboard(text) {
      if (!text) return;
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (_) {
          // fallback below
        }
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (_) {}
      document.body.removeChild(textarea);
      return ok;
    }

    if (copyTopicBtn) {
      copyTopicBtn.addEventListener("click", async () => {
        const text = (modalTitle && modalTitle.textContent) ? modalTitle.textContent.trim() : "";
        if (!text) return;
        if (!copyTopicBtn.dataset.originalLabel) {
          copyTopicBtn.dataset.originalLabel = copyTopicBtn.textContent || "";
        }
        const ok = await copyTextToClipboard(text);
        if (!ok) return;
        copyTopicBtn.classList.add("copied");
        copyTopicBtn.textContent = "✓ Скопировано";
        setTimeout(() => {
          copyTopicBtn.classList.remove("copied");
          copyTopicBtn.textContent = copyTopicBtn.dataset.originalLabel || "⧉";
        }, 2500);
      });
    }

    const feedbackBtn = document.getElementById("modal-feedback-btn");
    const feedbackFilterBtn = document.getElementById("modal-feedback-btn-filter");
    const feedbackModal = document.getElementById("feedback-modal");
    const feedbackClose = feedbackModal && feedbackModal.querySelector(".close-feedback-modal");
    const filterPanel = helpers.$(CONFIG.selectors.filterPanel);
    const filterToggle = helpers.$(CONFIG.selectors.toggleFilter);
    const feedbackTopic = document.getElementById("feedback-topic");
    const feedbackTopicDisplay = document.getElementById("feedback-topic-display");
    const feedbackForm = feedbackModal && feedbackModal.querySelector(".feedback-form");
    const feedbackStatus = feedbackModal && feedbackModal.querySelector(".feedback-status");
    const feedbackSubmit = feedbackModal && feedbackModal.querySelector(".feedback-submit");
    let feedbackTopicEditable = false;
    const setFeedbackTopic = () => {
      const topic = (modalTitle && modalTitle.textContent) ? modalTitle.textContent.trim() : "";
      if (feedbackTopic) feedbackTopic.value = topic;
      if (feedbackTopicDisplay) feedbackTopicDisplay.value = topic || "";
    };
    const setFeedbackStatus = (text, status) => {
      if (!feedbackStatus) return;
      feedbackStatus.textContent = text || "";
      feedbackStatus.classList.remove("is-success", "is-error");
      if (status) feedbackStatus.classList.add(status);
    };
    const openFeedbackModal = (options = {}) => {
      if (!feedbackModal) return;
      if (filterPanel && filterPanel.classList.contains("visible")) {
        filterPanel.classList.remove("visible");
        setTimeout(() => {
          filterPanel.style.display = "none";
          if (filterToggle) filterToggle.classList.remove("hidden");
        }, 450);
      }
      feedbackTopicEditable = options.mode === "free";
      if (feedbackTopicDisplay) {
        feedbackTopicDisplay.readOnly = !feedbackTopicEditable;
        feedbackTopicDisplay.placeholder = feedbackTopicEditable ? "Введите тему карты" : "Выбранная точка";
      }
      if (feedbackTopicEditable) {
        if (feedbackTopicDisplay) feedbackTopicDisplay.value = "";
        if (feedbackTopic) feedbackTopic.value = "";
      } else {
        setFeedbackTopic();
      }
      setFeedbackStatus("", "");
      feedbackModal.classList.add("show");
      feedbackModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-feedback-modal-open");
    };
    const closeFeedbackModal = () => {
      if (!feedbackModal) return;
      feedbackModal.classList.remove("show");
      feedbackModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-feedback-modal-open");
    };
    if (feedbackBtn) {
      feedbackBtn.addEventListener("click", () => openFeedbackModal({ mode: "topic" }));
    }
    if (feedbackFilterBtn) {
      feedbackFilterBtn.addEventListener("click", () => openFeedbackModal({ mode: "free" }));
    }
    if (feedbackClose) {
      feedbackClose.addEventListener("click", closeFeedbackModal);
    }
    if (feedbackModal) {
      feedbackModal.addEventListener("click", (event) => {
        if (event.target === feedbackModal) closeFeedbackModal();
      });
    }
    if (feedbackTopicDisplay && !feedbackTopicDisplay.dataset.syncAttached) {
      feedbackTopicDisplay.dataset.syncAttached = "1";
      feedbackTopicDisplay.addEventListener("input", () => {
        if (!feedbackTopicEditable || !feedbackTopic) return;
        feedbackTopic.value = feedbackTopicDisplay.value || "";
      });
    }

    if (feedbackForm) {
      feedbackForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const action = feedbackForm.getAttribute("action");
        if (!action) return;
        setFeedbackStatus("Отправляем сообщение...", "");
        if (feedbackSubmit) feedbackSubmit.disabled = true;
        try {
          const formData = new FormData(feedbackForm);
          const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: {
              "Accept": "application/json"
            }
          });
          if (response.ok) {
            setFeedbackStatus("Сообщение отправлено. Спасибо!", "is-success");
            feedbackForm.reset();
            setFeedbackTopic();
          } else {
            setFeedbackStatus("Произошла ошибка. Сообщение не отправлено.", "is-error");
          }
        } catch (error) {
          setFeedbackStatus("Произошла ошибка. Сообщение не отправлено.", "is-error");
        } finally {
          if (feedbackSubmit) feedbackSubmit.disabled = false;
        }
      });
    }

    helpers.$$(".close-modal, .close-btn.close-modal, .close-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!modal) return;
        modal.classList.remove("show");
        document.body.classList.remove("is-node-modal-open");
      });
    });

    helpers.$$(".close-additional-modal").forEach(btn => {
      btn.addEventListener("click", () => {
        const add = helpers.$(CONFIG.selectors.additionalModal);
        if (!add) return;
        add.classList.remove("show");
      });
    });

    window.addEventListener("resize", app.helpers.debounce(() => { app.helpers.safe(() => updateCarousel()); }, 120));
    app.helpers.safe(() => updateCarousel());
  };
})();
