// Анимация точек на фоне + плавный скролл и мобильное меню

// ===== Canvas с "точечной" волной =====
const canvas = document.getElementById("hero-bg");
const ctx = canvas.getContext("2d");

let width, height, particles;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initParticles();
}

function initParticles() {
  const count = Math.floor((width * height) / 9000); // плотность точек
  particles = new Array(count).fill(0).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.2 + 0.3,
    speed: Math.random() * 0.25 + 0.05,
    phase: Math.random() * Math.PI * 2
  }));
}

function tick() {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  particles.forEach(p => {
    p.phase += 0.005;
    const dx = Math.sin(p.phase) * 0.6;
    const dy = Math.cos(p.phase) * 0.4;

    p.y -= p.speed;
    if (p.y < -10) {
      p.y = height + 10;
      p.x = Math.random() * width;
    }

    ctx.beginPath();
    ctx.arc(p.x + dx, p.y + dy, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(tick);
}

resize();
tick();
window.addEventListener("resize", resize);

// ===== Плавный скролл по якорям =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    const y =
      target.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 900 ? 76 : 92);

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });

    // закрываем мобильное меню
    nav.classList.remove("nav--open");
  });
});

// ===== Переход на карту с эффектом =====
const transitionOverlay = document.getElementById("transition-overlay");
const startMapTransition = href => {
  if (document.body.classList.contains("is-transitioning")) return;
  document.body.classList.add("is-transitioning");
  if (transitionOverlay) transitionOverlay.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    window.location.href = href;
  }, 1150);
};

document.querySelectorAll('a[href="index_map.html"]').forEach(link => {
  link.addEventListener("click", e => {
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    startMapTransition(link.getAttribute("href"));
  });
});

// ===== Мобильное меню =====
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");

toggle.addEventListener("click", () => {
  nav.classList.toggle("nav--open");
});

// ===== Отправка формы (Formspree) =====
const contactForm = document.querySelector(".contact-form");
const formSuccess = document.querySelector(".form-success");

if (contactForm && formSuccess) {
  let hideTimer;
  contactForm.addEventListener("submit", async e => {
    e.preventDefault();
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    formSuccess.classList.remove("is-visible", "is-success", "is-error");
    formSuccess.textContent = "";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        contactForm.reset();
        formSuccess.textContent =
          "✓ Спасибо! Форма была успешно отправлена.";
        formSuccess.classList.add("is-success");
        formSuccess.classList.add("is-visible");
      } else {
        formSuccess.textContent = "✗ Не удалось отправить форму. Попробуйте еще раз.";
        formSuccess.classList.add("is-error");
        formSuccess.classList.add("is-visible");
      }
    } catch {
      formSuccess.textContent = "✗ Сеть недоступна. Попробуйте еще раз.";
      formSuccess.classList.add("is-error");
      formSuccess.classList.add("is-visible");
    }

    hideTimer = setTimeout(() => {
      formSuccess.classList.add("is-hiding");
      setTimeout(() => {
        formSuccess.classList.remove("is-visible", "is-success", "is-error", "is-hiding");
        formSuccess.textContent = "";
      }, 400);
    }, 30000);
  });
}

// ===== Модальные заметки =====
const modal = document.getElementById("note-modal");
const modalTitle = document.getElementById("note-modal-title");
const modalText = document.getElementById("note-modal-text");

