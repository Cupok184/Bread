import { useState } from "react";
import confetti from "canvas-confetti";
import BreadWheel from "@/components/bread/BreadWheel";
import ResultCard from "@/components/bread/ResultCard";
import StatsPanel from "@/components/bread/StatsPanel";
import { useBreadStats } from "@/hooks/useBreadStats";
import { breadAnswers } from "@/data/breadAnswers";

export default function Home() {
  const [tab, setTab] = useState("wheel");
  const [result, setResult] = useState(null);
  const [isLucky, setIsLucky] = useState(false);
  const { stats, addSpin, resetStats } = useBreadStats();

  const handleResult = ({ isLucky: lucky }) => {
    const answer =
      breadAnswers.length > 0
        ? breadAnswers[Math.floor(Math.random() * breadAnswers.length)]
        : "Хлеб закончился 🍞";
    setResult(answer);
    setIsLucky(lucky);
    addSpin(answer, lucky);

    if (lucky) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F4D03F", "#FFD700", "#D4A574", "#8B5E3C"],
      });
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #FFF8F0, #F5E6D3)" }}
    >
      {/* Заголовок */}
      <header className="text-center pt-10 pb-6 px-4">
        <h1
          className="text-3xl md:text-5xl font-bold mb-2"
          style={{ color: "#3D2817" }}
        >
          🍞 Какой ты хлеб сегодня?
        </h1>
        <p className="text-sm md:text-base" style={{ color: "#8B5E3C" }}>
          Крути колесо и узнай свой хлеб дня
        </p>
      </header>

      {/* Вкладки */}
      <div className="flex justify-center gap-2 mb-8 px-4">
        <TabButton active={tab === "wheel"} onClick={() => setTab("wheel")}>
          🎡 Колесо
        </TabButton>
        <TabButton active={tab === "stats"} onClick={() => setTab("stats")}>
          🏆 Статистика
        </TabButton>
      </div>

      {/* Контент */}
      <main className="max-w-2xl mx-auto px-4 pb-20">
        {tab === "wheel" ? (
          <div className="flex flex-col items-center gap-8">
            <BreadWheel onResult={handleResult} />
            <ResultCard result={result} isLucky={isLucky} />
          </div>
        ) : (
          <StatsPanel stats={stats} onReset={resetStats} />
        )}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-5 md:px-6 py-2.5 rounded-full font-medium text-sm md:text-base transition-all"
      style={{
        background: active ? "linear-gradient(135deg, #D4A574, #8B5E3C)" : "transparent",
        color: active ? "#FFF" : "#8B5E3C",
        border: active ? "none" : "1px solid #D4A574",
        boxShadow: active ? "0 4px 12px rgba(139, 94, 60, 0.2)" : "none",
      }}
    >
      {children}
    </button>
  );
}