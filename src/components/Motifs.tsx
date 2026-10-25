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

export function SwastikMotif({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="40" cy="40" r="38" stroke="var(--color-gold-500)" strokeWidth="1" opacity="0.3" />
      {/* Swastik arms */}
      <path d="M40 14 L40 66" stroke="var(--color-saffron-500)" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 40 L66 40" stroke="var(--color-saffron-500)" strokeWidth="4" strokeLinecap="round" />
      {/* Clockwise hooks */}
      <path d="M40 14 L54 14" stroke="var(--color-saffron-500)" strokeWidth="4" strokeLinecap="round" />
      <path d="M66 40 L66 54" stroke="var(--color-saffron-500)" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 66 L26 66" stroke="var(--color-saffron-500)" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 40 L14 26" stroke="var(--color-saffron-500)" strokeWidth="4" strokeLinecap="round" />
      {/* Corner dots */}
      <circle cx="27" cy="27" r="3" fill="var(--color-maroon-500)" opacity="0.7" />
      <circle cx="53" cy="27" r="3" fill="var(--color-maroon-500)" opacity="0.7" />
      <circle cx="53" cy="53" r="3" fill="var(--color-maroon-500)" opacity="0.7" />
      <circle cx="27" cy="53" r="3" fill="var(--color-maroon-500)" opacity="0.7" />
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

export function BrassLampMotif({ className }: { className?: string }) {
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

export function FlowerGarlandMotif({ className }: { className?: string }) {
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

export function PeacockLotusCluster({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="150" cy="150" r="26" fill="var(--color-maroon-500)" opacity="0.18" />
      <g transform="translate(40 30) scale(1.4)">
        <circle cx="60" cy="60" r="58" stroke="var(--color-gold-500)" strokeWidth="1" opacity="0.4" />
        <path d="M60 90c-10-6-16-18-16-30 0-12 7-22 16-26 9 4 16 14 16 26 0 12-6 24-16 30z" fill="var(--color-peacock-blue, #075B80)" opacity="0.92" />
        <circle cx="60" cy="52" r="7" fill="var(--color-gold-300)" />
        <circle cx="60" cy="52" r="3" fill="var(--color-maroon-900)" />
        <path d="M60 34c6-8 14-12 22-12M60 34c-6-8-14-12-22-12" stroke="var(--color-gold-500)" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 70c-8 2-14 8-18 16M90 70c8 2 14 8 18 16" stroke="var(--color-green-600)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </g>
      <g transform="translate(10 150)">
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = -60 + i * 30;
          return (
            <ellipse
              key={i}
              cx="30"
              cy="30"
              rx="8"
              ry="20"
              fill="var(--color-maroon-500)"
              opacity={0.3 + i * 0.1}
              transform={`rotate(${angle} 30 30)`}
            />
          );
        })}
        <circle cx="30" cy="26" r="5" fill="var(--color-gold-500)" />
      </g>
    </svg>
  );
}

export function FlyingPeacockMotif({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(70 50)">
        <ellipse cx="0" cy="10" rx="10" ry="16" fill="var(--color-peacock-blue, #075B80)" />
        <path
          d="M-10 5 C-50 -20 -65 -10 -60 10 C-50 0 -25 5 -10 15 Z"
          fill="var(--color-gold-300)"
          opacity="0.9"
        />
        <path
          d="M10 5 C45 -25 60 -5 55 15 C45 2 25 8 10 18 Z"
          fill="var(--color-green-600)"
          opacity="0.9"
        />
        <circle cx="4" cy="-4" r="4" fill="var(--color-gold-500)" />
        <path d="M6 -8 L14 -14" stroke="var(--color-gold-500)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
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
