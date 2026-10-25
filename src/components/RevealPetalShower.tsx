import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./RevealPetalShower.module.css";

const PETAL_COLORS = ["#b3273a", "#d94f5c", "#e8762c", "#c23b4a", "#a8234e"];
const PETAL_COUNT = 28;

type Side = "top" | "bottom" | "left" | "right";

interface PetalData {
  id: number;
  side: Side;
  offset: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotateStart: number;
  color: string;
}

export function RevealPetalShower({ active }: { active: boolean }) {
  const [opacity, setOpacity] = useState(1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const petals = useMemo<PetalData[]>(() => {
    const sides: Side[] = ["top", "bottom", "left", "right"];
    return Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      side: sides[i % 4],
      offset: Math.round(Math.random() * 90),
      size: 8 + Math.round(Math.random() * 8),
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 3,
      drift: Math.round((Math.random() - 0.5) * 80),
      rotateStart: Math.round(Math.random() * 360),
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }));
  }, []);

  useEffect(() => {
    if (!active) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 50;
      const fadeEnd = 400;
      if (scrollY <= fadeStart) {
        setOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setOpacity(0);
      } else {
        setOpacity(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={wrapperRef}
      className={styles.shower}
      style={{ opacity }}
      aria-hidden="true"
    >
      {petals.map((p) => {
        const positionStyle = getPositionStyle(p);
        return (
          <svg
            key={p.id}
            className={`${styles.petal} ${styles[p.side]}`}
            style={{
              ...positionStyle,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--rotate-start": `${p.rotateStart}deg`,
            } as React.CSSProperties}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 0 C13 3 14 9 8 16 C2 9 3 3 8 0 Z" fill={p.color} />
            <path d="M8 2 C10 5 10 9 8 13" stroke="rgba(0,0,0,0.1)" strokeWidth="0.4" fill="none" />
          </svg>
        );
      })}
    </div>
  );
}

function getPositionStyle(p: PetalData): React.CSSProperties {
  switch (p.side) {
    case "top":
      return { left: `${p.offset}%`, top: "-3%" };
    case "bottom":
      return { left: `${p.offset}%`, bottom: "-3%" };
    case "left":
      return { top: `${p.offset}%`, left: "-3%" };
    case "right":
      return { top: `${p.offset}%`, right: "-3%" };
  }
}
