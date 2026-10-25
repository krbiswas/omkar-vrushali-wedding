import { PaisleyMotif, PeacockMotif } from "./Motifs";
import styles from "./DecorativeSideBorder.module.css";

function BrassLamp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="24" cy="8" rx="5" ry="7" fill="var(--color-saffron-500)" opacity="0.85" />
      <path d="M24 15 L24 24" stroke="var(--color-gold-500)" strokeWidth="2" />
      <path d="M8 24 Q24 14 40 24 L36 30 Q24 22 12 30 Z" fill="var(--color-gold-500)" />
      <rect x="21" y="30" width="6" height="18" fill="var(--color-gold-300)" />
      <path d="M10 48 Q24 40 38 48 L34 56 Q24 50 14 56 Z" fill="var(--color-gold-500)" />
      <rect x="18" y="56" width="12" height="4" fill="var(--color-maroon-700)" />
    </svg>
  );
}

function FlowerGarland({ className }: { className?: string }) {
  const flowers = Array.from({ length: 6 });
  return (
    <svg className={className} viewBox="0 0 24 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 0 L12 160" stroke="var(--color-green-600)" strokeWidth="1.5" opacity="0.6" />
      {flowers.map((_, i) => {
        const y = 14 + i * 26;
        const isMarigold = i % 2 === 0;
        return (
          <g key={i} transform={`translate(12 ${y})`}>
            <circle r="7" fill={isMarigold ? "var(--color-saffron-500)" : "var(--color-ivory-100)"} stroke="var(--color-gold-500)" strokeWidth="0.75" />
            <circle r="2.5" fill="var(--color-gold-500)" />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Fixed decorative framing for wide desktop viewports — brass lamp, flower
 * garland, paisley and peacock motifs stacked down each edge. Hidden below
 * 1180px so it never competes with content or causes mobile overflow.
 */
export function DecorativeSideBorder() {
  return (
    <>
      <div className={`${styles.side} ${styles.left}`} aria-hidden="true">
        <div className={styles.column}>
          <BrassLamp className={styles.lamp} />
          <FlowerGarland className={styles.garland} />
          <PaisleyMotif className={styles.paisley} />
          <PeacockMotif className={styles.peacock} />
        </div>
      </div>
      <div className={`${styles.side} ${styles.right}`} aria-hidden="true">
        <div className={styles.column}>
          <BrassLamp className={styles.lamp} />
          <FlowerGarland className={styles.garland} />
          <PaisleyMotif className={styles.paisley} />
          <PeacockMotif className={styles.peacock} />
        </div>
      </div>
    </>
  );
}
