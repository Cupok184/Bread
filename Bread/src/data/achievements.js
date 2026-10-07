// ═══════════════════════════════════════════════════════════════
//  ДОСТИЖЕНИЯ
//  ─────────────────────────────────────────────────────────────────
//  Каждое достижение — объект с полями:
//    id          — уникальный идентификатор
//    name        — название (показывается пользователю)
//    description — условие (показывается пользователю)
//    icon        — эмодзи
//    check(s)    — функция, возвращает true если достижение получено
//
//  Объект статистики s содержит:
//    s.totalSpins  — сколько всего спинов сделано
//    s.uniqueCount — сколько уникальных ответов выпало
//    s.luckyCount  — сколько раз выпала золотая секция
//    s.history     — массив всех спинов: { answer, isLucky, timestamp }
//
//  Чтобы добавить достижение — просто добавь новый объект в массив.
// ═══════════════════════════════════════════════════════════════

export const achievements = [
  {
    id: "first_bite",
    name: "Первый кусочек",
    description: "Сделай первый спин",
    icon: "🍞",
    check: (s) => s.totalSpins >= 1,
  },
  {
    id: "appetite",
    name: "Хлебный аппетит",
    description: "10 спинов",
    icon: "🥖",
    check: (s) => s.totalSpins >= 10,
  },
  {
    id: "gourmet",
    name: "Хлебный гурман",
    description: "50 спинов",
    icon: "🥐",
    check: (s) => s.totalSpins >= 50,
  },
  {
    id: "collector_20",
    name: "Коллекционер",
    description: "Открой 20 уникальных хлебов",
    icon: "🧺",
    check: (s) => s.uniqueCount >= 20,
  },
  {
    id: "collector_50",
    name: "Хлебный знаток",
    description: "Открой 50 уникальных хлебов",
    icon: "🏆",
    check: (s) => s.uniqueCount >= 50,
  },
  {
    id: "lucky",
    name: "Золотой везунчик",
    description: "Попади на золотую секцию",
    icon: "✨",
    check: (s) => s.luckyCount >= 1,
  },
  {
    id: "lucky_5",
    name: "Счастливчик",
    description: "Попади на золотую секцию 5 раз",
    icon: "🌟",
    check: (s) => s.luckyCount >= 5,
  },
  {
    id: "streak_3",
    name: "Дежавю",
    description: "Выпал один хлеб 3 раза подряд",
    icon: "🔄",
    check: (s) => {
      if (s.history.length < 3) return false;
      const last3 = s.history.slice(-3);
      return last3.every((h) => h.answer === last3[0].answer);
    },
  },
];