if (modal && modalTitle && modalText) {
  const closeModal = () => {
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
  };

  const noteContent = {
    "Принцип наименьшего действия":
      "<p>Принцип наименьшего действия — это не отдельный закон физики, а язык, на котором законы формулируются наиболее экономично. Он утверждает, что реальная траектория системы — та, для которой интегральная величина, называемая действием, принимает экстремальное значение.</p>" +
      "<p>В механике это приводит к уравнениям Ньютона, в оптике — к закону Ферма, в квантовой физике — к суммированию по траекториям, а в общей теории относительности — к геодезическим в искривлённом пространстве-времени. Разные разделы физики используют разные формы действия, но сама идея остаётся неизменной.</p>" +
      "<p>Интуитивно это означает: природа «не выбирает» каждый шаг отдельно, а реализует целостное решение задачи. Карта физики показывает, как одна идея связывает области, которые на первый взгляд не имеют ничего общего.</p>",
    "Рождение статистической физики":
      "<p>История термодинамики началась с практической задачи — измерения температуры и понимания тепла. Первые термометры не требовали теории, но уже вскоре стало ясно, что тепло нельзя свести к одному числу без потери смысла.</p>" +
      "<p>С развитием кинетической теории стало понятно, что макроскопические величины отражают поведение огромного числа микроскопических частиц. Энтропия возникла как попытка количественно описать необратимость, а затем получила статистическую интерпретацию как мера числа микросостояний.</p>" +
      "<p>Переход от приборов к ансамблям показывает ключевую черту физики: наблюдение порождает язык описания. Карта помогает увидеть, как практические измерения постепенно превращаются в абстрактные, но универсальные понятия.</p>",
    "Навигация по карте":
      "<p>Карта физики — это не перечень тем, а навигационная система. Она позволяет двигаться не по учебнику, а по смысловым связям между идеями. Узлы показывают концепции, а линии — зависимости и логические переходы.</p>" +
      "<p>Используя карту, можно выстраивать индивидуальные маршруты: от классической механики к квантовой, от термодинамики к информации, от симметрий к законам сохранения. Такой подход особенно полезен при самостоятельном обучении, когда важно понимать, зачем изучается каждая тема.</p>" +
      "<p>Практическая ценность карты — в возможности видеть общую структуру знания, а не разрозненные формулы. Это снижает когнитивную нагрузку и ускоряет понимание.</p>",
    "Волновой взгляд":
      "<p>Волновое описание оказалось удивительно универсальным. Колебания струн, звуковые волны, свет и квантовые амплитуды подчиняются сходным математическим уравнениям, несмотря на разную физическую природу.</p>" +
      "<p>Использование единого языка — суперпозиции, интерференции, дифракции — позволяет переносить интуицию из одной области в другую. Исторически это привело к развитию оптики, радиофизики и квантовой механики.</p>" +
      "<p>Карта подчёркивает, что волновое мышление — это не раздел физики, а способ видеть структуру явлений. Оно помогает находить общие закономерности там, где поверхностно их не видно.</p>",
    "Симметрии и сохранение":
      "<p>Симметрия — это утверждение о неизменности физических законов при определённых преобразованиях. Она позволяет не угадывать уравнения, а выводить их из принципов.</p>" +
      "<p>Теорема Нётер показывает, что каждой непрерывной симметрии соответствует закон сохранения. Однородность времени связана с сохранением энергии, однородность пространства — с импульсом, изотропия — с моментом импульса.</p>" +
      "<p>Таким образом, симметрии не просто украшают теорию, а делают её минимальной. Карта физики демонстрирует, как симметрийные идеи проходят через механику, квантовую теорию и теорию поля.</p>",
    "Связи на карте":
      "<p>Связи на карте — это не хронология и не жёсткая программа обучения. Они показывают логическую поддержку идей: какие концепции опираются на другие и какие возникают как обобщения.</p>" +
      "<p>Толстые линии отражают фундаментальные зависимости, тонкие — контекстные или исторические. Перекрёстные связи между зонами подчёркивают междисциплинарные идеи, такие как симметрия, информация или принцип действия.</p>" +
      "<p>Читая карту, важно не искать «правильный путь», а понимать структуру поля. Это превращает изучение физики из линейного процесса в исследование. </p>" +
      "Удачи в изучении :) Надеюсь, вам понравится моя карта, и да, маленький секретик, так и быть, вам расскажу: на карте есть одна обособленная точка с моими идеями и информацией, вот тебе мини-квест найти её. (Так же попробуй отдалить максимально карту, появится звук)"
  };

  document.querySelectorAll(".note-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const { title, text } = link.dataset;
      if (title) modalTitle.textContent = title;
      if (title && noteContent[title]) {
        modalText.innerHTML = noteContent[title];
      } else if (text) {
        modalText.innerHTML = text;
      }
      modal.classList.add("modal--open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  modal.addEventListener("click", e => {
    if (e.target.matches("[data-modal-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

// ===== Орб: смена цвета и темы =====
const orb = document.querySelector(".hero-orb");
if (orb) {
  const orbTitle = orb.querySelector(".orb-title");
  const orbText = orb.querySelector(".orb-text");

  const zones = [
    {
      name: "Философия",
      color: "#6bc1ff",
      glow: "rgba(107, 193, 255, 0.35)",
      topics: ["Онтология", "Эпистемология", "Метафизика", "Природа реальности", "Научный метод", "Интерпретации"]
    },
    {
      name: "Классическая физика",
      color: "#ff6b6b",
      glow: "rgba(255, 107, 107, 0.35)",
      topics: ["Механика", "Термодинамика", "Оптика", "Электромагнетизм", "Колебания", "Динамика"]
    },
    {
      name: "Квантовая физика",
      color: "#b96bff",
      glow: "rgba(185, 107, 255, 0.35)",
      topics: ["Квантовые поля", "Неопределенность", "Атомная физика", "Квантовые эффекты", "Планк", "Квантовые технологии"]
    },
    {
      name: "Теория относительности",
      color: "#6bff9a",
      glow: "rgba(107, 255, 154, 0.35)",
      topics: ["СТО", "ОТО", "Гравитационные волны", "Космология", "Пространство-время", "Геометрия"]
    },
    {
      name: "Будущее физики",
      color: "#ffd86b",
      glow: "rgba(255, 216, 107, 0.35)",
      topics: ["Квантовая гравитация", "Темная энергия", "Теория струн", "Мультивселенная", "Фронтир", "Новые силы"]
    },
    {
      name: "Пропасть незнания",
      color: "#1f3d2d",
      glow: "rgba(31, 61, 45, 0.4)",
      topics: ["Природа времени", "Коллапс волны", "Локальный реализм", "Квантовый мозг", "Кризис космологии", "Парадоксы"]
    }
  ];

  const orbit = document.createElement("div");
  orbit.className = "orb-orbit";
  orb.appendChild(orbit);

  const slotAngles = [0, 60, 120, 180, 240, 300];
  const topicSlots = slotAngles.map(angle => {
    const item = document.createElement("span");
    item.className = "orb-topic";
    item.style.setProperty("--angle", angle + "deg");
    const spin = document.createElement("span");
    spin.className = "orb-topic__spin";
    const label = document.createElement("span");
    label.className = "orb-topic__label";
    spin.appendChild(label);
    item.appendChild(spin);
    orbit.appendChild(item);
    return label;
  });

  const renderTopics = (topics, color) => {
    topicSlots.forEach((label, idx) => {
      const topic = topics[idx] || "";
      label.textContent = topic;
      label.style.setProperty("--topic-color", color);
      label.style.opacity = topic ? "1" : "0";
    });
  };

  let index = 0;
  const applyZone = zone => {
    orb.classList.add("orb-switching");
    setTimeout(() => {
      orb.style.setProperty("--orb-color", zone.color);
      orb.style.setProperty("--orb-glow", zone.glow);
      if (orbTitle) orbTitle.textContent = zone.name;
      if (orbText) orbText.textContent = "Ключевые темы: " + zone.topics.slice(0, 3).join(", ") + ".";
      renderTopics(zone.topics, zone.color);
      setTimeout(() => {
        orb.classList.remove("orb-switching");
      }, 200);
    }, 500);
  };

  applyZone(zones[index]);
  setInterval(() => {
    index = (index + 1) % zones.length;
    applyZone(zones[index]);
  }, 50000);
}
