const allTopics = [
      // Философские основания (17)
      // Философские основания (17 точек)
{ id: "ontology", name: "Онтология", category: "Философия", parent: "philosophy_core", lat: 14.2, lng: 9.0 },
{ id: "epistemology", name: "Эпистемология", category: "Философия", parent: "philosophy_core", lat: 14.8, lng: 9.8 },
{ id: "metaphysics", name: "Метафизика", category: "Философия", parent: "philosophy_core", lat: 15.5, lng: 8.5 },
{ id: "objective_reality", name: "Объективная реальность", category: "Философия", parent: "philosophy_core", lat: 16.0, lng: 10.5 },
{ id: "dark_matter_ontology", name: "Онтология темной материи", category: "Философия", parent: "philosophy_core", lat: 14.0, lng: 10.5 },
{ id: "observer_role", name: "Роль наблюдателя", category: "Философия", parent: "philosophy_core", lat: 15.8, lng: 12.0 },
{ id: "scientific_method", name: "Научный метод", category: "Философия", parent: "philosophy_core", lat: 16.5, lng: 9.0 },
{ id: "time_metaphysics", name: "Метафизика времени", category: "Философия", parent: "philosophy_core", lat: 16.2, lng: 11.0 },
{ id: "anthropic_principle", name: "Антропный принцип", category: "Философия", parent: "philosophy_core", lat: 14.5, lng: 11.0 },
{ id: "quantum_philosophy", name: "Философия квантовой механики", category: "Философия", parent: "philosophy_core", lat: 15.0, lng: 12.0 },
{ id: "relativity_philosophy", name: "Философия относительности", category: "Философия", parent: "philosophy_core", lat: 16.8, lng: 8.0 },
{ id: "consciousness_philosophy", name: "Сознание и физика", category: "Философия", parent: "philosophy_core", lat: 16.0, lng: 13.0 },
{ id: "determinism", name: "Детерминизм", category: "Философия", parent: "philosophy_core", lat: 15.2, lng: 7.5 },
{ id: "field_nature", name: "Природа поля", category: "Философия", parent: "philosophy_core", lat: 16.5, lng: 10.0 },
{ id: "reality_nature", name: "Природа реальности", category: "Философия", parent: "philosophy_core", lat: 15.7, lng: 9.0 },
{ id: "mathematical_methods", name: "Математические методы", category: "Философия", parent: "philosophy_core", lat: 14.5, lng: 8.0 },
{ id: "least_action", name: "Принцип наименьшего действия", category: "Философия", parent: "philosophy_core", lat: 14.8, lng: 8.5 },
{ id: "ether_theories", name: "Эфирные теории", category: "Философия", parent: "philosophy_core", lat: 15.3, lng: 9.2 },
{ id: "probability_interpretations", name: "Интерпретации вероятности", category: "Философия", parent: "philosophy_core", lat: 15.6, lng: 10.8 },
{ id: "copenhagen", name: "Копенгагенская интерпретация", category: "Философия", parent: "philosophy_core", lat: 15.9, lng: 11.5 },
      // Классическая физика - Механика (левый нижний сектор)
{ id: "mechanics", name: "Механика", category: "Классическая физика", parent: "classical_core", lat: 6.8, lng: 6.8 },
{ id: "kinematics", name: "Кинематика", category: "Классическая физика", parent: "mechanics", lat: 6.5, lng: 6.5 },
{ id: "kinematics_motion", name: "Движение точки", category: "Классическая физика", parent: "kinematics", lat: 6.4, lng: 6.4 },
{ id: "kinematics_rotation", name: "Вращательное движение", category: "Классическая физика", parent: "kinematics", lat: 6.6, lng: 6.4 },
{ id: "kinematics_relativity", name: "Относительность движения", category: "Классическая физика", parent: "kinematics", lat: 6.4, lng: 6.6 },
{ id: "uniform_motion", name: "Равномерное движение", category: "Классическая физика", parent: "kinematics", lat: 6.5, lng: 6.6 },
{ id: "accel_motion", name: "Равноускоренное движение", category: "Классическая физика", parent: "kinematics", lat: 6.6, lng: 6.5 },
{ id: "free_fall", name: "Свободное падение", category: "Классическая физика", parent: "kinematics", lat: 6.3, lng: 6.5 },

// Динамика
{ id: "dynamics", name: "Динамика", category: "Классическая физика", parent: "mechanics", lat: 7.2, lng: 7.2 },
{ id: "newton_laws", name: "Законы Ньютона", category: "Классическая физика", parent: "dynamics", lat: 7.3, lng: 7.3 },
{ id: "forces", name: "Силы в природе", category: "Классическая физика", parent: "dynamics", lat: 7.1, lng: 7.3 },
{ id: "complex_forces", name: "Движение под действием сил", category: "Классическая физика", parent: "dynamics", lat: 7.3, lng: 7.1 },
{ id: "friction_forces", name: "Силы трения", category: "Классическая физика", parent: "dynamics", lat: 7.2, lng: 7.5 },
{ id: "lever_principle", name: "Принцип рычага", category: "Классическая физика", parent: "dynamics", lat: 7.1, lng: 7.4 },

// Законы сохранения
{ id: "conservation", name: "Законы сохранения", category: "Классическая физика", parent: "mechanics", lat: 6.8, lng: 7.8 },
{ id: "energy", name: "Энергия", category: "Классическая физика", parent: "conservation", lat: 6.9, lng: 7.9 },
{ id: "momentum", name: "Импульс", category: "Классическая физика", parent: "conservation", lat: 6.7, lng: 7.8 },
{ id: "angular_momentum", name: "Момент импульса", category: "Классическая физика", parent: "conservation", lat: 6.9, lng: 8.0 },

// Колебания и волны
{ id: "oscillations", name: "Колебания и волны", category: "Классическая физика", parent: "mechanics", lat: 8.2, lng: 6.5 },
{ id: "harmonic", name: "Гармонические колебания", category: "Классическая физика", parent: "oscillations", lat: 8.3, lng: 6.6 },
{ id: "damped", name: "Затухающие колебания", category: "Классическая физика", parent: "oscillations", lat: 8.1, lng: 6.6 },
{ id: "mech_waves", name: "Механические волны", category: "Классическая физика", parent: "oscillations", lat: 8.2, lng: 6.3 },

// Статика
{ id: "statics", name: "Статика", category: "Классическая физика", parent: "mechanics", lat: 6.5, lng: 8.5 },
{ id: "equilibrium", name: "Условия равновесия", category: "Классическая физика", parent: "statics", lat: 6.6, lng: 8.6 },
{ id: "pressure", name: "Давление", category: "Классическая физика", parent: "statics", lat: 6.4, lng: 8.5 },
{ id: "archimedes", name: "Закон Архимеда", category: "Классическая физика", parent: "statics", lat: 6.5, lng: 8.4 },
{ id: "liquid_pressure", name: "Давление столба жидкости", category: "Классическая физика", parent: "statics", lat: 6.5, lng: 8.7 },

// Термодинамика (правый верхний сектор)
{ id: "thermodynamics", name: "Термодинамика", category: "Классическая физика", parent: "classical_core", lat: 11.5, lng: 11.5 },
{ id: "thermo_laws", name: "Законы термодинамики", category: "Классическая физика", parent: "thermodynamics", lat: 11.6, lng: 11.6 },
{ id: "entropy", name: "Энтропия", category: "Классическая физика", parent: "thermodynamics", lat: 11.4, lng: 11.6 },
{ id: "heat_machines", name: "Тепловые машины", category: "Классическая физика", parent: "thermodynamics", lat: 11.6, lng: 11.4 },

// МКТ
{ id: "mkt", name: "МКТ", category: "Классическая физика", parent: "thermodynamics", lat: 11.0, lng: 12.0 },
{ id: "ideal_gas", name: "Идеальный газ", category: "Классическая физика", parent: "mkt", lat: 11.1, lng: 12.1 },
{ id: "maxwell", name: "Распределение Максвелла", category: "Классическая физика", parent: "mkt", lat: 10.9, lng: 12.0 },
{ id: "transport", name: "Явления переноса", category: "Классическая физика", parent: "mkt", lat: 11.1, lng: 11.9 },

// Электромагнетизм (центральный правый сектор)
{ id: "electromagnetism", name: "Электромагнетизм", category: "Классическая физика", parent: "classical_core", lat: 12.5, lng: 8.5 },
{ id: "electrostatics", name: "Электростатика", category: "Классическая физика", parent: "electromagnetism", lat: 12.6, lng: 8.6 },
{ id: "current", name: "Электрический ток", category: "Классическая физика", parent: "electromagnetism", lat: 12.4, lng: 8.4 },
{ id: "magnetism", name: "Магнетизм", category: "Классическая физика", parent: "electromagnetism", lat: 12.6, lng: 8.4 },
{ id: "maxwell_eq", name: "Уравнения Максвелла", category: "Классическая физика", parent: "electromagnetism", lat: 12.5, lng: 8.6 },
{ id: "em_flux_density", name: "Плотность потока ЭМ излучения", category: "Классическая физика", parent: "electromagnetism", lat: 12.4, lng: 8.3 },

// Оптика (нижний правый выступ)
{ id: "optics", name: "Оптика", category: "Классическая физика", parent: "classical_core", lat: 12.8, lng: 6.5 },
{ id: "geo_optics", name: "Геометрическая оптика", category: "Классическая физика", parent: "optics", lat: 12.6, lng: 6.6 },
{ id: "wave_optics", name: "Волновая оптика", category: "Классическая физика", parent: "optics", lat: 12.5, lng: 6.8 },
{ id: "photometry", name: "Фотометрия", category: "Классическая физика", parent: "optics", lat: 12.6, lng: 6.4 },

// Дополнительные разделы
{ id: "condensed_matter", name: "Физика конденсированных сред", category: "Классическая физика", parent: "classical_core" },
{ id: "statistical_physics", name: "Статистическая физика", category: "Классическая физика", parent: "classical_core", lat: 8.9, lng: 12.4 },


// Аналитическая механика
{ id: "analytical_mech", name: "Аналитическая механика", category: "Классическая физика", parent: "classical_core", lat: 5.8, lng: 7.8 },
{ id: "lagrange", name: "Метод Лагранжа", category: "Классическая физика", parent: "analytical_mech", lat: 5.9, lng: 7.9 },
{ id: "hamilton", name: "Метод Гамильтона", category: "Классическая физика", parent: "analytical_mech", lat: 5.7, lng: 7.9 },
{ id: "celestial", name: "Небесная механика", category: "Классическая физика", parent: "analytical_mech", lat: 5.8, lng: 7.7 },

// Специальные разделы
{ id: "phase_transitions", name: "Фазовые переходы", category: "Классическая физика", parent: "classical_core", lat: 9.0, lng: 12.5 },
{ id: "nuclear_physics", name: "Ядерная физика", category: "Классическая физика", parent: "classical_core", lat: 9.3, lng: 11.1 },

      // Квантовая физика (29)
      // Квантовая физика (29 точек с новыми координатами)
{ id: "quantum_basics", name: "Основы квантовой физики", category: "Квантовая физика", parent: "quantum_core", lat: 2.0, lng: 8.5 },
{ id: "wave_particle", name: "Корпускулярно-волновой дуализм", category: "Квантовая физика", parent: "quantum_basics", lat: 1.8, lng: 8.0 },
{ id: "schrodinger", name: "Уравнение Шрёдингера", category: "Квантовая физика", parent: "quantum_basics", lat: 2.2, lng: 9.0 },
{ id: "uncertainty", name: "Принцип неопределённости", category: "Квантовая физика", parent: "quantum_basics", lat: 2.5, lng: 8.0 },
{ id: "wave_function", name: "Волновая функция", category: "Квантовая физика", parent: "quantum_basics", lat: 1.5, lng: 8.8 },
{ id: "hilbert_space", name: "Гильбертово пространство", category: "Квантовая физика", parent: "quantum_basics", lat: 3.0, lng: 8.2 },
{ id: "atomic_physics", name: "Атомная физика", category: "Квантовая физика", parent: "quantum_core", lat: 1.0, lng: 10.0 },
{ id: "bohr_model", name: "Модель Бора", category: "Квантовая физика", parent: "atomic_physics", lat: 0.8, lng: 10.5 },
{ id: "quantum_numbers", name: "Квантовые числа", category: "Квантовая физика", parent: "atomic_physics", lat: 1.2, lng: 9.8 },
{ id: "electron_spin", name: "Спин электрона", category: "Квантовая физика", parent: "atomic_physics", lat: 0.5, lng: 11.0 },
{ id: "pauli", name: "Принцип Паули", category: "Квантовая физика", parent: "atomic_physics", lat: 1.5, lng: 10.8 },
{ id: "quantum_effects", name: "Квантовые эффекты", category: "Квантовая физика", parent: "quantum_core", lat: 3.5, lng: 7.5 },
{ id: "tunneling", name: "Туннелирование", category: "Квантовая физика", parent: "quantum_effects", lat: 3.8, lng: 7.0 },
{ id: "entanglement", name: "Запутанность", category: "Квантовая физика", parent: "quantum_effects", lat: 3.2, lng: 8.0 },
{ id: "superposition", name: "Суперпозиция", category: "Квантовая физика", parent: "quantum_effects", lat: 3.0, lng: 7.2 },
{ id: "aharonov_bohm", name: "Эффект Ааронова-Бома", category: "Квантовая физика", parent: "quantum_effects", lat: 3.7, lng: 7.8 },
{ id: "qft", name: "Квантовая теория поля", category: "Квантовая физика", parent: "quantum_core", lat: 4.0, lng: 10.0 },
{ id: "qed", name: "Квантовая электродинамика", category: "Квантовая физика", parent: "qft", lat: 4.5, lng: 9.5 },
{ id: "qcd", name: "Квантовая хромодинамика", category: "Квантовая физика", parent: "qft", lat: 3.8, lng: 10.8 },
{ id: "standard_model", name: "Стандартная модель", category: "Квантовая физика", parent: "qft", lat: 4.2, lng: 11.2 },
{ id: "higgs", name: "Бозон Хиггса", category: "Квантовая физика", parent: "qft", lat: 4.8, lng: 10.2 },
{ id: "quantum_apps", name: "Приложения квантовой физики", category: "Квантовая физика", parent: "quantum_core", lat: 2.0, lng: 11.5 },
{ id: "quantum_computing", name: "Квантовые вычисления", category: "Квантовая физика", parent: "quantum_apps", lat: 1.5, lng: 12.0 },
{ id: "quantum_crypto", name: "Квантовая криптография", category: "Квантовая физика", parent: "quantum_apps", lat: 2.5, lng: 11.0 },
{ id: "quantum_sensors", name: "Квантовые сенсоры", category: "Квантовая физика", parent: "quantum_apps", lat: 2.2, lng: 12.2 },
{ id: "dirac_equation", name: "Уравнение Дирака", category: "Квантовая физика", parent: "quantum_basics", lat: 1.0, lng: 7.5 },
{ id: "quantum_thermo", name: "Квантовая термодинамика", category: "Квантовая физика", parent: "quantum_apps", lat: 1.8, lng: 11.8 },
{ id: "quantum_optics", name: "Квантовая оптика", category: "Квантовая физика", parent: "quantum_apps", lat: 2.8, lng: 12.5 },
{ id: "particle_physics", name: "Физика частиц", category: "Квантовая физика", parent: "quantum_core", lat: 0.2, lng: 9.5 },
{ id: "quantum_coherence", name: "Квантовая когерентность", category: "Квантовая физика", parent: "quantum_effects", lat: 3.5, lng: 6.8 },
{ id: "quantum_chaos", name: "Квантовый хаос", category: "Квантовая физика", parent: "quantum_effects", lat: 3.2, lng: 6.5 },
      // Теория относительности (16)
      // Теория относительности (17 точек)
{ id: "special", name: "Специальная теория относительности", category: "Теория относительности", parent: "relativity_core", lat: 7.0, lng: 2.5 },
{ id: "postulates", name: "Постулаты Эйнштейна", category: "Теория относительности", parent: "special", lat: 6.5, lng: 2.0 },

{ id: "effects", name: "Релятивистские эффекты", category: "Теория относительности", parent: "special", lat: 6.8, lng: 1.5 },
{ id: "dilation", name: "Замедление времени", category: "Теория относительности", parent: "effects", lat: 6.0, lng: 1.0 },
{ id: "length_contraction", name: "Сокращение длины", category: "Теория относительности", parent: "effects", lat: 7.1, lng: 1.5 },
{ id: "energy_momentum", name: "Релятивистская энергия-импульс", category: "Теория относительности", parent: "special", lat: 8.5, lng: 2.0 },
{ id: "general", name: "Общая теория относительности", category: "Теория относительности", parent: "relativity_core", lat: 9.0, lng: 3.5 },
{ id: "equivalence", name: "Принцип эквивалентности", category: "Теория относительности", parent: "general", lat: 8.0, lng: 4.0 },
{ id: "einstein_eq", name: "Уравнения Эйнштейна", category: "Теория относительности", parent: "general", lat: 9.5, lng: 3.0 },
{ id: "black_holes", name: "Чёрные дыры", category: "Теория относительности", parent: "general", lat: 10.0, lng: 1.0 },
{ id: "grav_waves", name: "Гравитационные волны", category: "Теория относительности", parent: "general", lat: 9.8, lng: 2.5 },
{ id: "cosmology", name: "Космология", category: "Теория относительности", parent: "relativity_core", lat: 11.0, lng: 3.5 },
{ id: "dark_matter", name: "Тёмная материя", category: "Теория относительности", parent: "cosmology", lat: 11.5, lng: 4.0 },
{ id: "dark_energy", name: "Тёмная энергия", category: "Теория относительности", parent: "cosmology", lat: 10.5, lng: 5.0 },
{ id: "universe_evolution", name: "Эволюция Вселенной", category: "Теория относительности", parent: "cosmology", lat: 12.0, lng: 5.0 },
{ id: "cosmic_rays", name: "Космические лучи", category: "Теория относительности", parent: "cosmology", lat: 11.8, lng: 3.8 },
{ id: "gps_systems", name: "GPS-системы", category: "Теория относительности", parent: "effects", lat: 7.1, lng: 1.0 },
{ id: "lorenz", name: "Преобразования Лоренца", category: "Теория относительности", parent: "special", lat: 7.5, lng: 3.0 },
     // Основной узел (центр зоны)
// Квантовые технологии (кластер вокруг 8.0, 14.5)
{ id: "quantum_tech", name: "Квантовые технологии",  category: "Будущее физики", parent: "future_core", lat: 8.0, lng: 14.5 },
{ id: "quantum_information", name: "Квантовая информация", category: "Будущее физики", parent: "quantum_tech", lat: 7.8, lng: 14.3 },
{ id: "quantum_simulators", name: "Квантовые симуляторы",  category: "Будущее физики", parent: "quantum_tech", lat: 8.2, lng: 14.7 },

// Теоретическая физика (кластер справа от центра)
{ id: "quantum_gravity", name: "Квантовая гравитация",  category: "Будущее физики", parent: "future_core", lat: 10.0, lng: 16.0 },
{ id: "string_theory", name: "Теория струн",  category: "Будущее физики", parent: "quantum_gravity", lat: 10.5, lng: 16.5 },
{ id: "loop_gravity", name: "Петлевая квантовая гравитация",  category: "Будущее физики", parent: "quantum_gravity", lat: 9.5, lng: 16.5 },
{ id: "beyond_standard", name: "Физика за пределами Стандартной модели", category: "Будущее физики", parent: "future_core", lat: 10.2, lng: 15.5 },
{ id: "neutrino", name: "Физика нейтрино",  category: "Будущее физики", parent: "beyond_standard", lat: 10.7, lng: 15.8 },
{ id: "multiverse", name: "Мультивселенная",  category: "Будущее физики", parent: "future_core", lat: 11.0, lng: 16.2 },

// Прикладные технологии (нижний кластер)
{ id: "medical_physics", name: "Медицинская физика",  category: "Будущее физики", parent: "future_core", lat: 9.0, lng: 13.5 },
{ id: "mri_technology", name: "МРТ-технологии", category: "Будущее физики", parent: "medical_physics", lat: 9.2, lng: 13.3 },
{ id: "neurophysics", name: "Нейрофизика",  category: "Будущее физики", parent: "future_core", lat: 10.0, lng: 13.8 },
{ id: "tech_control", name: "Контроль технологий", category: "Будущее физики", parent: "future_core", lat: 8.5, lng: 13.6 },
{ id: "solar_cells", name: "Солнечные батареи", category: "Будущее физики", parent: "tech_control", lat: 8.7, lng: 13.3 },

// Энергетика (левый кластер)
{ id: "fusion", name: "Термоядерный синтез", category: "Будущее физики", parent: "future_core", lat: 7.0, lng: 15.0 },
{ id: "superconductivity", name: "Сверхпроводимость", category: "Будущее физики", parent: "future_core", lat: 6.5, lng: 14.5 },
{ id: "semiconductors", name: "Полупроводники", category: "Будущее физики", parent: "future_core", lat: 7.5, lng: 14.0 },

// Космические исследования (верхний кластер)
{ id: "neutron_stars", name: "Нейтронные звезды", category: "Будущее физики", parent: "future_core", lat: 7.0, lng: 16.5 },
{ id: "particle_accelerators", name: "Ускорители частиц", category: "Будущее физики", parent: "future_core", lat: 8.0, lng: 15.8 },
{ id: "accelerators", name: "Ускорители нового поколения", category: "Будущее физики", parent: "future_core", lat: 8.5, lng: 15.5 },

// Междисциплинарные исследования
{ id: "quantum_biology", name: "Квантовая биология", category: "Будущее физики",  parent: "future_core", lat: 9.5, lng: 16.0 },
{ id: "photosynthesis", name: "Квантовые эффекты в фотосинтезе", category: "Будущее физики", parent: "quantum_biology", lat: 9.8, lng: 16.3 },
{ id: "magnetic_sense", name: "Магнитное чувство птиц", category: "Будущее физики", parent: "quantum_biology", lat: 9.2, lng: 16.3 },
{ id: "ai_physics", name: "Искусственный интеллект в физике", category: "Будущее физики", parent: "future_core", lat: 9.1, lng: 14.1 },
{ id: "chaos_theory", name: "Теория хаоса", category: "Будущее физики", parent: "future_core", lat: 6.0, lng: 15.5 },
{ id: "scientific_status", name: "Статус науки", category: "Будущее физики", parent: "future_core", lat: 8.0, lng: 13.7 },

      // Пропасть незнания (11)
{ id: "measurement_problem", name: "Проблема измерения", category: "Пропасть незнания", parent: "unknown_core", lat: 13.5, lng: 2.8 },
{ id: "time_nature", name: "Природа времени", category: "Пропасть незнания", parent: "unknown_core", lat: 13.8, lng: 3.2 },
{ id: "consciousness", name: "Сознание и квантовая механика", category: "Пропасть незнания", parent: "unknown_core", lat: 13.6, lng: 2.5 },
{ id: "hierarchy", name: "Проблема иерархии", category: "Пропасть незнания", parent: "unknown_core", lat: 13.5, lng: 3.5 },
{ id: "anthropic", name: "Антропный принцип", category: "Пропасть незнания", parent: "unknown_core", lat: 14.0, lng: 2.8 },
{ id: "time_arrow", name: "Стрела времени", category: "Пропасть незнания", parent: "unknown_core", lat: 14.5, lng: 3.0 },
{ id: "wave_collapse", name: "Коллапс волновой функции", category: "Пропасть незнания", parent: "unknown_core", lat: 15.0, lng: 2.5 },
{ id: "spacetime_discrete", name: "Дискретность пространства-времени", category: "Пропасть незнания", parent: "unknown_core", lat: 15.5, lng: 3.2 },
{ id: "local_realism", name: "Локальный реализм", category: "Пропасть незнания", parent: "unknown_core", lat: 16.0, lng: 2.8 },
{ id: "crisis_cosmology", name: "Кризис в космологии", category: "Пропасть незнания", parent: "unknown_core", lat: 16.5, lng: 3.0 },
{ id: "quantum_mind", name: "Квантовый мозг", category: "Пропасть незнания", parent: "consciousness", lat: 13.8, lng: 2.0 },


      // Новые подтемы
      
      { id: "hydrodynamics", name: "Гидродинамика", category: "Классическая физика", parent: "mechanics", lat: 7.7, lng: 8.3 },
      { id: "navier_stokes", name: "Уравнения Навье-Стокса", category: "Классическая физика", parent: "hydrodynamics", lat: 7.6, lng: 8.4 },
      { id: "quantum_fluids", name: "Квантовые жидкости", category: "Квантовая физика", parent: "condensed_matter", lat: 5.3, lng: 8.5 },
      { id: "quantum_algorithms", name: "Квантовые алгоритмы", category: "Квантовая физика", parent: "quantum_computing", lat: 5.8, lng: 8.7 },
      { id: "topological_insulators", name: "Топологические изоляторы", category: "Квантовая физика", parent: "condensed_matter", lat: 5.4, lng: 8.6 },
      { id: "holographic_principle", name: "Голографический принцип", category: "Теория относительности", parent: "quantum_gravity", lat: 5.2, lng: 3.2 },
     
      
      { id: "archaeophysics", name: "Археофизика", category: "Классическая физика", parent: "nuclear_physics", lat: 8.9, lng: 11.1},

      { id: "feynman_path", name: "Интегралы по траекториям (Фейнман)", category: "Квантовая физика", parent: "quantum_basics", lat: 5.1, lng: 8.0 },
      

      { id: "wave_characteristics", name: "Характеристики волн", category: "Классическая физика", parent: "oscillations", lat: 7.5, lng: 5.2 },
{ id: "amplitude", name: "Амплитуда", category: "Классическая физика", parent: "wave_characteristics", lat: 8.0, lng: 7.4 },
{ id: "wavelength", name: "Длина волны", category: "Классическая физика", parent: "wave_characteristics", lat: 8.2, lng: 7.4 },
{ id: "phase_velocity", name: "Фазовая скорость", category: "Классическая физика", parent: "wave_characteristics", lat: 8.1, lng: 7.2 },
{ id: "surface_tension", name: "Коэффициент поверхностного натяжения", category: "Классическая физика", parent: "wave_characteristics", lat: 8.05, lng: 7.5 },
{ id: "pendulum_types", name: "Типы маятников", category: "Классическая физика", parent: "harmonic", lat: 8.6, lng: 7.1 },
{ id: "phys_pendulum", name: "Физический маятник", category: "Классическая физика", parent: "pendulum_types", lat: 8.7, lng: 7.0 },
{ id: "math_pendulum", name: "Математический маятник", category: "Классическая физика", parent: "pendulum_types", lat: 8.5, lng: 7.0 },

{ id: "torsion_pendulum", name: "Крутильный маятник", category: "Классическая физика", parent: "pendulum_types", lat: 8.8, lng: 7.2 },
{ id: "spring_pendulum", name: "Пружинный маятник", category: "Классическая физика", parent: "pendulum_types", lat: 8.6, lng: 6.9 },

{ id: "oscillation_params", name: "Характеристики колебаний", category: "Классическая физика", parent: "harmonic", lat: 8.4, lng: 7.3 },
{ id: "oscillation_period", name: "Период колебаний", category: "Классическая физика", parent: "oscillation_params", lat: 8.3, lng: 7.4 },
{ id: "angular_frequency", name: "Циклическая частота", category: "Классическая физика", parent: "oscillation_params", lat: 8.5, lng: 7.4 },
{ id: "frequency", name: "Частота колебаний", category: "Классическая физика", parent: "oscillation_params", lat: 8.3, lng: 7.2 },
{ id: "em_oscillations", name: "Электромагнитные колебания", category: "Классическая физика", parent: "electromagnetism", lat: 7.4, lng: 8.4 },
{ id: "em_period", name: "Период электромагнитных колебаний", category: "Классическая физика", parent: "em_oscillations", lat: 7.3, lng: 8.5 },
{ id: "resonance_frequency", name: "Частота резонанса колебательного контура", category: "Классическая физика", parent: "em_oscillations", lat: 7.5, lng: 8.5 },

{ id: "wave_speeds", name: "Скорости распространения", category: "Классическая физика", parent: "mech_waves", lat: 7.85, lng: 8.0 },
{ id: "sound_speed_gas", name: "Скорость звука в газах", category: "Классическая физика", parent: "wave_speeds", lat: 7.8, lng: 8.1 },
{ id: "electricity_speed", name: "Скорость распространения электричества", category: "Классическая физика", parent: "wave_speeds", lat: 8.0, lng: 8.3 },
{ id: "em_wave_speed", name: "Скорость ЭМ волн в веществе", category: "Классическая физика", parent: "wave_speeds", lat: 7.83, lng: 7.9 },
{ id: "phase_wave_speed", name: "Фазовая скорость волны", category: "Классическая физика", parent: "wave_speeds", lat: 7.92, lng: 8.2 },

{ id: "wave_effects", name: "Эффекты волновых процессов", category: "Классическая физика", parent: "mech_waves", lat: 8.2, lng: 7.8 },
{ id: "doppler_effect", name: "Эффект Доплера", category: "Классическая физика", parent: "wave_effects", lat: 8.0, lng: 7.9 },
{ id: "pause_law", name: "Закон паузы", category: "Классическая физика", parent: "wave_effects", lat: 8.3, lng: 7.9 },


{ id: "period_frequency", name: "Связь периода и частоты", category: "Классическая физика", parent: "wave_relations", lat: 7.9, lng: 7.8 },
{ id: "wave_speed_relation", name: "Скорость волны и её параметры", category: "Классическая физика", parent: "wave_relations", lat: 8.15, lng: 7.8 },
{ id: "medium_properties", name: "Влияние свойств среды", category: "Классическая физика", parent: "wave_relations", lat: 7.95, lng: 7.6 },
{ id: "wave_relations", name: "Взаимосвязь параметров волн", category: "Классическая физика", parent: "mech_waves", lat: 8.0, lng: 7.7 },

// Основные характеристики света (группируем вокруг maxwell)
{ id: "light_characteristics", name: "Основные характеристики света", category: "Классическая физика", parent: "optics", lat: 12.2, lng: 6.9 },

// Физические параметры (радиально вокруг light_characteristics)
{ id: "wavelength_visible", name: "Длина волны видимого света", category: "Классическая физика", parent: "light_characteristics", lat: 12.11, lng: 7.3 },
{ id: "wave_number", name: "Волновое число", category: "Классическая физика", parent: "light_characteristics", lat: 12.1, lng: 6.9 },
{ id: "light_intensity", name: "Интенсивность света", category: "Классическая физика", parent: "light_characteristics", lat: 12.1, lng: 7.1 },
{ id: "refractive_index", name: "Показатель преломления", category: "Классическая физика", parent: "light_characteristics", lat: 12.0, lng: 7.15 },
{ id: "photometric_quantities", name: "Фотометрические величины", category: "Классическая физика", parent: "light_characteristics", lat: 12.53, lng: 6.45 },

// Характеристики источников света (выше maxwell)
{ id: "light_sources", name: "Характеристики источников света", category: "Классическая физика", parent: "optics", lat: 12.2, lng: 6.3 },
{ id: "luminous_intensity", name: "Сила света", category: "Классическая физика", parent: "light_sources", lat: 11.8, lng: 5.9 },
{ id: "luminosity", name: "Светимость", category: "Классическая физика", parent: "light_sources", lat: 11.8, lng: 6.5 },
{ id: "brightness", name: "Яркость", category: "Классическая физика", parent: "light_sources", lat: 11.8, lng: 6.1 },
{ id: "illuminance", name: "Освещённость", category: "Классическая физика", parent: "light_sources",  lat: 11.8, lng: 6.3 },
{ id: "lens_characteristics", name: "Характеристики линз", category: "Классическая физика", parent: "light_sources", lat: 12.15, lng: 6.6 },

// Оптические параметры (левее maxwell)
{ id: "optical_params", name: "Оптические параметры", category: "Классическая физика", parent: "optics", lat: 12.5, lng: 6.3 },
{ id: "focal_length", name: "Фокусное расстояние", category: "Классическая физика", parent: "optical_params", lat: 12.45, lng: 6.0 },
{ id: "optical_power", name: "Оптическая сила (D=1/F)", category: "Классическая физика", parent: "optical_params", lat: 12.45, lng: 6.2 },
{ id: "angular_characteristics", name: "Угловые характеристики", category: "Классическая физика", parent: "optical_params", lat: 12.45, lng: 6.4 },

// Пространственные параметры (ниже optical_params)
{ id: "spatial_params", name: "Пространственные параметры", category: "Классическая физика", parent: "optics", lat: 12.2, lng: 6.3 },
{ id: "solid_angle", name: "Телесный угол", category: "Классическая физика", parent: "spatial_params", lat: 8.9, lng: 8.2 },

// Законы и формулы (правее maxwell)
{ id: "light_laws", name: "Законы и формулы света", category: "Классическая физика", parent: "optics", lat: 12.59, lng: 6.8 },
{ id: "malus_law", name: "Закон Малюса", category: "Классическая физика", parent: "light_laws", lat: 9.2, lng: 8.66 },
{ id: "wien_law", name: "Закон смещения Вина", category: "Классическая физика", parent: "light_laws", lat: 9.7, lng: 8.6 },
{ id: "rayleigh_jeans", name: "Формула Рэлея-Джинса", category: "Классическая физика", parent: "light_laws", lat: 9.4, lng: 8.7 },

// Взаимосвязь параметров (между maxwell и optics)
{ id: "light_relations", name: "Взаимосвязь параметров света", category: "Классическая физика", parent: "optics", lat: 11.8, lng: 6.9 },
{ id: "intensity_angle", name: "Связь силы света и телесного угла", category: "Классическая физика", parent: "light_relations", lat: 11.6, lng: 7.0 },
{ id: "illuminance_intensity", name: "Зависимость освещённости от силы света", category: "Классическая физика", parent: "light_relations", lat: 11.69, lng: 7.15 },
{ id: "brightness_luminosity", name: "Взаимосвязь яркости и светимости", category: "Классическая физика", parent: "light_relations", lat: 11.7, lng: 6.9 },
// Ядерная физика (дополнения к существующей точке nuclear_physics)
{ id: "nuclear_characteristics", name: "Ядерные характеристики", category: "Классическая физика", parent: "nuclear_physics", lat: 8.95, lng: 11.2 },
{ id: "gyromagnetic_ratio", name: "Ядерное гидромагнитное отношение", category: "Классическая физика", parent: "nuclear_characteristics", lat: 8.85, lng: 10.9 },
{ id: "nuclear_magnetic_moment", name: "Магнитный момент ядра", category: "Классическая физика", parent: "nuclear_characteristics", lat: 9.0, lng: 8.56 },

// Диффузионные явления (связь с существующей точкой transport)
{ id: "diffusion_phenomena", name: "Диффузионные явления", category: "Классическая физика", parent: "transport", lat: 8.7, lng: 8.8 },
{ id: "diffusion_equation", name: "Уравнение диффузии", category: "Классическая физика", parent: "diffusion_phenomena", lat: 8.6, lng: 8.7 },

// Взаимосвязь параметров
{ id: "nuclear_relations", name: "Взаимосвязь ядерных параметров", category: "Классическая физика", parent: "nuclear_physics", lat: 9.1, lng: 11.2 },
{ id: "moment_ratio_relation", name: "Связь магнитного момента и гидромагнитного отношения", category: "Классическая физика", parent: "nuclear_relations", lat: 8.8, lng: 10.8 },
{ id: "diffusion_applications", name: "Применение уравнения диффузии", category: "Классическая физика", parent: "nuclear_relations", lat: 9.0, lng: 11.4 },
 // В раздел "Электромагнетизм" (parent: "electromagnetism")
{ id: "electric_charge", name: "Электрический заряд и его свойства", category: "Классическая физика", parent: "electromagnetism", lat: 12.5, lng: 8.9 },
{ id: "electric_fields", name: "Электрические поля", category: "Классическая физика", parent: "electromagnetism", lat: 12.55, lng: 8.55 },
{ id: "circuit_laws", name: "Законы электрических цепей", category: "Классическая физика", parent: "electromagnetism", lat: 9.0, lng: 7.8 },
{ id: "capacitance", name: "Ёмкость конденсатора", category: "Классическая физика", parent: "electromagnetism", lat: 9.4, lng: 7.7 },

// Подтемы для законов
{ id: "biot_savart", name: "Закон Био-Савара-Лапласа", category: "Классическая физика", parent: "magnetism", lat: 9.5, lng: 7.3 },
{ id: "ohm_law", name: "Закон Ома", category: "Классическая физика", parent: "current", lat: 8.9, lng: 7.9 },
{ id: "faraday_law", name: "Закон Фарадея", category: "Классическая физика", parent: "magnetism", lat: 9.6, lng: 7.4 },
{ id: "kirchhoff_laws", name: "Законы Кирхгофа", category: "Классическая физика", parent: "current", lat: 8.8, lng: 7.7 },
{ id: "lorentz_force", name: "Сила Лоренца", category: "Классическая физика", parent: "magnetism", lat: 12.48, lng: 8.52 },

// Дополнительные параметры
{ id: "resistance", name: "Электрическое сопротивление", category: "Классическая физика", parent: "current", lat: 8.7, lng: 7.6 },
{ id: "capacitors", name: "Конденсаторы", category: "Классическая физика", parent: "electrostatics", lat: 9.8, lng: 7.6 },
{ id: "emf", name: "ЭДС (электродвижущая сила)", category: "Классическая физика", parent: "current", lat: 8.6, lng: 7.8 },
{ id: "power", name: "Мощность тока", category: "Классическая физика", parent: "current", lat: 8.5, lng: 7.7 },
{ id: "energy_density", name: "Плотность энергии поля", category: "Классическая физика", parent: "electrostatics", lat: 12.6, lng: 8.6 },
// Основные законы и теоремы
{ id: "h_theorem", name: "H-теорема Больцмана", category: "Классическая физика", parent: "mkt", lat: 8.6, lng: 8.0 },
{ id: "gas_laws", name: "Газовые законы", category: "Классическая физика", parent: "mkt", lat: 8.4, lng: 8.2 },

// Подтемы газовых законов
{ id: "boyle_mariotte", name: "Закон Бойля-Мариотта", category: "Классическая физика", parent: "gas_laws", lat: 8.5, lng: 8.3 },
{ id: "charles_law", name: "Закон Шарля", category: "Классическая физика", parent: "gas_laws", lat: 8.5, lng: 8.1 },
{ id: "dalton_law", name: "Закон Дальтона", category: "Классическая физика", parent: "gas_laws", lat: 8.7, lng: 8.3 },

// Кинетические параметры
{ id: "molecular_motion", name: "Движение молекул", category: "Классическая физика", parent: "mkt", lat: 8.8, lng: 8.4 },
{ id: "mean_free_path", name: "Длина свободного пробега", category: "Классическая физика", parent: "molecular_motion", lat: 8.9, lng: 8.5 },
{ id: "molecular_speeds", name: "Скорости молекул", category: "Классическая физика", parent: "molecular_motion", lat: 8.7, lng: 8.6 },

// Уравнения состояния
{ id: "state_equations", name: "Уравнения состояния", category: "Классическая физика", parent: "mkt", lat: 8.2, lng: 8.4 },
{ id: "clausius_clapeyron", name: "Уравнение Клаузиуса-Клапейрона", category: "Классическая физика", parent: "state_equations", lat: 8.1, lng: 8.5 },
{ id: "mendeleev_clapeyron", name: "Уравнение Менделеева-Клапейрона", category: "Классическая физика", parent: "state_equations", lat: 8.3, lng: 8.5 },

// Влажность и теплота

{ id: "atomic_structure", name: "Строение атома", category: "Квантовая физика", parent: "quantum_basics", lat: 1.8, lng: 8.2 },
{ id: "quantum_moments", name: "Квантовые моменты", category: "Квантовая физика", parent: "atomic_structure", lat: 1.6, lng: 8.4 },
{ id: "orbital_moment", name: "Орбитальный момент", category: "Квантовая физика", parent: "quantum_moments", lat: 1.5, lng: 8.5 },
{ id: "spin_moment", name: "Спиновый момент", category: "Квантовая физика", parent: "quantum_moments", lat: 1.7, lng: 8.5 },
{ id: "photon_properties", name: "Свойства фотонов", category: "Квантовая физика", parent: "quantum_basics", lat: 2.0, lng: 8.0 },
{ id: "photon_energy", name: "Энергия фотона", category: "Квантовая физика", parent: "photon_properties", lat: 5.55, lng: 9.3 },
{ id: "compton_wavelength", name: "Комптоновская длина волны", category: "Квантовая физика", parent: "photon_properties", lat: 1.9, lng: 8.1 },
{ id: "bohr_radius", name: "Боровский радиус", category: "Квантовая физика", parent: "atomic_structure", lat: 1.9, lng: 8.3 },
{ id: "planck_formula", name: "Формула Планка", category: "Квантовая физика", parent: "quantum_physics", lat: 3.7, lng: 10.0 },
{ id: "mass_defect", name: "Дефект массы ядра", category: "Будущее физики", parent: "nuclear_physics", lat: 6.1, lng: 14.5 },
{ id: "proton_mass", name: "Масса протона", category: "Будущее физики", parent: "quantum_thermo", lat: 6.3, lng: 15.6 },
{ id: "decay_law", name: "Закон радиоактивного распада", category: "Будущее физики", parent: "nuclear_relations", lat: 6.2, lng: 14.5 },

{ id: "humidity", name: "Влажность газов", category: "Классическая физика", parent: "mkt", lat: 8.0, lng: 8.6 },
{ id: "absolute_humidity", name: "Абсолютная влажность", category: "Классическая физика", parent: "humidity", lat: 7.9, lng: 8.4 },
{ id: "heat_quantity", name: "Количество теплоты", category: "Классическая физика", parent: "thermodynamics", lat: 8.2, lng: 8.1 },

{ id: "current_interaction", name: "Взаимодействие токов", category: "Классическая физика", parent: "electromagnetism"},

// В массив nodes
// --- Фундаментальные постоянные ---
{ id: "fundamental_constants", name: "Фундаментальные постоянные", category: "Классическая физика", parent: "classical_core", lat: 9.0, lng: 9.5 },
{ id: "g_constant", name: "Гравитационная постоянная (G)", category: "Классическая физика", parent: "fundamental_constants", description: "6.67430×10⁻¹¹ м³·кг⁻¹·с⁻² - сила гравитации" },
{ id: "free_fall_accel", name: "Ускорение свободного падения (g)", category: "Классическая физика", parent: "fundamental_constants", description: "9.80665 м/с²" },
{ id: "bohr_radius", name: "Боровский радиус (a₀)", category: "Классическая физика", parent: "fundamental_constants", description: "5.29×10⁻¹¹ м" },
{ id: "proton_mass", name: "Масса протона (mₚ)", category: "Классическая физика", parent: "fundamental_constants", description: "1.67×10⁻²⁷ кг" },
{ id: "neutron_mass", name: "Масса нейтрона (mₙ)", category: "Классическая физика", parent: "fundamental_constants", description: "1.67×10⁻²⁷ кг" },
{ id: "electron_mass", name: "Масса электрона (mₑ)", category: "Классическая физика", parent: "fundamental_constants", description: "9.11×10⁻³¹ кг" },
{ id: "planck_constant", name: "Постоянная Планка (h)", category: "Классическая физика", parent: "fundamental_constants", description: "6.626×10⁻³⁴ Дж·с" },
{ id: "fine_structure", name: "Постоянная тонкой структуры (α)", category: "Классическая физика", parent: "fundamental_constants", description: "≈1/137" },
{ id: "elementary_charge", name: "Элементарный заряд (e)", category: "Классическая физика", parent: "fundamental_constants", description: "1.602×10⁻¹⁹ Кл" },
{ id: "speed_of_light", name: "Скорость света (c)", category: "Классическая физика", parent: "fundamental_constants", description: "299792458 м/с" },
{ id: "avogadro_number", name: "Число Авогадро (Nₐ)", category: "Классическая физика", parent: "fundamental_constants", description: "6.022×10²³ моль⁻¹" },
{ id: "gas_constant", name: "Газовая постоянная (R)", category: "Классическая физика", parent: "fundamental_constants", description: "8.314 Дж/(моль·К)" },

];

window.allTopics = (window.allTopics || []).concat(allTopics);
