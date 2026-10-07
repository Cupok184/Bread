import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "bread_wheel_stats_v1";

function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { history: [] };
}

function saveStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

export function useBreadStats() {
  const [stats, setStats] = useState({ history: [] });

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const addSpin = useCallback((answer, isLucky) => {
    setStats((prev) => {
      const entry = { answer, isLucky, timestamp: Date.now() };
      const next = { history: [...prev.history, entry] };
      saveStats(next);
      return next;
    });
  }, []);

  const resetStats = useCallback(() => {
    const next = { history: [] };
    saveStats(next);
    setStats(next);
  }, []);

  const computed = {
    history: stats.history,
    totalSpins: stats.history.length,
    uniqueCount: new Set(stats.history.map((h) => h.answer)).size,
    luckyCount: stats.history.filter((h) => h.isLucky).length,
    counts: stats.history.reduce((acc, h) => {
      acc[h.answer] = (acc[h.answer] || 0) + 1;
      return acc;
    }, {}),
  };

  return { stats: computed, addSpin, resetStats };
}