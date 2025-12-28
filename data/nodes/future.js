// Автогенерация из data.js
const futureNodes = [
  {
    "id": "quantum_tech",
    "name": "Квантовые технологии",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 8,
    "lng": 19.5
  },
  {
    "id": "quantum_information",
    "name": "Квантовая информация",
    "category": "Будущее физики",
    "parent": "quantum_tech",
    "lat": 7.8,
    "lng": 14.3
  },
  {
    "id": "quantum_simulators",
    "name": "Квантовые симуляторы",
    "category": "Будущее физики",
    "parent": "quantum_tech",
    "lat": 8.2,
    "lng": 14.7
  },
  {
    "id": "quantum_gravity",
    "name": "Квантовая гравитация",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 10,
    "lng": 16
  },
  {
    "id": "string_theory",
    "name": "Теория струн",
    "category": "Будущее физики",
    "parent": "quantum_gravity",
    "lat": 10.5,
    "lng": 16.5
  },
  {
    "id": "loop_gravity",
    "name": "Петлевая квантовая гравитация",
    "category": "Будущее физики",
    "parent": "quantum_gravity",
    "lat": 9.5,
    "lng": 16.5
  },
  {
    "id": "beyond_standard",
    "name": "Физика за пределами Стандартной модели",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 10.2,
    "lng": 15.5
  },
  {
    "id": "neutrino",
    "name": "Физика нейтрино",
    "category": "Будущее физики",
    "parent": "beyond_standard",
    "lat": 10.7,
    "lng": 15.8
  },
  {
    "id": "multiverse",
    "name": "Мультивселенная",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 11,
    "lng": 16.2
  },
  {
    "id": "medical_physics",
    "name": "Медицинская физика",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 9,
    "lng": 13.5
  },
  {
    "id": "mri_technology",
    "name": "МРТ-технологии",
    "category": "Будущее физики",
    "parent": "medical_physics",
    "lat": 9.2,
    "lng": 13.3
  },
  {
    "id": "neurophysics",
    "name": "Нейрофизика",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 10,
    "lng": 13.8
  },
  {
    "id": "tech_control",
    "name": "Контроль технологий",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 8.5,
    "lng": 13.6
  },
  {
    "id": "solar_cells",
    "name": "Солнечные батареи",
    "category": "Будущее физики",
    "parent": "tech_control",
    "lat": 8.7,
    "lng": 13.3
  },
  {
    "id": "fusion",
    "name": "Термоядерный синтез",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 7,
    "lng": 15
  },
  {
    "id": "superconductivity",
    "name": "Сверхпроводимость",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 6.5,
    "lng": 14.5
  },
  {
    "id": "semiconductors",
    "name": "Полупроводники",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 7.5,
    "lng": 14
  },
  {
    "id": "neutron_stars",
    "name": "Нейтронные звезды",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 7,
    "lng": 16.5
  },
  {
    "id": "particle_accelerators",
    "name": "Ускорители частиц",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 8,
    "lng": 15.8
  },
  {
    "id": "accelerators",
    "name": "Ускорители нового поколения",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 8.5,
    "lng": 15.5
  },
  {
    "id": "quantum_biology",
    "name": "Квантовая биология",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 9.5,
    "lng": 16
  },
  {
    "id": "photosynthesis",
    "name": "Квантовые эффекты в фотосинтезе",
    "category": "Будущее физики",
    "parent": "quantum_biology",
    "lat": 9.8,
    "lng": 16.3
  },
  {
    "id": "magnetic_sense",
    "name": "Магнитное чувство птиц",
    "category": "Будущее физики",
    "parent": "quantum_biology",
    "lat": 9.2,
    "lng": 16.3
  },
  {
    "id": "ai_physics",
    "name": "Искусственный интеллект в физике",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 9.1,
    "lng": 14.1
  },
  {
    "id": "chaos_theory",
    "name": "Теория хаоса",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 6,
    "lng": 15.5
  },
  {
    "id": "scientific_status",
    "name": "Статус науки",
    "category": "Будущее физики",
    "parent": "future_core",
    "lat": 8,
    "lng": 13.7
  },
  {
    "id": "measurement_problem",
    "name": "Проблема измерения",
    "category": "Пропасть незнания",
    "parent": "unknown_core",
    "lat": 13.5,
    "lng": 2.8
  },
  {
    "id": "time_nature",
    "name": "Природа времени",
    "category": "Пропасть незнания",
    "parent": "unknown_core",
    "lat": 13.8,
    "lng": 3.2
  },
  {
    "id": "consciousness",
    "name": "Сознание и квантовая механика",
    "category": "Пропасть незнания",
    "parent": "unknown_core",
    "lat": 13.6,
    "lng": 2.5
  },
  {
    "id": "hierarchy",
    "name": "Проблема иерархии",
    "category": "Пропасть незнания",
    "parent": "unknown_core",
    "lat": 13.5,
    "lng": 3.5
  },
  {
    "id": "anthropic",
    "name": "Антропный принцип",
    "category": "Пропасть незнания",
    "parent": "unknown_core",
    "lat": 14,
    "lng": 2.8
  },
  {
    "id": "time_arrow",
    "name": "Стрела времени",
    "category": "Пропасть незнания",
    "parent": "unknown_core",
    "lat": 14.5,
    "lng": 3
  },
  {
    "id": "wave_collapse",
    "name": "Коллапс волновой функции",
    "category": "Пропасть незнания",
    "parent": "unknown_core",
    "lat": 15,
    "lng": 2.5
  },
  {
    "id": "spacetime_discrete",
    "name": "Дискретность пространства-времени",
    "category": "Пропасть незнания",
    "parent": "unknown_core",
    "lat": 15.5,
    "lng": 3.2
  },
  {
    "id": "local_realism",
    "name": "Локальный реализм",
    "category": "Пропасть незнания",
    "parent": "unknown_core",
    "lat": 16,
    "lng": 2.8
  },
  {
    "id": "crisis_cosmology",
    "name": "Кризис в космологии",
    "category": "Пропасть незнания",
    "parent": "unknown_core",
    "lat": 16.5,
    "lng": 3
  },
  {
    "id": "quantum_mind",
    "name": "Квантовый мозг",
    "category": "Пропасть незнания",
    "parent": "consciousness",
    "lat": 13.8,
    "lng": 2
  },
  {
    "id": "mass_defect",
    "name": "Дефект массы ядра",
    "category": "Будущее физики",
    "parent": "nuclear_physics",
    "lat": 6.1,
    "lng": 14.5
  },
  {
    "id": "proton_mass_future",
    "name": "Масса протона",
    "category": "Будущее физики",
    "parent": "quantum_thermo",
    "lat": 6.3,
    "lng": 15.6
  },
  {
    "id": "decay_law",
    "name": "Закон радиоактивного распада",
    "category": "Будущее физики",
    "parent": "nuclear_relations",
    "lat": 6.2,
    "lng": 14.5
  },
  {
    "id": "future_easter_egg",
    "name": "",
    "category": "??????? ??????",
    "parent": "future_core",
    "lat": 1.0,
    "lng": 21.1,
    "fillOpacity": 0.12
  }
];
window.allTopics = (window.allTopics || []).concat(futureNodes);
