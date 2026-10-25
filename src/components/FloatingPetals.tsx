import styles from "./FloatingPetals.module.css";

const PETAL_COLORS = ["var(--color-saffron-500)", "var(--color-maroon-500)", "var(--color-saffron-300)"];

/** A handful of petals drifting slowly through open space — sparse and deterministic, never a particle storm. */
export function FloatingPetals({ count = 6 }: { count?: number }) {
  const petals = Array.from({ length: count }, (_, i) => {
    const left = 6 + ((i * 37) % 88);
    const duration = 14 + (i % 4) * 3;
    const delay = i * 2.3;
    const color = PETAL_COLORS[i % PETAL_COLORS.length];
    return { left, duration, delay, color, id: i };
  });

  return (
    <div className={styles.wrap} aria-hidden="true">
      {petals.map((p) => (
        <svg
          key={p.id}
          className={styles.petal}
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0 C13 3 13 10 8 16 C3 10 3 3 8 0 Z" fill={p.color} />
        </svg>
      ))}
    </div>
  );
}
