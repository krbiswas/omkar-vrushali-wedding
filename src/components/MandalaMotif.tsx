/**
 * Original hand-authored mandala/rangoli artwork. Rendered as plain SVG with
 * pathLength=100 on every drawable element so stroke-dasharray/dashoffset
 * animation (in MandalaWelcome / ClosingSection) works uniformly regardless
 * of each path's actual geometric length.
 */
export function MandalaMotif({ className, id = "mandala" }: { className?: string; id?: string }) {
  const petals = Array.from({ length: 12 });
  const innerPetals = Array.from({ length: 8 });

  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(200,200)">
        <circle
          className={`${id}-ring`}
          r="170"
          fill="none"
          stroke="var(--color-gold-500)"
          strokeWidth="1"
          pathLength={100}
          opacity="0.5"
        />
        <circle
          className={`${id}-ring`}
          r="140"
          fill="none"
          stroke="var(--color-gold-300)"
          strokeWidth="1"
          pathLength={100}
          opacity="0.6"
        />

        {petals.map((_, i) => {
          const angle = (360 / petals.length) * i;
          return (
            <path
              key={`outer-${i}`}
              className={`${id}-petal`}
              d="M0,-170 C14,-140 14,-110 0,-95 C-14,-110 -14,-140 0,-170 Z"
              fill="none"
              stroke="var(--color-maroon-700)"
              strokeWidth="1.5"
              pathLength={100}
              transform={`rotate(${angle})`}
              opacity="0.85"
            />
          );
        })}

        <circle
          className={`${id}-ring`}
          r="100"
          fill="none"
          stroke="var(--color-saffron-500)"
          strokeWidth="1"
          pathLength={100}
          opacity="0.6"
        />

        {innerPetals.map((_, i) => {
          const angle = (360 / innerPetals.length) * i + 22.5;
          return (
            <path
              key={`inner-${i}`}
              className={`${id}-petal`}
              d="M0,-95 C10,-75 10,-60 0,-50 C-10,-60 -10,-75 0,-95 Z"
              fill="var(--color-saffron-300)"
              stroke="var(--color-gold-500)"
              strokeWidth="1"
              pathLength={100}
              transform={`rotate(${angle})`}
              opacity="0.8"
            />
          );
        })}

        <circle
          className={`${id}-ring`}
          r="50"
          fill="none"
          stroke="var(--color-gold-500)"
          strokeWidth="1.5"
          pathLength={100}
        />
        <circle className={`${id}-core`} r="10" fill="var(--color-gold-500)" />
      </g>
    </svg>
  );
}
