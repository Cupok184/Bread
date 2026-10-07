import { useState } from "react";

const SECTIONS = 9;
const SECTION_ANGLE = 360 / SECTIONS; // 40
const VIEWBOX = 360;
const RADIUS = VIEWBOX / 2 - 8;
const CENTER = VIEWBOX / 2;

// 8 секций "Рандом" + 1 золотая "Везунчик" (индекс 0)
const SECTION_COLORS = [
  "#F4D03F", // 0 — золотая (Везунчик)
  "#D4A574",
  "#E8C9A0",
  "#D4A574",
  "#E8C9A0",
  "#D4A574",
  "#E8C9A0",
  "#D4A574",
  "#E8C9A0",
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

export default function BreadWheel({ onResult, disabled }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    if (spinning || disabled) return;
    setSpinning(true);
    const spinAmount = 360 * 5 + Math.random() * 360;
    const newRotation = rotation + spinAmount;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const normalized = ((newRotation % 360) + 360) % 360;
      const topAngle = (360 - normalized) % 360;
      const sectionIndex = Math.floor(topAngle / SECTION_ANGLE);
      const isLucky = sectionIndex === 0;
      onResult?.({ isLucky, sectionIndex });
    }, 4100);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[360px] aspect-square mx-auto">
        {/* Указатель сверху */}
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 z-20"
          style={{
            width: 0,
            height: 0,
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderTop: "26px solid #5C3A1E",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
          }}
        />

        {/* Колесо */}
        <svg
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          className="w-full h-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)",
            filter: "drop-shadow(0 8px 24px rgba(139, 94, 60, 0.25))",
          }}
        >
          <defs>
            <linearGradient id="goldenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#DAA520" />
            </linearGradient>
          </defs>

          {Array.from({ length: SECTIONS }, (_, i) => {
            const startAngle = i * SECTION_ANGLE - 90;
            const endAngle = (i + 1) * SECTION_ANGLE - 90;
            const midAngle = (startAngle + endAngle) / 2;
            const isGolden = i === 0;
            const label = isGolden ? "Везунчик" : "Рандом";
            const fill = isGolden ? "url(#goldenGrad)" : SECTION_COLORS[i];
            const labelPos = polarToCartesian(CENTER, CENTER, RADIUS * 0.62, midAngle);

            const tangential = midAngle + 90;
            const base = ((tangential % 360) + 360) % 360;
            const textRotation = base > 90 && base < 270 ? tangential + 180 : tangential;

            return (
              <g key={i}>
                <path
                  d={arcPath(CENTER, CENTER, RADIUS, startAngle, endAngle)}
                  fill={fill}
                  stroke="#8B5E3C"
                  strokeWidth="2"
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textRotation}, ${labelPos.x}, ${labelPos.y})`}
                  fill={isGolden ? "#5C3A1E" : "#5C3A1E"}
                  fontSize="15"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Ободок */}
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#8B5E3C" strokeWidth="4" />
        </svg>

        {/* Центральная кнопка */}
        <button
          onClick={handleSpin}
          disabled={spinning || disabled}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full flex items-center justify-center font-bold transition-transform active:scale-95"
          style={{
            width: 88,
            height: 88,
            background: spinning
              ? "#D4A574"
              : "linear-gradient(135deg, #8B5E3C, #5C3A1E)",
            color: "#FFF",
            fontSize: 13,
            boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
            border: "3px solid #F4D03F",
            opacity: spinning || disabled ? 0.7 : 1,
            cursor: spinning || disabled ? "not-allowed" : "pointer",
          }}
        >
          {spinning ? "..." : "КРУТИТЬ"}
        </button>
      </div>
    </div>
  );
}