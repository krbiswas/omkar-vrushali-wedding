import { useMemo } from "react";
import styles from "./FloatingPetals.module.css";

const PETAL_COLORS = ["#b3273a", "#d94f5c", "#e8762c", "#c23b4a"];

export function FloatingPetals({ count = 5 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 90),
        duration: 10 + Math.random() * 8,
        delay: Math.random() * 10,
        drift: Math.round((Math.random() - 0.5) * 120),
        size: 10 + Math.round(Math.random() * 8),
        rotateStart: Math.round(Math.random() * 360),
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      })),
    [count]
  );

  return (
    <div className={styles.wrap} aria-hidden="true">
      {petals.map((p) => (
        <svg
          key={p.id}
          className={styles.petal}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--rotate-start": `${p.rotateStart}deg`,
            } as React.CSSProperties
          }
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0 C13 3 14 9 8 16 C2 9 3 3 8 0 Z" fill={p.color} />
          <path d="M8 2 C10 5 10 9 8 13" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" fill="none" />
        </svg>
      ))}
    </div>
  );
}
