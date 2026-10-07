import { achievements } from "@/data/achievements";
import { breadAnswers } from "@/data/breadAnswers";

export default function StatsPanel({ stats, onReset }) {
  const sortedCounts = Object.entries(stats.counts).sort((a, b) => b[1] - a[1]);
  const progress = breadAnswers.length > 0 ? (stats.uniqueCount / breadAnswers.length) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Сводка */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <StatCard label="Всего спинов" value={stats.totalSpins} icon="🎰" />
        <StatCard
          label="Уникальных"
          value={`${stats.uniqueCount} / ${breadAnswers.length}`}
          icon="🥖"
        />
        <StatCard label="Золотых" value={stats.luckyCount} icon="✨" />
      </div>

      {/* Прогресс коллекции */}
      <div>
        <div className="flex justify-between text-sm mb-2" style={{ color: "#8B5E3C" }}>
          <span>Коллекция хлебов</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "#F5E6D3" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #D4A574, #F4D03F)",
            }}
          />
        </div>
      </div>

      {/* Достижения */}
      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: "#3D2817" }}>
          🏅 Достижения
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((a) => {
            const isUnlocked = a.check(stats);
            return (
              <div
                key={a.id}
                className="p-4 rounded-2xl text-center transition-all"
                style={{
                  background: isUnlocked
                    ? "linear-gradient(135deg, #FFF8E1, #F5E6D3)"
                    : "#F9F5F0",
                  opacity: isUnlocked ? 1 : 0.5,
                  border: isUnlocked ? "2px solid #F4D03F" : "2px solid transparent",
                }}
              >
                <div
                  className="text-3xl mb-2"
                  style={{ filter: isUnlocked ? "none" : "grayscale(1)" }}
                >
                  {a.icon}
                </div>
                <p className="font-bold text-sm" style={{ color: "#3D2817" }}>
                  {a.name}
                </p>
                <p className="text-xs mt-1" style={{ color: "#8B5E3C" }}>
                  {a.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Что уже выпало */}
      {sortedCounts.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: "#3D2817" }}>
            📋 Что уже выпало
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {sortedCounts.map(([answer, count]) => (
              <div
                key={answer}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                style={{ background: "#FFF8F0", border: "1px solid #F5E6D3" }}
              >
                <span style={{ color: "#3D2817" }}>{answer}</span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: "#D4A574", color: "#FFF" }}
                >
                  ×{count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.totalSpins === 0 && (
        <p className="text-center text-sm" style={{ color: "#8B5E3C" }}>
          Пока пусто — крути колесо, чтобы собрать статистику!
        </p>
      )}

      {/* Сброс */}
      {stats.totalSpins > 0 && (
        <button
          onClick={onReset}
          className="text-sm px-4 py-2 rounded-full transition-colors hover:bg-[#F5E6D3]"
          style={{ color: "#8B5E3C", border: "1px solid #D4A574" }}
        >
          Сбросить статистику
        </button>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div
      className="p-4 rounded-2xl text-center"
      style={{ background: "#FFF8F0", border: "1px solid #F5E6D3" }}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl md:text-2xl font-bold" style={{ color: "#3D2817" }}>
        {value}
      </div>
      <div className="text-xs mt-1" style={{ color: "#8B5E3C" }}>
        {label}
      </div>
    </div>
  );
}