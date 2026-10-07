import { motion, AnimatePresence } from "framer-motion";

export default function ResultCard({ result, isLucky }) {
  return (
    <div className="min-h-[120px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result + (isLucky ? "-lucky" : "")}
            initial={{ opacity: 0, y: 20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="text-center"
          >
            <div
              className="inline-block px-8 py-6 rounded-3xl"
              style={{
                background: isLucky
                  ? "linear-gradient(135deg, #FFF8E1, #FFE066)"
                  : "linear-gradient(135deg, #FFF8F0, #F5E6D3)",
                border: isLucky ? "3px solid #FFD700" : "2px solid #D4A574",
                boxShadow: isLucky
                  ? "0 8px 32px rgba(255, 215, 0, 0.4)"
                  : "0 4px 16px rgba(139, 94, 60, 0.15)",
              }}
            >
              <p
                className="text-sm font-medium mb-2"
                style={{ color: "#8B5E3C" }}
              >
                {isLucky ? "✨ Везунчик! Сегодня ты:" : "Сегодня ты:"}
              </p>
              <p
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "#3D2817" }}
              >
                {result}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}