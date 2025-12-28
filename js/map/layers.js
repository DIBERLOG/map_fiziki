(() => {
  function getPolygonCenter(coords = []) {
    if (!coords.length) return [0, 0];
    const sum = coords.reduce((acc, [lat, lng]) => [acc[0] + lat, acc[1] + lng], [0, 0]);
    return [sum[0] / coords.length, sum[1] / coords.length];
  }

  function renderZones(app, layers, map) {
    const zones = window.zones || [];
    zones.forEach(zone => {
      // контур
      // eslint-disable-next-line no-undef
      const outline = L.polygon(zone.shape, {
        color: "#000",
        weight: 2,
        fillOpacity: 0,
        opacity: 1,
        interactive: false,
        bubblingMouseEvents: false,
        className: "outer-stroke"
      });
      outline.__zoneName = zone.name;
      outline.addTo(layers.zoneOutlines);

      // заливка
      // eslint-disable-next-line no-undef
      const polygon = L.polygon(zone.shape, {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.3,
        weight: 1,
        opacity: 1,
        interactive: false,
        bubblingMouseEvents: false
      });
      polygon.__zoneName = zone.name;
      polygon.addTo(layers.zones);

    });
  }

  function renderMainNodes(app, layers) {
    const { CONFIG } = app;
    const mainNodes = window.mainNodes || [];
    const map = app.STATE.map;
    const colors = app.STATE.categoryColors || {};

    mainNodes.forEach(node => {
      const color = colors[node.category];

      // eslint-disable-next-line no-undef
      const glow = L.circleMarker([node.lat, node.lng], {
        radius: 15,
        fillColor: color,
        color: "transparent",
        weight: 0,
        fillOpacity: 0.1
      }).addTo(layers.nodeGlows);
      node.glow = glow;

      // eslint-disable-next-line no-undef
      const marker = L.circleMarker([node.lat, node.lng], {
        radius: 8,
        fillColor: color,
        color: "#fff",
        weight: 1.5,
        opacity: 0.9,
        fillOpacity: 1
      }).addTo(layers.nodes);

      marker.bindTooltip(node.name, {
        permanent: true,
        direction: "top",
        className: "node-tooltip",
        offset: [0, -10]
      });

      marker.on("click", () => {
        if (typeof window.highlightNode === "function") window.highlightNode(node.id);
        if (typeof window.showModal === "function") window.showModal(node);
      });

      function attachTooltipClick() {
        const tt = marker.getTooltip && marker.getTooltip();
        const el = tt && tt.getElement && tt.getElement();
        if (!el || el.dataset.clickAttached === "1") return;
        el.dataset.clickAttached = "1";
        el.style.pointerEvents = "auto";
        el.style.cursor = "pointer";
        el.addEventListener("click", () => {
          if (typeof window.highlightNode === "function") window.highlightNode(node.id);
          if (typeof window.showModal === "function") window.showModal(node);
        });
      }

      marker.on("add", () => {
        attachTooltipClick();
        setTimeout(attachTooltipClick, 30);
      });
      marker.on("tooltipopen", attachTooltipClick);

      node.marker = marker;
    });
  }

  function attachTopicMarkers(app, layers) {
    const { CONFIG, STATE, helpers } = app;
    const map = STATE.map;
    if (!map) return;
    const allTopics = STATE.allTopics;
    const categoryColors = STATE.categoryColors || {};

    const markersGroup = layers.subtopics;
    STATE.markersGroup = markersGroup;
    const nodeTooltips = [];

    allTopics.forEach(topic => {
      if (!topic || !topic.id) return;
      if (!helpers.isValidLatLng(topic.lat, topic.lng)) return;

      const isEasterEgg = topic.id === "future_easter_egg";
      // eslint-disable-next-line no-undef
      const marker = L.circleMarker([topic.lat, topic.lng], {
        radius: topic.radius || CONFIG.style.defaultRadius,
        fillColor: topic.color || (categoryColors[topic.category] || "#ffffff"),
        color: isEasterEgg ? "transparent" : (topic.stroke || "#f8f8f8"),
        weight: isEasterEgg ? 0 : 1,
        opacity: isEasterEgg ? 0.25 : 0.9,
        fillOpacity: topic.fillOpacity || CONFIG.style.defaultFillOpacity,
        className: "node-marker"
      });
      if (isEasterEgg) {
        marker.__baseFillOpacity = topic.fillOpacity || CONFIG.style.defaultFillOpacity;
        marker.__baseOpacity = 0.25;
        layers.easterEggMarker = marker;
      }

      const title = topic.name || topic.id;
      const hideLabel = isEasterEgg;
      if (!hideLabel) {
        marker.bindTooltip(title, { permanent: true, direction: "top" });
        nodeTooltips.push(marker);
      }
      marker.on("click", () => {
        if (typeof window.highlightNode === "function") window.highlightNode(topic.id);
        if (typeof window.showModal === "function") {
          window.showModal(topic);
        } else {
          const info = document.querySelector("#info-panel");
          const desc = (window.descriptions && window.descriptions[topic.id]) || "\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445";
          if (info) info.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
        }
      });

      if (!isEasterEgg) {
        marker.on("mouseover", () => {
          try { marker.setStyle({ weight: 2, radius: (topic.radius || CONFIG.style.defaultRadius) + 1 }); } catch (_) {}
        });
        marker.on("mouseout", () => {
          try { marker.setStyle({ weight: 1, radius: topic.radius || CONFIG.style.defaultRadius }); } catch (_) {}
        });
      }

      marker.addTo(markersGroup);
      topic.marker = marker;

      // Клик по названию (tooltip) открывает то же модальное окно
      function attachTooltipClick() {
        const tt = marker.getTooltip && marker.getTooltip();
        const el = tt && tt.getElement && tt.getElement();
        if (!el || el.dataset.clickAttached === "1") return;
        el.dataset.clickAttached = "1";
        el.style.pointerEvents = "auto";
        el.style.cursor = "pointer";
        el.addEventListener("click", () => {
          if (typeof window.highlightNode === "function") window.highlightNode(topic.id);
          if (typeof window.showModal === "function") window.showModal(topic);
        });
      }

      marker.on("add", () => {
        attachTooltipClick();
        setTimeout(attachTooltipClick, 30);
      });
      marker.on("tooltipopen", attachTooltipClick);
    });

    layers.nodeTooltips = nodeTooltips;
  }

  function drawConnections(app, layers) {
    const connections = window.connections || [];
    const allNodes = [...(window.mainNodes || []), ...(app.STATE.allTopics || [])];

    connections.forEach(conn => {
      const sourceNode = allNodes.find(n => n.id === conn.source);
      const targetNode = allNodes.find(n => n.id === conn.target);
      if (!sourceNode || !targetNode) return;
      const sourcePos = sourceNode.marker ? sourceNode.marker.getLatLng() : [sourceNode.lat, sourceNode.lng];
      const targetPos = targetNode.marker ? targetNode.marker.getLatLng() : [targetNode.lat, targetNode.lng];

      // eslint-disable-next-line no-undef
      const line = L.polyline([sourcePos, targetPos], {
        color: conn.color || "#dddddd",
        weight: 1,
        opacity: 0.4,
        className: "faded-element connection-line"
      }).addTo(layers.connections);
      conn.line = line;
    });
  }

  window.initLayersModule = function(app) {
    const map = app.STATE.map;
    if (!map) return;

    const layers = {
      zones: L.layerGroup(),
      zoneOutlines: L.layerGroup(),
      nodes: L.layerGroup(),
      nodeGlows: L.layerGroup(),
      subtopics: L.layerGroup(),
      connections: L.layerGroup(),
      labels: L.layerGroup()
    };

    Object.values(layers).forEach(l => l.addTo(map));
    app.layers = layers;
    window.layers = layers;

    renderZones(app, layers, map);
    renderMainNodes(app, layers);
    attachTopicMarkers(app, layers);
    drawConnections(app, layers);

    function setTooltipVisibility(marker, show) {
      const tooltip = marker.getTooltip && marker.getTooltip();
      const el = tooltip && tooltip.getElement && tooltip.getElement();
      if (!el) return;
      el.style.transition = "opacity 0.45s ease, filter 0.45s ease";
      const filterHidden = el.dataset && el.dataset.filterHidden === "1";
      const finalShow = show && !filterHidden;
      el.style.opacity = finalShow ? "1" : "0";
      el.style.filter = finalShow ? "blur(0px)" : "blur(2px)";
      el.style.pointerEvents = finalShow ? "auto" : "none";
    }

    function setZoneLabelVisibility(label, show) {
      const el = label && label.getElement && label.getElement();
      if (!el) return;
      el.style.transition = "opacity 0.45s ease, filter 0.45s ease";
      el.style.opacity = show ? "1" : "0";
      el.style.filter = show ? "blur(0px)" : "blur(2px)";
      el.style.pointerEvents = show ? "auto" : "none";
    }

    function updateLabelVisibility() {
      const zoom = map.getZoom();
      const showNodes = zoom >= 8;
      const showZones = !showNodes;

      (layers.nodeTooltips || []).forEach(marker => setTooltipVisibility(marker, showNodes));
    }

    function updateEasterEggVisibility() {
      const marker = layers.easterEggMarker;
      if (!marker) return;
      const show = map.getZoom() >= 8;
      const baseFill = marker.__baseFillOpacity ?? marker.options.fillOpacity ?? 1;
      const baseOpacity = marker.__baseOpacity ?? marker.options.opacity ?? 1;
      marker.setStyle({ opacity: show ? baseOpacity : 0, fillOpacity: show ? baseFill : 0 });
      const el = marker.getElement && marker.getElement();
      if (el) el.style.pointerEvents = show ? "auto" : "none";
    }

    map.on("zoomend", () => {
      updateLabelVisibility();
      updateEasterEggVisibility();
    });
    setTimeout(() => {
      updateLabelVisibility();
      updateEasterEggVisibility();
    }, 0);
  };
})();
