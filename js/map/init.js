(() => {
  function ensureMap(APP) {
    const { CONFIG, STATE, helpers } = APP;
    if (STATE.map && typeof STATE.map.getCenter === "function") {
      if (STATE.map.zoomControl && STATE.map.removeControl) {
        try { STATE.map.removeControl(STATE.map.zoomControl); } catch (_) {}
      }
      return STATE.map;
    }

    const container = helpers.$(CONFIG.selectors.mapContainer);
    if (!container) {
      console.warn("Контейнер карты не найден (#map)");
      return null;
    }

    // eslint-disable-next-line no-undef
    const m = L.map(container, {
      zoomControl: false,
      minZoom: CONFIG.mapDefaults.minZoom,
      maxZoom: CONFIG.mapDefaults.maxZoom,
      attributionControl: false
    }).setView(CONFIG.mapDefaults.center, CONFIG.mapDefaults.zoom);

    STATE.map = m;
    window.map = m;
    return m;
  }

  function initZoomControls(APP, map) {
    const { CONFIG, helpers } = APP;
    const btnIn = helpers.$(CONFIG.selectors.zoomInBtn);
    const btnOut = helpers.$(CONFIG.selectors.zoomOutBtn);
    if (!btnIn || !btnOut || !map) return;

    function updateZoomButtons() {
      const z = map.getZoom();
      if (z >= map.getMaxZoom()) {
        btnIn.classList.add("disabled");
        btnIn.setAttribute("disabled", "true");
      } else {
        btnIn.classList.remove("disabled");
        btnIn.removeAttribute("disabled");
      }
      if (z <= map.getMinZoom()) {
        btnOut.classList.add("disabled");
        btnOut.setAttribute("disabled", "true");
      } else {
        btnOut.classList.remove("disabled");
        btnOut.removeAttribute("disabled");
      }
    }

    btnIn.addEventListener("click", () => { if (map.getZoom() < map.getMaxZoom()) map.zoomIn(); updateZoomButtons(); });
    btnOut.addEventListener("click", () => { if (map.getZoom() > map.getMinZoom()) map.zoomOut(); updateZoomButtons(); });

    map.on("zoomend zoomlevelschange moveend", updateZoomButtons);
    document.addEventListener("keydown", (ev) => {
      if (ev.target && (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA")) return;
      if (ev.key === "+" || ev.key === "=") { if (map.getZoom() < map.getMaxZoom()) map.zoomIn(); updateZoomButtons(); }
      else if (ev.key === "-") { if (map.getZoom() > map.getMinZoom()) map.zoomOut(); updateZoomButtons(); }
    });

    updateZoomButtons();
  }

  function initWarningEntity(APP, map) {
    const { CONFIG, helpers } = APP;
    const warning = helpers.$("#warning-entity");
    const mapEl = helpers.$("#map");
    if (!warning || !map || !mapEl) return;
    const warningCore = warning.querySelector(".warning-core");
    const pupils = Array.from(warning.querySelectorAll(".pupil"));
    const flash = warning.querySelector(".flash");
    const message = warning.querySelector(".message");
    const baseText = message ? message.textContent : "";

    const sound = new Audio(CONFIG.audio.transition);
    sound.volume = CONFIG.audio.warningVolume;
    let soundReady = false;
    const unlockSound = () => {
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
    let glitchTimer = null;
    let flashTimer = null;
    let saccadeTimer = null;
    let rafId = null;
    let lastPointerTime = 0;
    const pointerOffset = { x: 0, y: 0 };
    const idleOffset = { x: 0, y: 0 };
    const currentOffset = { x: 0, y: 0 };

    const showFlash = () => {
      if (!flash) return;
      flash.classList.remove("is-active");
      warning.classList.add("is-flash");
      clearTimeout(flashTimer);
      flashTimer = setTimeout(() => warning.classList.remove("is-flash"), 500);
    };

    const applyGlitchOnce = () => {
      if (!message) return;
      const original = baseText || message.textContent;
      const frames = [
        original.replace(/[аеиоуыэюя]/gi, "¤"),
        original.replace(/[бвгджзклмнпрстфхцчшщ]/gi, "#")
      ];
      let idx = 0;
      message.textContent = frames[idx];
      const t1 = setTimeout(() => {
        idx = 1;
        message.textContent = frames[idx];
      }, 70);
      const t2 = setTimeout(() => {
        message.textContent = original;
        clearTimeout(t1);
      }, 140);
      return t2;
    };

    const onPointerMove = (event) => {
      if (!isVisible || pupils.length === 0) return;
      const rect = (warningCore || warning).getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = 6;
      const nx = dist ? dx / dist : 0;
      const ny = dist ? dy / dist : 0;
      pointerOffset.x = Math.max(-max, Math.min(max, nx * max));
      pointerOffset.y = Math.max(-max, Math.min(max, ny * max));
      lastPointerTime = Date.now();
      const intensity = Math.max(0, Math.min(1, 1 - dist / 220));
      const scale = 1 + intensity * 0.18;
      pupils.forEach(pupil => {
        pupil.dataset.scale = scale.toFixed(3);
      });
      if (dist < 160) showFlash();
    };

    const scheduleSaccade = () => {
      clearTimeout(saccadeTimer);
      const delay = 1800 + Math.random() * 2200;
      saccadeTimer = setTimeout(() => {
        idleOffset.x = (Math.random() * 8) - 4;
        idleOffset.y = (Math.random() * 6) - 3;
        scheduleSaccade();
      }, delay);
    };

    const tickEyes = () => {
      if (!isVisible || pupils.length === 0) return;
      const pointerActive = (Date.now() - lastPointerTime) < 1400;
      const target = pointerActive ? pointerOffset : idleOffset;
      currentOffset.x += (target.x - currentOffset.x) * 0.22;
      currentOffset.y += (target.y - currentOffset.y) * 0.22;
      pupils.forEach(pupil => {
        const scale = pointerActive ? parseFloat(pupil.dataset.scale || "1") : 1;
        pupil.style.transform = `translate(${currentOffset.x}px, ${currentOffset.y}px) scale(${scale})`;
      });
      rafId = requestAnimationFrame(tickEyes);
    };

    map.on("zoomend", () => {
      const currentZoom = map.getZoom();
      const minZoom = map.getMinZoom();
      if (currentZoom <= minZoom && !isVisible) {
        isVisible = true;
        mapEl.classList.add("darkened");
        warning.style.display = "block";
        warning.style.opacity = "0";
        requestAnimationFrame(() => {
          warning.style.opacity = "1";
        });
        if (warningCore) {
          warningCore.style.opacity = "0";
          warningCore.style.top = "-300px";
          warningCore.style.animation = "floatEntity 4s ease-in-out infinite";
        }
        setTimeout(() => {
          if (warningCore) {
            warningCore.style.top = "25%";
            warningCore.style.opacity = "1";
          }
          if (soundReady) { sound.currentTime = 0; sound.play().catch(()=>{}); }
        }, 100);

        if (message) {
          let toggle = false;
          const messages = [
            "Дальше нельзя, возвращайся обратно!",
            "Ты слишком далеко зашел...",
            "Я сущность, которая не пустит тебя дальше, возвращайся обратно!",
            "Здесь нечего смотреть, возвращайся обратно!",
            "Заходит как-то в зону черный сталкер и говорит... Так о чем это я... Уходи."
          ];
          textTimer = setInterval(() => {
            message.style.transition = "opacity 1.5s ease";
            message.style.opacity = "0";
            setTimeout(() => {
              if (toggle) {
                message.textContent = messages[Math.floor(Math.random() * messages.length)];
              } else {
                message.textContent = "Ты слишком далеко зашел...";
              }
              toggle = !toggle;
              message.style.opacity = "1";
            }, 1500);
          }, 20000);
        }
        glitchTimer = setInterval(() => {
          applyGlitchOnce();
        }, 5000);
        document.addEventListener("mousemove", onPointerMove);
        document.addEventListener("pointermove", onPointerMove);
        scheduleSaccade();
        rafId = requestAnimationFrame(tickEyes);
      } else if (currentZoom > minZoom && isVisible) {
        isVisible = false;
        mapEl.classList.remove("darkened");
        clearInterval(textTimer);
        clearInterval(glitchTimer);
        clearTimeout(flashTimer);
        clearTimeout(saccadeTimer);
        if (rafId) cancelAnimationFrame(rafId);
        warning.style.opacity = "0";
        if (warningCore) {
          warningCore.style.transition = "top 1.2s ease, opacity 1.2s ease";
          warningCore.style.opacity = "0";
          warningCore.style.top = "-300px";
          warningCore.style.animation = "none";
        }
        setTimeout(() => warning.style.display = "none", 1200);
        document.removeEventListener("mousemove", onPointerMove);
        document.removeEventListener("pointermove", onPointerMove);
      }
    });
  }

  window.initMapModule = function(APP) {
    const map = ensureMap(APP);
    if (!map) return;
    initZoomControls(APP, map);
    initWarningEntity(APP, map);
  };
})();
