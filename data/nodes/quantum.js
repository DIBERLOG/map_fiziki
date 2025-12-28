// Автогенерация из data.js
const quantumNodes = [
  {
    "id": "quantum_basics",
    "name": "Основы квантовой физики",
    "category": "Квантовая физика",
    "parent": "quantum_core",
    "lat": 2,
    "lng": 8.5
  },
  {
    "id": "wave_particle",
    "name": "Корпускулярно-волновой дуализм",
    "category": "Квантовая физика",
    "parent": "quantum_basics",
    "lat": 1.8,
    "lng": 8
  },
  {
    "id": "schrodinger",
    "name": "Уравнение Шрёдингера",
    "category": "Квантовая физика",
    "parent": "quantum_basics",
    "lat": 2.2,
    "lng": 9
  },
  {
    "id": "uncertainty",
    "name": "Принцип неопределённости",
    "category": "Квантовая физика",
    "parent": "quantum_basics",
    "lat": 2.5,
    "lng": 8
  },
  {
    "id": "wave_function",
    "name": "Волновая функция",
    "category": "Квантовая физика",
    "parent": "quantum_basics",
    "lat": 1.5,
    "lng": 8.8
  },
  {
    "id": "hilbert_space",
    "name": "Гильбертово пространство",
    "category": "Квантовая физика",
    "parent": "quantum_basics",
    "lat": 3,
    "lng": 8.2
  },
  {
    "id": "atomic_physics",
    "name": "Атомная физика",
    "category": "Квантовая физика",
    "parent": "quantum_core",
    "lat": 1,
    "lng": 10
  },
  {
    "id": "bohr_model",
    "name": "Модель Бора",
    "category": "Квантовая физика",
    "parent": "atomic_physics",
    "lat": 0.8,
    "lng": 10.5
  },
  {
    "id": "quantum_numbers",
    "name": "Квантовые числа",
    "category": "Квантовая физика",
    "parent": "atomic_physics",
    "lat": 1.2,
    "lng": 9.8
  },
  {
    "id": "electron_spin",
    "name": "Спин электрона",
    "category": "Квантовая физика",
    "parent": "atomic_physics",
    "lat": 0.5,
    "lng": 11
  },
  {
    "id": "pauli",
    "name": "Принцип Паули",
    "category": "Квантовая физика",
    "parent": "atomic_physics",
    "lat": 1.5,
    "lng": 10.8
  },
  {
    "id": "quantum_effects",
    "name": "Квантовые эффекты",
    "category": "Квантовая физика",
    "parent": "quantum_core",
    "lat": 3.5,
    "lng": 7.5
  },
  {
    "id": "tunneling",
    "name": "Туннелирование",
    "category": "Квантовая физика",
    "parent": "quantum_effects",
    "lat": 3.8,
    "lng": 7
  },
  {
    "id": "entanglement",
    "name": "Запутанность",
    "category": "Квантовая физика",
    "parent": "quantum_effects",
    "lat": 3.2,
    "lng": 8
  },
  {
    "id": "superposition",
    "name": "Суперпозиция",
    "category": "Квантовая физика",
    "parent": "quantum_effects",
    "lat": 3,
    "lng": 7.2
  },
  {
    "id": "aharonov_bohm",
    "name": "Эффект Ааронова-Бома",
    "category": "Квантовая физика",
    "parent": "quantum_effects",
    "lat": 3.7,
    "lng": 7.8
  },
  {
    "id": "qft",
    "name": "Квантовая теория поля",
    "category": "Квантовая физика",
    "parent": "quantum_core",
    "lat": 4,
    "lng": 10
  },
  {
    "id": "qed",
    "name": "Квантовая электродинамика",
    "category": "Квантовая физика",
    "parent": "qft",
    "lat": 4.5,
    "lng": 9.5
  },
  {
    "id": "qcd",
    "name": "Квантовая хромодинамика",
    "category": "Квантовая физика",
    "parent": "qft",
    "lat": 3.8,
    "lng": 10.8
  },
  {
    "id": "standard_model",
    "name": "Стандартная модель",
    "category": "Квантовая физика",
    "parent": "qft",
    "lat": 4.2,
    "lng": 11.2
  },
  {
    "id": "higgs",
    "name": "Бозон Хиггса",
    "category": "Квантовая физика",
    "parent": "qft",
    "lat": 4.8,
    "lng": 10.2
  },
  {
    "id": "quantum_apps",
    "name": "Приложения квантовой физики",
    "category": "Квантовая физика",
    "parent": "quantum_core",
    "lat": 2,
    "lng": 11.5
  },
  {
    "id": "quantum_computing",
    "name": "Квантовые вычисления",
    "category": "Квантовая физика",
    "parent": "quantum_apps",
    "lat": 1.5,
    "lng": 12
  },
  {
    "id": "quantum_crypto",
    "name": "Квантовая криптография",
    "category": "Квантовая физика",
    "parent": "quantum_apps",
    "lat": 2.5,
    "lng": 11
  },
  {
    "id": "quantum_sensors",
    "name": "Квантовые сенсоры",
    "category": "Квантовая физика",
    "parent": "quantum_apps",
    "lat": 2.2,
    "lng": 12.2
  },
  {
    "id": "dirac_equation",
    "name": "Уравнение Дирака",
    "category": "Квантовая физика",
    "parent": "quantum_basics",
    "lat": 1,
    "lng": 7.5
  },
  {
    "id": "quantum_thermo",
    "name": "Квантовая термодинамика",
    "category": "Квантовая физика",
    "parent": "quantum_apps",
    "lat": 1.8,
    "lng": 11.8
  },
  {
    "id": "quantum_optics",
    "name": "Квантовая оптика",
    "category": "Квантовая физика",
    "parent": "quantum_apps",
    "lat": 2.8,
    "lng": 12.5
  },
  {
    "id": "particle_physics",
    "name": "Физика частиц",
    "category": "Квантовая физика",
    "parent": "quantum_core",
    "lat": 0.2,
    "lng": 9.5
  },
  {
    "id": "quantum_coherence",
    "name": "Квантовая когерентность",
    "category": "Квантовая физика",
    "parent": "quantum_effects",
    "lat": 3.5,
    "lng": 6.8
  },
  {
    "id": "quantum_chaos",
    "name": "Квантовый хаос",
    "category": "Квантовая физика",
    "parent": "quantum_effects",
    "lat": 3.2,
    "lng": 6.5
  },
  {
    "id": "quantum_fluids",
    "name": "Квантовые жидкости",
    "category": "Квантовая физика",
    "parent": "condensed_matter",
    "lat": 5.3,
    "lng": 8.5
  },
  {
    "id": "quantum_algorithms",
    "name": "Квантовые алгоритмы",
    "category": "Квантовая физика",
    "parent": "quantum_computing",
    "lat": 5.8,
    "lng": 8.7
  },
  {
    "id": "topological_insulators",
    "name": "Топологические изоляторы",
    "category": "Квантовая физика",
    "parent": "condensed_matter",
    "lat": 5.4,
    "lng": 8.6
  },
  {
    "id": "feynman_path",
    "name": "Интегралы по траекториям (Фейнман)",
    "category": "Квантовая физика",
    "parent": "quantum_basics",
    "lat": 5.1,
    "lng": 8
  },
  {
    "id": "atomic_structure",
    "name": "Строение атома",
    "category": "Квантовая физика",
    "parent": "quantum_basics",
    "lat": 1.8,
    "lng": 8.2
  },
  {
    "id": "quantum_moments",
    "name": "Квантовые моменты",
    "category": "Квантовая физика",
    "parent": "atomic_structure",
    "lat": 1.6,
    "lng": 8.4
  },
  {
    "id": "orbital_moment",
    "name": "Орбитальный момент",
    "category": "Квантовая физика",
    "parent": "quantum_moments",
    "lat": 1.5,
    "lng": 8.5
  },
  {
    "id": "spin_moment",
    "name": "Спиновый момент",
    "category": "Квантовая физика",
    "parent": "quantum_moments",
    "lat": 1.7,
    "lng": 8.5
  },
  {
    "id": "photon_properties",
    "name": "Свойства фотонов",
    "category": "Квантовая физика",
    "parent": "quantum_basics",
    "lat": 2,
    "lng": 8
  },
  {
    "id": "photon_energy",
    "name": "Энергия фотона",
    "category": "Квантовая физика",
    "parent": "photon_properties",
    "lat": 5.55,
    "lng": 9.3
  },
  {
    "id": "compton_wavelength",
    "name": "Комптоновская длина волны",
    "category": "Квантовая физика",
    "parent": "photon_properties",
    "lat": 1.9,
    "lng": 8.1
  },
  {
    "id": "planck_formula",
    "name": "Формула Планка",
    "category": "Квантовая физика",
    "parent": "quantum_physics",
    "lat": 3.7,
    "lng": 10
  }
];
window.allTopics = (window.allTopics || []).concat(quantumNodes);
