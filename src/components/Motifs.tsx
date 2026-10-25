/** Original, hand-authored SVG decorative motifs inspired by Maharashtrian wedding art. */

export function PeacockMotif({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="60" cy="60" r="58" stroke="var(--color-gold-500)" strokeWidth="1.5" opacity="0.5" />
      <path
        d="M60 90c-10-6-16-18-16-30 0-12 7-22 16-26 9 4 16 14 16 26 0 12-6 24-16 30z"
        fill="var(--color-maroon-700)"
        opacity="0.9"
      />
      <circle cx="60" cy="52" r="7" fill="var(--color-gold-300)" />
      <circle cx="60" cy="52" r="3" fill="var(--color-maroon-900)" />
      <path d="M60 34c6-8 14-12 22-12M60 34c-6-8-14-12-22-12" stroke="var(--color-gold-500)" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 70c-8 2-14 8-18 16M90 70c8 2 14 8 18 16" stroke="var(--color-gold-500)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function PaisleyMotif({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M30 8c14 4 20 18 14 32-4 10-14 14-10 24 2 5 8 6 8 6s-14 4-22-6c-8-10-4-22 2-30 5-7 10-14 8-26z"
        fill="var(--color-saffron-500)"
        opacity="0.85"
      />
      <path
        d="M30 14c9 4 12 14 8 23-3 7-9 10-7 17"
        stroke="var(--color-gold-300)"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

export function LotusMotif({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = -60 + i * 30;
        return (
          <ellipse
            key={i}
            cx="50"
            cy="50"
            rx="10"
            ry="26"
            fill="var(--color-maroon-500)"
            opacity={0.25 + i * 0.1}
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
      <circle cx="50" cy="44" r="7" fill="var(--color-gold-500)" />
    </svg>
  );
}

export function TopBorder({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="0" y1="12" x2="400" y2="12" stroke="var(--color-gold-500)" strokeWidth="1" opacity="0.6" />
      {Array.from({ length: 20 }).map((_, i) => (
        <path
          key={i}
          d={`M${i * 20} 12 q5 -10 10 0 q5 10 10 0`}
          stroke="var(--color-gold-500)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

export function GaneshMotif({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="40" cy="40" r="38" stroke="var(--color-gold-500)" strokeWidth="1" opacity="0.4" />
      <ellipse cx="40" cy="30" rx="13" ry="12" fill="var(--color-gold-500)" />
      <path d="M28 34 Q20 42 26 54 Q30 58 34 52" stroke="var(--color-gold-500)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="30" rx="9" ry="12" fill="var(--color-gold-300)" transform="rotate(-10 22 30)" />
      <ellipse cx="58" cy="30" rx="9" ry="12" fill="var(--color-gold-300)" transform="rotate(10 58 30)" />
      <circle cx="34" cy="28" r="2" fill="var(--color-maroon-900)" />
      <circle cx="46" cy="28" r="2" fill="var(--color-maroon-900)" />
      <path d="M26 48 Q40 58 54 48 L50 62 Q40 68 30 62 Z" fill="var(--color-gold-500)" />
      <circle cx="40" cy="12" r="3" fill="var(--color-saffron-500)" />
    </svg>
  );
}

export function GarlandStrip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0,4 Q40,34 80,4 T160,4 T240,4 T320,4 T400,4" stroke="var(--color-green-600)" strokeWidth="2" fill="none" opacity="0.6" />
      {Array.from({ length: 10 }).map((_, i) => {
        const x = 20 + i * 38;
        const marigold = i % 2 === 0;
        return (
          <circle
            key={i}
            cx={x}
            cy={i % 2 === 0 ? 18 : 10}
            r={marigold ? 6 : 5}
            fill={marigold ? "var(--color-saffron-500)" : "var(--color-ivory-100)"}
            stroke="var(--color-gold-500)"
            strokeWidth="0.75"
          />
        );
      })}
    </svg>
  );
}

export function KalashMotif({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 70 Q30 76 40 70 L36 40 Q30 36 24 40 Z" fill="var(--color-gold-500)" />
      <ellipse cx="30" cy="40" rx="14" ry="6" fill="var(--color-gold-300)" />
      <path d="M18 34 Q30 20 42 34" stroke="var(--color-green-600)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="18" cy="32" r="4" fill="var(--color-green-600)" />
      <circle cx="30" cy="18" r="4" fill="var(--color-green-600)" />
      <circle cx="42" cy="32" r="4" fill="var(--color-green-600)" />
      <path d="M22 72 h16" stroke="var(--color-maroon-700)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
