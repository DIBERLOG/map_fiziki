(() => {
  function saveOriginalStyle(app, id, marker) {
    if (!marker || !marker.options) return;
    if (!app.STATE.originalMarkerStyles.has(id)) {
      app.STATE.originalMarkerStyles.set(id, {
        radius: marker.options.radius,
        color: marker.options.color,
        fillColor: marker.options.fillColor,
        fillOpacity: marker.options.fillOpacity,
        weight: marker.options.weight
      });
    }
  }

  function restoreOriginalStyle(app, id, marker) {
    if (!marker) return;
    const original = app.STATE.originalMarkerStyles.get(id);
    if (!original) return;
    try {
      marker.setStyle(original);
    } catch (e) {}
    app.STATE.originalMarkerStyles.delete(id);
  }

  function highlightAndZoomWhite(app, id, btn) {
    const { CONFIG, STATE } = app;
    const allTopics = STATE.allTopics || [];
    const topic = allTopics.find(t => t.id === id);
    if (!topic || !topic.marker) return;

    const marker = topic.marker;
    const latlng = marker.getLatLng ? marker.getLatLng() : null;

    saveOriginalStyle(app, id, marker);
    const original = STATE.originalMarkerStyles.get(id);

    if (STATE.map && latlng) {
      const currentZoom = STATE.map.getZoom ? STATE.map.getZoom() : CONFIG.mapDefaults.zoom;
      let targetZoom = currentZoom;
      if (currentZoom < 6) targetZoom = 7;
      else if (currentZoom < 9) targetZoom = currentZoom + 1;

      try {
        STATE.map.flyTo(latlng, targetZoom, { animate: true, duration: 1.0 });
      } catch (e) {}
    }

    if (btn) btn.classList.add("active");

    marker.setStyle({
      radius: (CONFIG.style.highlightRadius || 8) + 2,
      color: "#ffffff",
      fillColor: "#ffffff",
      fillOpacity: 1,
      weight: 1
    });

    let pulseActive = true;
    const pulseInterval = setInterval(() => {
      if (!pulseActive) return;
      const cur = marker.options.fillOpacity || 1;
      marker.setStyle({ fillOpacity: cur === 1 ? 0.45 : 1 });
    }, 550);

    setTimeout(() => {
      pulseActive = false;
      clearInterval(pulseInterval);
      if (btn) btn.classList.remove("active");
      if (original) {
        restoreOriginalStyle(app, id, marker);
      } else {
        marker.setStyle({
          radius: CONFIG.style.defaultRadius || 5,
          fillOpacity: CONFIG.style.defaultFillOpacity || 1,
          weight: 1
        });
      }
    }, 10000);
  }


  function layoutClassicalTree(app) {
    const topics = app.STATE.allTopics;
    const mainNodes = window.mainNodes || [];
    if (!Array.isArray(topics) || !topics.length) return;

    const center = mainNodes.find(n => n.id === "classical_core");
    if (!center || typeof center.lat !== "number" || typeof center.lng !== "number") return;

    const childrenByParent = new Map();
    topics.forEach(t => {
      if (!t || !t.id) return;
      if (!t.parent) return;
      if (!childrenByParent.has(t.parent)) childrenByParent.set(t.parent, []);
      childrenByParent.get(t.parent).push(t);
    });

    const roots = (childrenByParent.get("classical_core") || [])
      .slice()
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));

    if (!roots.length) return;

    function maxDepth(parentId, depth) {
      const children = childrenByParent.get(parentId) || [];
      if (!children.length) return depth;
      let max = depth;
      for (const child of children) {
        const d = maxDepth(child.id, depth + 1);
        if (d > max) max = d;
      }
      return max;
    }

    const maxDepthValue = maxDepth("classical_core", 0);
    const baseRadius = 0.8;
    const maxRadius = 2.2;
    const step = maxDepthValue > 0 ? (maxRadius - baseRadius) / maxDepthValue : 0.6;
    const fullCircle = Math.PI * 2;
    const rootStep = fullCircle / roots.length;
    const angleSpread = Math.PI * 1.2;

    function placeChildren(parentId, baseAngle, depth) {
      const children = (childrenByParent.get(parentId) || [])
        .slice()
        .sort((a, b) => String(a.id).localeCompare(String(b.id)));

      if (!children.length) return;

      const radius = baseRadius + step * depth;
      const stepAngle = children.length > 1 ? angleSpread / (children.length - 1) : 0;
      const startAngle = baseAngle - angleSpread / 2;

      children.forEach((child, i) => {
        const angle = startAngle + stepAngle * i;
        child.lat = center.lat + radius * Math.sin(angle);
        child.lng = center.lng + radius * Math.cos(angle);
        if (child.id === "angular_characteristics") {
          child.lng -= 0.35;
        }
        if (child.id === "rayleigh_jeans") {
          child.lng -= 0.35;
        }
        if (child.id === "oscillation_period") {
          child.lng -= 0.35;
        }
        if (child.id === "newton_laws") {
          child.lng -= 0.35;
        }
        if (child.id === "illuminance_intensity") {
          child.lng -= 0.35;
        }
        if (child.id === "solid_angle") {
          child.lat -= 0.35;
        }
        if (child.id === "speed_of_light") {
          child.lng += 0.35;
        }
        if (child.id === "nuclear_characteristics") {
          child.lat -= 0.35;
          child.lng -= 0.35;
        }
        if (child.id === "light_sources") {
          child.lng -= 0.35;
        }
        if (child.id === "focal_length") {
          child.lat += 0.25;
        }
        if (child.id === "wavelength_visible") {
          child.lng -= 0.35;
        }
        if (child.id === "gas_laws") {
          child.lat -= 0.25;
          child.lng -= 0.25;
        }
        if (child.id === "celestial") {
          child.lat -= 0.25;
          child.lng -= 0.25;
        }
        if (child.id === "resonance_frequency") {
          child.lat += 0.25;
          child.lng -= 0.25;
        }
        if (child.id === "period_frequency") {
          child.lat -= 0.25;
        }
        if (child.id === "photometry") {
          child.lng -= 0.25;
        }
        if (child.id === "wien_law") {
          child.lat -= 0.25;
          child.lng -= 0.25;
        }
        if (child.id === "nuclear_magnetic_moment") {
          child.lat += 0.25;
          child.lng += 0.25;
        }
        if (child.id === "complex_forces") {
          child.lat += 0.25;
          child.lng += 0.25;
        }
        if (child.id === "wave_speeds") {
          child.lat += 0.25;
          child.lng += 0.25;
        }
        if (child.id === "heat_quantity") {
          child.lat += 0.25;
          child.lng += 0.25;
        }
        if (child.id === "capacitance") {
          child.lat -= 0.25;
        }
        if (child.id === "diffusion_applications") {
          child.lat -= 0.25;
        }
        if (child.id === "liquid_pressure") {
          child.lng -= 0.25;
        }
        if (child.id === "dalton_law") {
          child.lng += 0.25;
        }
        if (child.id === "doppler_effect") {
          child.lng += 0.25;
        }
        if (child.id === "moment_ratio_relation") {
          child.lng += 0.25;
        }
        if (child.id === "electric_fields") {
          child.lng += 0.25;
        }
        if (child.id === "phase_velocity") {
          child.lat += 0.25;
        }
        if (child.id === "archaeophysics") {
          child.lat += 0.25;
        }
        if (child.id === "fine_structure") {
          child.lat += 0.25;
        }
        if (child.id === "brightness_luminosity") {
          child.lat += 0.25;
        }
        if (child.id === "gyromagnetic_ratio") {
          child.lat += 0.25;
        }
        if (child.id === "lagrange") {
          child.lat += 0.25;
        }
        if (child.id === "damped") {
          child.lat += 0.25;
        }
        if (child.id === "g_constant") {
          child.lat += 0.25;
        }
        if (child.id === "gas_constant") {
          child.lat += 0.25;
        }
        if (child.id === "neutron_mass") {
          child.lat += 0.25;
        }
        if (child.id === "friction_forces") {
          child.lat += 0.25;
        }
        if (child.id === "electrostatics") {
          child.lat += 0.25;
        }
        if (child.id === "friction_forces") {
          child.lng += 0.25;
        }
        if (child.id === "oscillation_params") {
          child.lng += 0.25;
        }
        if (child.id === "light_characteristics") {
          child.lng += 0.25;
        }
        if (child.id === "lever_principle") {
          child.lat += 0.25;
        }
        if (child.id === "pause_law") {
          child.lat -= 0.25;
          child.lng += 0.25;
        }
        if (child.id === "gas_laws") {
          child.lat -= 0.25;
          child.lng += 0.25;
        }
        if (child.id === "pendulum_types") {
          child.lat -= 0.25;
          child.lng += 0.25;
        }
        if (child.id === "electricity_speed") {
          child.lng -= 0.25;
        }
        if (child.id === "em_wave_speed") {
          child.lng -= 0.25;
        }
        placeChildren(child.id, angle, depth + 1);
      });
    }

    roots.forEach((root, i) => {
      const baseAngle = i * rootStep;
      root.lat = center.lat + baseRadius * Math.sin(baseAngle);
      root.lng = center.lng + baseRadius * Math.cos(baseAngle);
      placeChildren(root.id, baseAngle, 1);
    });
  }

  function layoutFutureCluster(app) {
    const topics = app.STATE.allTopics || [];
    const mainNodes = window.mainNodes || [];
    if (!topics.length || !mainNodes.length) return;

    const center = mainNodes.find(n => n.id === "future_core");
    if (!center || typeof center.lat !== "number" || typeof center.lng !== "number") return;
    if (!center.category) return;

    const futureNodes = topics
      .filter(t => t && t.category === center.category)
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));

    if (!futureNodes.length) return;

    const baseRadius = 0.6;
    const maxRadius = 1.8;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const total = futureNodes.length;

    futureNodes.forEach((node, i) => {
      const t = total > 1 ? i / (total - 1) : 0;
      const radius = baseRadius + (maxRadius - baseRadius) * Math.sqrt(t);
      const angle = i * goldenAngle;
      node.lat = center.lat + radius * Math.sin(angle);
      node.lng = center.lng + radius * Math.cos(angle);
      if (node.id === "quantum_tech") {
        node.lng += 0.3;
      }
    });
  }

  function layoutQuantumCluster(app) {
    const topics = app.STATE.allTopics || [];
    const mainNodes = window.mainNodes || [];
    if (!topics.length || !mainNodes.length) return;

    const center = mainNodes.find(n => n.id === "quantum_core");
    if (!center || typeof center.lat !== "number" || typeof center.lng !== "number") return;
    if (!center.category) return;

    const quantumNodes = topics
      .filter(t => t && t.category === center.category)
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));

    if (!quantumNodes.length) return;

    const baseRadius = 0.55;
    const maxRadius = 1.85;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const total = quantumNodes.length;

    quantumNodes.forEach((node, i) => {
      const t = total > 1 ? i / (total - 1) : 0;
      const radius = baseRadius + (maxRadius - baseRadius) * Math.sqrt(t);
      const angle = i * goldenAngle;
      node.lat = center.lat + radius * Math.sin(angle);
      node.lng = center.lng + radius * Math.cos(angle);
    });
  }

  function layoutPhilosophyCluster(app) {
    const topics = app.STATE.allTopics || [];
    const mainNodes = window.mainNodes || [];
    if (!topics.length || !mainNodes.length) return;

    const center = mainNodes.find(n => n.id === "philosophy_core");
    if (!center || typeof center.lat !== "number" || typeof center.lng !== "number") return;
    if (!center.category) return;

    const philosophyNodes = topics
      .filter(t => t && t.category === center.category)
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));

    if (!philosophyNodes.length) return;

    const baseRadius = 0.7;
    const maxRadius = 2.0;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const total = philosophyNodes.length;

    philosophyNodes.forEach((node, i) => {
      const t = total > 1 ? i / (total - 1) : 0;
      const radius = baseRadius + (maxRadius - baseRadius) * Math.sqrt(t);
      const angle = i * goldenAngle;
      node.lat = center.lat + radius * Math.sin(angle);
      node.lng = center.lng + radius * Math.cos(angle);
      if (node.id === "time_metaphysics") {
        node.lat -= 0.6;
      }
    });
  }

  function layoutUnknownCluster(app) {
    const topics = app.STATE.allTopics || [];
    const mainNodes = window.mainNodes || [];
    if (!topics.length || !mainNodes.length) return;

    const center = mainNodes.find(n => n.id === "unknown_core");
    if (!center || typeof center.lat !== "number" || typeof center.lng !== "number") return;
    if (!center.category) return;

    const unknownNodes = topics
      .filter(t => t && t.category === center.category)
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));

    if (!unknownNodes.length) return;

    const baseRadius = 0.6;
    const maxRadius = 1.9;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const total = unknownNodes.length;

    unknownNodes.forEach((node, i) => {
      const t = total > 1 ? i / (total - 1) : 0;
      const radius = baseRadius + (maxRadius - baseRadius) * Math.sqrt(t);
      const angle = i * goldenAngle;
      node.lat = center.lat + radius * Math.sin(angle);
      node.lng = center.lng + radius * Math.cos(angle);
      if (node.id === "time_nature") {
        node.lng += 0.35;
      }
    });
  }


  function shiftAllNodes(app, deltaLat, deltaLng) {
    const topics = app.STATE.allTopics || [];
    const mainNodes = window.mainNodes || [];

    topics.forEach(t => {
      if (t && typeof t.lat === "number" && typeof t.lng === "number") {
        t.lat += deltaLat;
        t.lng += deltaLng;
      }
    });

    mainNodes.forEach(n => {
      if (n && typeof n.lat === "number" && typeof n.lng === "number") {
        n.lat += deltaLat;
        n.lng += deltaLng;
      }
    });
  }

  window.initGraphLayoutModule = function(app) {
    shiftAllNodes(app, 0.5, 0);
    layoutClassicalTree(app);
    layoutFutureCluster(app);
    layoutQuantumCluster(app);
    layoutPhilosophyCluster(app);
    layoutUnknownCluster(app);
    document.addEventListener("click", (e) => {
      const btn = e.target.closest && e.target.closest(".eye-btn");
      if (!btn) return;
      const id = btn.dataset && btn.dataset.id;
      if (!id) return;
      if (window.resetHighlight && typeof window.resetHighlight === "function") {
        window.resetHighlight();
      }
      highlightAndZoomWhite(app, id, btn);
    });
  };
})();
