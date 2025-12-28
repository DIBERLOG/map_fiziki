// Автогенерация из data.js
const classicalNodes = [
  {
    "id": "mechanics",
    "name": "Механика",
    "category": "Классическая физика",
    "parent": "classical_core",
    "lat": 6.8,
    "lng": 6.8
  },
  {
    "id": "kinematics",
    "name": "Кинематика",
    "category": "Классическая физика",
    "parent": "mechanics",
    "lat": 6.5,
    "lng": 6.5
  },
  {
    "id": "kinematics_motion",
    "name": "Движение точки",
    "category": "Классическая физика",
    "parent": "kinematics",
    "lat": 6.4,
    "lng": 6.4
  },
  {
    "id": "kinematics_rotation",
    "name": "Вращательное движение",
    "category": "Классическая физика",
    "parent": "kinematics",
    "lat": 6.6,
    "lng": 6.4
  },
  {
    "id": "kinematics_relativity",
    "name": "Относительность движения",
    "category": "Классическая физика",
    "parent": "kinematics",
    "lat": 6.4,
    "lng": 6.6
  },
  {
    "id": "uniform_motion",
    "name": "Равномерное движение",
    "category": "Классическая физика",
    "parent": "kinematics",
    "lat": 6.5,
    "lng": 6.6
  },
  {
    "id": "accel_motion",
    "name": "Равноускоренное движение",
    "category": "Классическая физика",
    "parent": "kinematics",
    "lat": 6.6,
    "lng": 6.5
  },
  {
    "id": "free_fall",
    "name": "Свободное падение",
    "category": "Классическая физика",
    "parent": "kinematics",
    "lat": 6.3,
    "lng": 6.5
  },
  {
    "id": "dynamics",
    "name": "Динамика",
    "category": "Классическая физика",
    "parent": "mechanics",
    "lat": 7.2,
    "lng": 7.2
  },
  {
    "id": "newton_laws",
    "name": "Законы Ньютона",
    "category": "Классическая физика",
    "parent": "dynamics",
    "lat": 7.3,
    "lng": 7.3
  },
  {
    "id": "forces",
    "name": "Силы в природе",
    "category": "Классическая физика",
    "parent": "dynamics",
    "lat": 7.1,
    "lng": 7.3
  },
  {
    "id": "complex_forces",
    "name": "Движение под действием сил",
    "category": "Классическая физика",
    "parent": "dynamics",
    "lat": 7.3,
    "lng": 7.1
  },
  {
    "id": "friction_forces",
    "name": "Силы трения",
    "category": "Классическая физика",
    "parent": "dynamics",
    "lat": 7.2,
    "lng": 7.5
  },
  {
    "id": "lever_principle",
    "name": "Принцип рычага",
    "category": "Классическая физика",
    "parent": "dynamics",
    "lat": 7.1,
    "lng": 7.4
  },
  {
    "id": "conservation",
    "name": "Законы сохранения",
    "category": "Классическая физика",
    "parent": "mechanics",
    "lat": 6.8,
    "lng": 7.8
  },
  {
    "id": "energy",
    "name": "Энергия",
    "category": "Классическая физика",
    "parent": "conservation",
    "lat": 6.9,
    "lng": 7.9
  },
  {
    "id": "momentum",
    "name": "Импульс",
    "category": "Классическая физика",
    "parent": "conservation",
    "lat": 6.7,
    "lng": 7.8
  },
  {
    "id": "angular_momentum",
    "name": "Момент импульса",
    "category": "Классическая физика",
    "parent": "conservation",
    "lat": 6.9,
    "lng": 8
  },
  {
    "id": "oscillations",
    "name": "Колебания и волны",
    "category": "Классическая физика",
    "parent": "mechanics",
    "lat": 8.2,
    "lng": 6.5
  },
  {
    "id": "harmonic",
    "name": "Гармонические колебания",
    "category": "Классическая физика",
    "parent": "oscillations",
    "lat": 8.3,
    "lng": 6.6
  },
  {
    "id": "damped",
    "name": "Затухающие колебания",
    "category": "Классическая физика",
    "parent": "oscillations",
    "lat": 8.1,
    "lng": 6.6
  },
  {
    "id": "mech_waves",
    "name": "Механические волны",
    "category": "Классическая физика",
    "parent": "oscillations",
    "lat": 8.2,
    "lng": 6.3
  },
  {
    "id": "statics",
    "name": "Статика",
    "category": "Классическая физика",
    "parent": "mechanics",
    "lat": 6.5,
    "lng": 8.5
  },
  {
    "id": "equilibrium",
    "name": "Условия равновесия",
    "category": "Классическая физика",
    "parent": "statics",
    "lat": 6.6,
    "lng": 8.6
  },
  {
    "id": "pressure",
    "name": "Давление",
    "category": "Классическая физика",
    "parent": "statics",
    "lat": 6.4,
    "lng": 8.5
  },
  {
    "id": "archimedes",
    "name": "Закон Архимеда",
    "category": "Классическая физика",
    "parent": "statics",
    "lat": 6.5,
    "lng": 8.4
  },
  {
    "id": "liquid_pressure",
    "name": "Давление столба жидкости",
    "category": "Классическая физика",
    "parent": "statics",
    "lat": 6.5,
    "lng": 8.7
  },
  {
    "id": "thermodynamics",
    "name": "Термодинамика",
    "category": "Классическая физика",
    "parent": "classical_core",
    "lat": 11.5,
    "lng": 11.5
  },
  {
    "id": "thermo_laws",
    "name": "Законы термодинамики",
    "category": "Классическая физика",
    "parent": "thermodynamics",
    "lat": 11.6,
    "lng": 11.6
  },
  {
    "id": "entropy",
    "name": "Энтропия",
    "category": "Классическая физика",
    "parent": "thermodynamics",
    "lat": 11.4,
    "lng": 11.6
  },
  {
    "id": "heat_machines",
    "name": "Тепловые машины",
    "category": "Классическая физика",
    "parent": "thermodynamics",
    "lat": 11.6,
    "lng": 11.4
  },
  {
    "id": "mkt",
    "name": "МКТ",
    "category": "Классическая физика",
    "parent": "thermodynamics",
    "lat": 11,
    "lng": 12
  },
  {
    "id": "ideal_gas",
    "name": "Идеальный газ",
    "category": "Классическая физика",
    "parent": "mkt",
    "lat": 11.1,
    "lng": 12.1
  },
  {
    "id": "maxwell",
    "name": "Распределение Максвелла",
    "category": "Классическая физика",
    "parent": "mkt",
    "lat": 10.9,
    "lng": 12
  },
  {
    "id": "transport",
    "name": "Явления переноса",
    "category": "Классическая физика",
    "parent": "mkt",
    "lat": 11.1,
    "lng": 11.9
  },
  {
    "id": "electromagnetism",
    "name": "Электромагнетизм",
    "category": "Классическая физика",
    "parent": "classical_core",
    "lat": 12.5,
    "lng": 8.5
  },
  {
    "id": "electrostatics",
    "name": "Электростатика",
    "category": "Классическая физика",
    "parent": "electromagnetism",
    "lat": 12.6,
    "lng": 8.6
  },
  {
    "id": "current",
    "name": "Электрический ток",
    "category": "Классическая физика",
    "parent": "electromagnetism",
    "lat": 12.4,
    "lng": 8.4
  },
  {
    "id": "magnetism",
    "name": "Магнетизм",
    "category": "Классическая физика",
    "parent": "electromagnetism",
    "lat": 12.6,
    "lng": 8.4
  },
  {
    "id": "maxwell_eq",
    "name": "Уравнения Максвелла",
    "category": "Классическая физика",
    "parent": "electromagnetism",
    "lat": 12.5,
    "lng": 8.6
  },
  {
    "id": "em_flux_density",
    "name": "Плотность потока ЭМ излучения",
    "category": "Классическая физика",
    "parent": "electromagnetism",
    "lat": 12.4,
    "lng": 8.3
  },
  {
    "id": "optics",
    "name": "Оптика",
    "category": "Классическая физика",
    "parent": "classical_core",
    "lat": 12.8,
    "lng": 6.5
  },
  {
    "id": "geo_optics",
    "name": "Геометрическая оптика",
    "category": "Классическая физика",
    "parent": "optics",
    "lat": 12.6,
    "lng": 6.6
  },
  {
    "id": "wave_optics",
    "name": "Волновая оптика",
    "category": "Классическая физика",
    "parent": "optics",
    "lat": 12.5,
    "lng": 6.8
  },
  {
    "id": "photometry",
    "name": "Фотометрия",
    "category": "Классическая физика",
    "parent": "optics",
    "lat": 12.6,
    "lng": 6.4
  },
  {
    "id": "condensed_matter",
    "name": "Физика конденсированных сред",
    "category": "Классическая физика",
    "parent": "classical_core"
  },
  {
    "id": "statistical_physics",
    "name": "Статистическая физика",
    "category": "Классическая физика",
    "parent": "classical_core",
    "lat": 8.9,
    "lng": 12.4
  },
  {
    "id": "analytical_mech",
    "name": "Аналитическая механика",
    "category": "Классическая физика",
    "parent": "classical_core",
    "lat": 5.8,
    "lng": 7.8
  },
  {
    "id": "lagrange",
    "name": "Метод Лагранжа",
    "category": "Классическая физика",
    "parent": "analytical_mech",
    "lat": 5.9,
    "lng": 7.9
  },
  {
    "id": "hamilton",
    "name": "Метод Гамильтона",
    "category": "Классическая физика",
    "parent": "analytical_mech",
    "lat": 5.7,
    "lng": 7.9
  },
  {
    "id": "celestial",
    "name": "Небесная механика",
    "category": "Классическая физика",
    "parent": "analytical_mech",
    "lat": 5.8,
    "lng": 7.7
  },
  {
    "id": "phase_transitions",
    "name": "Фазовые переходы",
    "category": "Классическая физика",
    "parent": "classical_core",
    "lat": 9,
    "lng": 12.5
  },
  {
    "id": "nuclear_physics",
    "name": "Ядерная физика",
    "category": "Классическая физика",
    "parent": "classical_core",
    "lat": 9.3,
    "lng": 11.1
  },
  {
    "id": "hydrodynamics",
    "name": "Гидродинамика",
    "category": "Классическая физика",
    "parent": "mechanics",
    "lat": 7.7,
    "lng": 8.3
  },
  {
    "id": "navier_stokes",
    "name": "Уравнения Навье-Стокса",
    "category": "Классическая физика",
    "parent": "hydrodynamics",
    "lat": 7.6,
    "lng": 8.4
  },
  {
    "id": "archaeophysics",
    "name": "Археофизика",
    "category": "Классическая физика",
    "parent": "nuclear_physics",
    "lat": 8.9,
    "lng": 11.1
  },
  {
    "id": "wave_characteristics",
    "name": "Характеристики волн",
    "category": "Классическая физика",
    "parent": "oscillations",
    "lat": 7.5,
    "lng": 5.2
  },
  {
    "id": "amplitude",
    "name": "Амплитуда",
    "category": "Классическая физика",
    "parent": "wave_characteristics",
    "lat": 8,
    "lng": 7.4
  },
  {
    "id": "wavelength",
    "name": "Длина волны",
    "category": "Классическая физика",
    "parent": "wave_characteristics",
    "lat": 8.2,
    "lng": 7.4
  },
  {
    "id": "phase_velocity",
    "name": "Фазовая скорость",
    "category": "Классическая физика",
    "parent": "wave_characteristics",
    "lat": 8.1,
    "lng": 7.2
  },
  {
    "id": "surface_tension",
    "name": "Коэффициент поверхностного натяжения",
    "category": "Классическая физика",
    "parent": "wave_characteristics",
    "lat": 8.05,
    "lng": 7.5
  },
  {
    "id": "pendulum_types",
    "name": "Типы маятников",
    "category": "Классическая физика",
    "parent": "harmonic",
    "lat": 8.6,
    "lng": 7.1
  },
  {
    "id": "phys_pendulum",
    "name": "Физический маятник",
    "category": "Классическая физика",
    "parent": "pendulum_types",
    "lat": 8.7,
    "lng": 7
  },
  {
    "id": "math_pendulum",
    "name": "Математический маятник",
    "category": "Классическая физика",
    "parent": "pendulum_types",
    "lat": 8.5,
    "lng": 7
  },
  {
    "id": "torsion_pendulum",
    "name": "Крутильный маятник",
    "category": "Классическая физика",
    "parent": "pendulum_types",
    "lat": 8.8,
    "lng": 7.2
  },
  {
    "id": "spring_pendulum",
    "name": "Пружинный маятник",
    "category": "Классическая физика",
    "parent": "pendulum_types",
    "lat": 8.6,
    "lng": 6.9
  },
  {
    "id": "oscillation_params",
    "name": "Характеристики колебаний",
    "category": "Классическая физика",
    "parent": "harmonic",
    "lat": 8.4,
    "lng": 7.3
  },
  {
    "id": "oscillation_period",
    "name": "Период колебаний",
    "category": "Классическая физика",
    "parent": "oscillation_params",
    "lat": 8.3,
    "lng": 7.4
  },
  {
    "id": "angular_frequency",
    "name": "Циклическая частота",
    "category": "Классическая физика",
    "parent": "oscillation_params",
    "lat": 8.5,
    "lng": 7.4
  },
  {
    "id": "frequency",
    "name": "Частота колебаний",
    "category": "Классическая физика",
    "parent": "oscillation_params",
    "lat": 8.3,
    "lng": 7.2
  },
  {
    "id": "em_oscillations",
    "name": "Электромагнитные колебания",
    "category": "Классическая физика",
    "parent": "electromagnetism",
    "lat": 7.4,
    "lng": 8.4
  },
  {
    "id": "em_period",
    "name": "Период электромагнитных колебаний",
    "category": "Классическая физика",
    "parent": "em_oscillations",
    "lat": 7.3,
    "lng": 8.5
  },
  {
    "id": "resonance_frequency",
    "name": "Частота резонанса колебательного контура",
    "category": "Классическая физика",
    "parent": "em_oscillations",
    "lat": 7.5,
    "lng": 8.5
  },
  {
    "id": "wave_speeds",
    "name": "Скорости распространения",
    "category": "Классическая физика",
    "parent": "mech_waves",
    "lat": 7.85,
    "lng": 8
  },
  {
    "id": "sound_speed_gas",
    "name": "Скорость звука в газах",
    "category": "Классическая физика",
    "parent": "wave_speeds",
    "lat": 7.8,
    "lng": 8.1
  },
  {
    "id": "electricity_speed",
    "name": "Скорость распространения электричества",
    "category": "Классическая физика",
    "parent": "wave_speeds",
    "lat": 8,
    "lng": 8.3
  },
  {
    "id": "em_wave_speed",
    "name": "Скорость ЭМ волн в веществе",
    "category": "Классическая физика",
    "parent": "wave_speeds",
    "lat": 7.83,
    "lng": 7.9
  },
  {
    "id": "phase_wave_speed",
    "name": "Фазовая скорость волны",
    "category": "Классическая физика",
    "parent": "wave_speeds",
    "lat": 7.92,
    "lng": 8.2
  },
  {
    "id": "wave_effects",
    "name": "Эффекты волновых процессов",
    "category": "Классическая физика",
    "parent": "mech_waves",
    "lat": 8.2,
    "lng": 7.8
  },
  {
    "id": "doppler_effect",
    "name": "Эффект Доплера",
    "category": "Классическая физика",
    "parent": "wave_effects",
    "lat": 8,
    "lng": 7.9
  },
  {
    "id": "pause_law",
    "name": "Закон паузы",
    "category": "Классическая физика",
    "parent": "wave_effects",
    "lat": 8.3,
    "lng": 7.9
  },
  {
    "id": "period_frequency",
    "name": "Связь периода и частоты",
    "category": "Классическая физика",
    "parent": "wave_relations",
    "lat": 7.9,
    "lng": 7.8
  },
  {
    "id": "wave_speed_relation",
    "name": "Скорость волны и её параметры",
    "category": "Классическая физика",
    "parent": "wave_relations",
    "lat": 8.15,
    "lng": 7.8
  },
  {
    "id": "medium_properties",
    "name": "Влияние свойств среды",
    "category": "Классическая физика",
    "parent": "wave_relations",
    "lat": 7.95,
    "lng": 7.6
  },
  {
    "id": "wave_relations",
    "name": "Взаимосвязь параметров волн",
    "category": "Классическая физика",
    "parent": "mech_waves",
    "lat": 8,
    "lng": 7.7
  },
  {
    "id": "light_characteristics",
    "name": "Основные характеристики света",
    "category": "Классическая физика",
    "parent": "optics",
    "lat": 12.2,
    "lng": 6.9
  },
  {
    "id": "wavelength_visible",
    "name": "Длина волны видимого света",
    "category": "Классическая физика",
    "parent": "light_characteristics",
    "lat": 12.11,
    "lng": 7.3
  },
  {
    "id": "wave_number",
    "name": "Волновое число",
    "category": "Классическая физика",
    "parent": "light_characteristics",
    "lat": 12.1,
    "lng": 6.9
  },
  {
    "id": "light_intensity",
    "name": "Интенсивность света",
    "category": "Классическая физика",
    "parent": "light_characteristics",
    "lat": 12.1,
    "lng": 7.1
  },
  {
    "id": "refractive_index",
    "name": "Показатель преломления",
    "category": "Классическая физика",
    "parent": "light_characteristics",
    "lat": 12,
    "lng": 7.15
  },
  {
    "id": "photometric_quantities",
    "name": "Фотометрические величины",
    "category": "Классическая физика",
    "parent": "light_characteristics",
    "lat": 12.53,
    "lng": 6.45
  },
  {
    "id": "light_sources",
    "name": "Характеристики источников света",
    "category": "Классическая физика",
    "parent": "optics",
    "lat": 12.2,
    "lng": 6.3
  },
  {
    "id": "luminous_intensity",
    "name": "Сила света",
    "category": "Классическая физика",
    "parent": "light_sources",
    "lat": 11.8,
    "lng": 5.9
  },
  {
    "id": "luminosity",
    "name": "Светимость",
    "category": "Классическая физика",
    "parent": "light_sources",
    "lat": 11.8,
    "lng": 6.5
  },
  {
    "id": "brightness",
    "name": "Яркость",
    "category": "Классическая физика",
    "parent": "light_sources",
    "lat": 11.8,
    "lng": 6.1
  },
  {
    "id": "illuminance",
    "name": "Освещённость",
    "category": "Классическая физика",
    "parent": "light_sources",
    "lat": 11.8,
    "lng": 6.3
  },
  {
    "id": "lens_characteristics",
    "name": "Характеристики линз",
    "category": "Классическая физика",
    "parent": "light_sources",
    "lat": 12.15,
    "lng": 6.6
  },
  {
    "id": "optical_params",
    "name": "Оптические параметры",
    "category": "Классическая физика",
    "parent": "optics",
    "lat": 12.5,
    "lng": 6.3
  },
  {
    "id": "focal_length",
    "name": "Фокусное расстояние",
    "category": "Классическая физика",
    "parent": "optical_params",
    "lat": 12.45,
    "lng": 6
  },
  {
    "id": "optical_power",
    "name": "Оптическая сила (D=1/F)",
    "category": "Классическая физика",
    "parent": "optical_params",
    "lat": 12.45,
    "lng": 6.2
  },
  {
    "id": "angular_characteristics",
    "name": "Угловые характеристики",
    "category": "Классическая физика",
    "parent": "optical_params",
    "lat": 12.45,
    "lng": 6.4
  },
  {
    "id": "spatial_params",
    "name": "Пространственные параметры",
    "category": "Классическая физика",
    "parent": "optics",
    "lat": 12.2,
    "lng": 6.3
  },
  {
    "id": "solid_angle",
    "name": "Телесный угол",
    "category": "Классическая физика",
    "parent": "spatial_params",
    "lat": 8.9,
    "lng": 8.2
  },
  {
    "id": "light_laws",
    "name": "Законы и формулы света",
    "category": "Классическая физика",
    "parent": "optics",
    "lat": 12.59,
    "lng": 6.8
  },
  {
    "id": "malus_law",
    "name": "Закон Малюса",
    "category": "Классическая физика",
    "parent": "light_laws",
    "lat": 9.2,
    "lng": 8.66
  },
  {
    "id": "wien_law",
    "name": "Закон смещения Вина",
    "category": "Классическая физика",
    "parent": "light_laws",
    "lat": 9.7,
    "lng": 8.6
  },
  {
    "id": "rayleigh_jeans",
    "name": "Формула Рэлея-Джинса",
    "category": "Классическая физика",
    "parent": "light_laws",
    "lat": 9.4,
    "lng": 8.7
  },
  {
    "id": "light_relations",
    "name": "Взаимосвязь параметров света",
    "category": "Классическая физика",
    "parent": "optics",
    "lat": 11.8,
    "lng": 6.9
  },
  {
    "id": "intensity_angle",
    "name": "Связь силы света и телесного угла",
    "category": "Классическая физика",
    "parent": "light_relations",
    "lat": 11.6,
    "lng": 7
  },
  {
    "id": "illuminance_intensity",
    "name": "Зависимость освещённости от силы света",
    "category": "Классическая физика",
    "parent": "light_relations",
    "lat": 11.69,
    "lng": 7.15
  },
  {
    "id": "brightness_luminosity",
    "name": "Взаимосвязь яркости и светимости",
    "category": "Классическая физика",
    "parent": "light_relations",
    "lat": 11.7,
    "lng": 6.9
  },
  {
    "id": "nuclear_characteristics",
    "name": "Ядерные характеристики",
    "category": "Классическая физика",
    "parent": "nuclear_physics",
    "lat": 8.95,
    "lng": 11.2
  },
  {
    "id": "gyromagnetic_ratio",
    "name": "Ядерное гидромагнитное отношение",
    "category": "Классическая физика",
    "parent": "nuclear_characteristics",
    "lat": 8.85,
    "lng": 10.9
  },
  {
    "id": "nuclear_magnetic_moment",
    "name": "Магнитный момент ядра",
    "category": "Классическая физика",
    "parent": "nuclear_characteristics",
    "lat": 9,
    "lng": 8.56
  },
  {
    "id": "diffusion_phenomena",
    "name": "Диффузионные явления",
    "category": "Классическая физика",
    "parent": "transport",
    "lat": 8.7,
    "lng": 8.8
  },
  {
    "id": "diffusion_equation",
    "name": "Уравнение диффузии",
    "category": "Классическая физика",
    "parent": "diffusion_phenomena",
    "lat": 8.6,
    "lng": 8.7
  },
  {
    "id": "nuclear_relations",
    "name": "Взаимосвязь ядерных параметров",
    "category": "Классическая физика",
    "parent": "nuclear_physics",
    "lat": 9.1,
    "lng": 11.2
  },
  {
    "id": "moment_ratio_relation",
    "name": "Связь магнитного момента и гидромагнитного отношения",
    "category": "Классическая физика",
    "parent": "nuclear_relations",
    "lat": 8.8,
    "lng": 10.8
  },
  {
    "id": "diffusion_applications",
    "name": "Применение уравнения диффузии",
    "category": "Классическая физика",
    "parent": "nuclear_relations",
    "lat": 9,
    "lng": 11.4
  },
  {
    "id": "electric_charge",
    "name": "Электрический заряд и его свойства",
    "category": "Классическая физика",
    "parent": "electromagnetism",
    "lat": 12.5,
    "lng": 8.9
  },
  {
    "id": "electric_fields",
    "name": "Электрические поля",
    "category": "Классическая физика",
    "parent": "electromagnetism",
    "lat": 12.55,
    "lng": 8.55
  },
  {
    "id": "circuit_laws",
    "name": "Законы электрических цепей",
    "category": "Классическая физика",
    "parent": "electromagnetism",
    "lat": 9,
    "lng": 7.8
  },
  {
    "id": "capacitance",
    "name": "Ёмкость конденсатора",
    "category": "Классическая физика",
    "parent": "electromagnetism",
    "lat": 9.4,
    "lng": 7.7
  },
  {
    "id": "biot_savart",
    "name": "Закон Био-Савара-Лапласа",
    "category": "Классическая физика",
    "parent": "magnetism",
    "lat": 9.5,
    "lng": 7.3
  },
  {
    "id": "ohm_law",
    "name": "Закон Ома",
    "category": "Классическая физика",
    "parent": "current",
    "lat": 8.9,
    "lng": 7.9
  },
  {
    "id": "faraday_law",
    "name": "Закон Фарадея",
    "category": "Классическая физика",
    "parent": "magnetism",
    "lat": 9.6,
    "lng": 7.4
  },
  {
    "id": "kirchhoff_laws",
    "name": "Законы Кирхгофа",
    "category": "Классическая физика",
    "parent": "current",
    "lat": 8.8,
    "lng": 7.7
  },
  {
    "id": "lorentz_force",
    "name": "Сила Лоренца",
    "category": "Классическая физика",
    "parent": "magnetism",
    "lat": 12.48,
    "lng": 8.52
  },
  {
    "id": "resistance",
    "name": "Электрическое сопротивление",
    "category": "Классическая физика",
    "parent": "current",
    "lat": 8.7,
    "lng": 7.6
  },
  {
    "id": "capacitors",
    "name": "Конденсаторы",
    "category": "Классическая физика",
    "parent": "electrostatics",
    "lat": 9.8,
    "lng": 7.6
  },
  {
    "id": "emf",
    "name": "ЭДС (электродвижущая сила)",
    "category": "Классическая физика",
    "parent": "current",
    "lat": 8.6,
    "lng": 7.8
  },
  {
    "id": "power",
    "name": "Мощность тока",
    "category": "Классическая физика",
    "parent": "current",
    "lat": 8.5,
    "lng": 7.7
  },
  {
    "id": "energy_density",
    "name": "Плотность энергии поля",
    "category": "Классическая физика",
    "parent": "electrostatics",
    "lat": 12.6,
    "lng": 8.6
  },
  {
    "id": "h_theorem",
    "name": "H-теорема Больцмана",
    "category": "Классическая физика",
    "parent": "mkt",
    "lat": 8.6,
    "lng": 8
  },
  {
    "id": "gas_laws",
    "name": "Газовые законы",
    "category": "Классическая физика",
    "parent": "mkt",
    "lat": 8.4,
    "lng": 8.2
  },
  {
    "id": "boyle_mariotte",
    "name": "Закон Бойля-Мариотта",
    "category": "Классическая физика",
    "parent": "gas_laws",
    "lat": 8.5,
    "lng": 8.3
  },
  {
    "id": "charles_law",
    "name": "Закон Шарля",
    "category": "Классическая физика",
    "parent": "gas_laws",
    "lat": 8.5,
    "lng": 8.1
  },
  {
    "id": "dalton_law",
    "name": "Закон Дальтона",
    "category": "Классическая физика",
    "parent": "gas_laws",
    "lat": 8.7,
    "lng": 8.3
  },
  {
    "id": "molecular_motion",
    "name": "Движение молекул",
    "category": "Классическая физика",
    "parent": "mkt",
    "lat": 8.8,
    "lng": 8.4
  },
  {
    "id": "mean_free_path",
    "name": "Длина свободного пробега",
    "category": "Классическая физика",
    "parent": "molecular_motion",
    "lat": 8.9,
    "lng": 8.5
  },
  {
    "id": "molecular_speeds",
    "name": "Скорости молекул",
    "category": "Классическая физика",
    "parent": "molecular_motion",
    "lat": 8.7,
    "lng": 8.6
  },
  {
    "id": "state_equations",
    "name": "Уравнения состояния",
    "category": "Классическая физика",
    "parent": "mkt",
    "lat": 8.2,
    "lng": 8.4
  },
  {
    "id": "clausius_clapeyron",
    "name": "Уравнение Клаузиуса-Клапейрона",
    "category": "Классическая физика",
    "parent": "state_equations",
    "lat": 8.1,
    "lng": 8.5
  },
  {
    "id": "mendeleev_clapeyron",
    "name": "Уравнение Менделеева-Клапейрона",
    "category": "Классическая физика",
    "parent": "state_equations",
    "lat": 8.3,
    "lng": 8.5
  },
  {
    "id": "humidity",
    "name": "Влажность газов",
    "category": "Классическая физика",
    "parent": "mkt",
    "lat": 8,
    "lng": 8.6
  },
  {
    "id": "absolute_humidity",
    "name": "Абсолютная влажность",
    "category": "Классическая физика",
    "parent": "humidity",
    "lat": 7.9,
    "lng": 8.4
  },
  {
    "id": "heat_quantity",
    "name": "Количество теплоты",
    "category": "Классическая физика",
    "parent": "thermodynamics",
    "lat": 8.2,
    "lng": 8.1
  },
  {
    "id": "current_interaction",
    "name": "Взаимодействие токов",
    "category": "Классическая физика",
    "parent": "electromagnetism"
  },
  {
    "id": "fundamental_constants",
    "name": "Фундаментальные постоянные",
    "category": "Классическая физика",
    "parent": "classical_core",
    "lat": 9,
    "lng": 9.5
  },
  {
    "id": "g_constant",
    "name": "Гравитационная постоянная (G)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "6.67430×10⁻¹¹ м³·кг⁻¹·с⁻² - сила гравитации"
  },
  {
    "id": "free_fall_accel",
    "name": "Ускорение свободного падения (g)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "9.80665 м/с²"
  },
  {
    "id": "bohr_radius",
    "name": "Боровский радиус (a₀)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "lat": 1.9,
    "lng": 8.3,
    "description": "5.29×10⁻¹¹ м"
  },
  {
    "id": "proton_mass",
    "name": "Масса протона (mₚ)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "1.67×10⁻²⁷ кг"
  },
  {
    "id": "neutron_mass",
    "name": "Масса нейтрона (mₙ)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "1.67×10⁻²⁷ кг"
  },
  {
    "id": "electron_mass",
    "name": "Масса электрона (mₑ)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "9.11×10⁻³¹ кг"
  },
  {
    "id": "planck_constant",
    "name": "Постоянная Планка (h)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "6.626×10⁻³⁴ Дж·с"
  },
  {
    "id": "fine_structure",
    "name": "Постоянная тонкой структуры (α)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "≈1/137"
  },
  {
    "id": "elementary_charge",
    "name": "Элементарный заряд (e)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "1.602×10⁻¹⁹ Кл"
  },
  {
    "id": "speed_of_light",
    "name": "Скорость света (c)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "299792458 м/с"
  },
  {
    "id": "avogadro_number",
    "name": "Число Авогадро (Nₐ)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "6.022×10²³ моль⁻¹"
  },
  {
    "id": "gas_constant",
    "name": "Газовая постоянная (R)",
    "category": "Классическая физика",
    "parent": "fundamental_constants",
    "description": "8.314 Дж/(моль·К)"
  }
];
window.allTopics = (window.allTopics || []).concat(classicalNodes);
