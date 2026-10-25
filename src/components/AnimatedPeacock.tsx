import React, { useEffect, useState } from 'react';
import styles from './AnimatedPeacock.module.css';

interface AnimatedPeacockProps {
  className?: string;
  /** When true, skip flight and show perched state directly */
  reducedMotion?: boolean;
}

type AnimationPhase = 'flying' | 'landing' | 'perched';

export const AnimatedPeacock: React.FC<AnimatedPeacockProps> = ({
  className,
  reducedMotion = false,
}) => {
  const [phase, setPhase] = useState<AnimationPhase>(
    reducedMotion ? 'perched' : 'flying'
  );

  useEffect(() => {
    if (reducedMotion) {
      setPhase('perched');
      return;
    }

    // Flight takes ~2.8s, then brief landing settle, then perched
    const landingTimer = setTimeout(() => {
      setPhase('landing');
    }, 2800);

    const perchedTimer = setTimeout(() => {
      setPhase('perched');
    }, 3400);

    return () => {
      clearTimeout(landingTimer);
      clearTimeout(perchedTimer);
    };
  }, [reducedMotion]);

  const phaseClass = styles[phase] || '';
  const containerClasses = [
    styles.peacockContainer,
    phaseClass,
    reducedMotion ? styles.reducedMotion : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <svg
        viewBox="0 0 200 160"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-label="Decorative animated peacock"
        role="img"
      >
        <defs>
          {/* Gradient for body */}
          <linearGradient id="peacockBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d7a6e" />
            <stop offset="100%" stopColor="#075b80" />
          </linearGradient>

          {/* Gold shimmer for crest & accents */}
          <linearGradient id="goldShimmer" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c89b3c" />
            <stop offset="50%" stopColor="#e8c84a" />
            <stop offset="100%" stopColor="#c89b3c" />
          </linearGradient>

          {/* Tail feather gradient */}
          <linearGradient id="tailGrad" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#0d7a6e" />
            <stop offset="60%" stopColor="#075b80" />
            <stop offset="100%" stopColor="#064568" />
          </linearGradient>
        </defs>

        {/* ── Tail Feathers (behind body) ── */}
        <g className={styles.tailGroup}>
          {/* Long decorative tail feathers fanning out */}
          <g className={styles.tailFeather1}>
            <path
              d="M100 108 Q85 130 60 148 Q65 135 68 125 Q72 118 80 110 Z"
              fill="url(#tailGrad)"
              opacity="0.9"
            />
            {/* Eye spot */}
            <ellipse cx="65" cy="140" rx="5" ry="6" fill="#075b80" />
            <ellipse cx="65" cy="140" rx="3" ry="3.5" fill="#c89b3c" />
            <ellipse cx="65" cy="140" rx="1.5" ry="1.8" fill="#0d7a6e" />
          </g>

          <g className={styles.tailFeather2}>
            <path
              d="M100 108 Q110 132 120 150 Q115 136 112 126 Q108 118 104 112 Z"
              fill="url(#tailGrad)"
              opacity="0.85"
            />
            <ellipse cx="116" cy="143" rx="5" ry="6" fill="#075b80" />
            <ellipse cx="116" cy="143" rx="3" ry="3.5" fill="#c89b3c" />
            <ellipse cx="116" cy="143" rx="1.5" ry="1.8" fill="#0d7a6e" />
          </g>

          <g className={styles.tailFeather3}>
            <path
              d="M100 108 Q95 135 88 152 Q92 138 94 128 Q96 120 98 112 Z"
              fill="url(#tailGrad)"
              opacity="0.8"
            />
            <ellipse cx="90" cy="145" rx="4.5" ry="5.5" fill="#075b80" />
            <ellipse cx="90" cy="145" rx="2.8" ry="3.2" fill="#c89b3c" />
            <ellipse cx="90" cy="145" rx="1.3" ry="1.5" fill="#0d7a6e" />
          </g>

          {/* Additional accent feathers */}
          <path
            d="M100 108 Q75 125 50 138 Q60 128 70 118 Q80 112 90 108 Z"
            fill="#0d7a6e"
            opacity="0.5"
          />
          <path
            d="M100 108 Q120 128 140 142 Q130 130 122 120 Q115 114 108 110 Z"
            fill="#0d7a6e"
            opacity="0.45"
          />
        </g>

        {/* ── Wings (shown during flight) ── */}
        <g
          className={styles.wingLeft}
          style={{ transformOrigin: '90px 70px' }}
        >
          <path
            d="M90 70 Q65 45 50 55 Q58 60 66 68 Q75 74 85 72 Z"
            fill="#075b80"
            opacity="0.9"
          />
          <path
            d="M88 72 Q70 52 55 58 Q62 62 70 68 Q78 74 86 73 Z"
            fill="#0d7a6e"
            opacity="0.7"
          />
        </g>

        <g
          className={styles.wingRight}
          style={{ transformOrigin: '115px 70px' }}
        >
          <path
            d="M115 70 Q140 45 155 55 Q147 60 139 68 Q130 74 120 72 Z"
            fill="#075b80"
            opacity="0.9"
          />
          <path
            d="M117 72 Q135 52 150 58 Q143 62 135 68 Q127 74 119 73 Z"
            fill="#0d7a6e"
            opacity="0.7"
          />
        </g>

        {/* ── Body ── */}
        <g className={styles.bodyGroup}>
          {/* Main body - plump, stylized teardrop */}
          <ellipse
            cx="103"
            cy="82"
            rx="16"
            ry="22"
            fill="url(#peacockBody)"
          />
          {/* Belly highlight */}
          <ellipse
            cx="100"
            cy="86"
            rx="10"
            ry="14"
            fill="#0d7a6e"
            opacity="0.4"
          />
          {/* Chest marking - traditional pattern */}
          <path
            d="M95 72 Q103 65 111 72 Q107 76 103 78 Q99 76 95 72 Z"
            fill="#c89b3c"
            opacity="0.5"
          />
        </g>

        {/* ── Neck ── */}
        <path
          d="M103 62 Q105 50 108 42"
          stroke="#075b80"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M103 62 Q105 50 108 42"
          stroke="#0d7a6e"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* ── Head Group (head, beak, eye, crest) ── */}
        <g className={styles.headGroup}>
          {/* Head */}
          <ellipse cx="108" cy="38" rx="9" ry="8" fill="#075b80" />
          {/* Cheek highlight */}
          <ellipse
            cx="106"
            cy="39"
            rx="5"
            ry="4.5"
            fill="#0d7a6e"
            opacity="0.5"
          />

          {/* Eye - white, pupil, highlight */}
          <ellipse cx="112" cy="36" rx="3" ry="2.8" fill="#fff" />
          <ellipse cx="112.5" cy="36" rx="1.8" ry="1.8" fill="#1a1a2e" />
          <circle cx="113.2" cy="35.3" r="0.7" fill="#fff" />

          {/* Eyelid for blink */}
          <ellipse
            cx="112"
            cy="36"
            rx="3.2"
            ry="2.8"
            fill="#075b80"
            className={styles.eyelid}
          />

          {/* Beak */}
          <path
            d="M117 37 L123 38.5 L117 40 Z"
            fill="#e8762c"
          />
          {/* Beak highlight */}
          <path
            d="M117.5 37.5 L122 38.5 L117.5 39 Z"
            fill="#f09840"
            opacity="0.5"
          />

          {/* Crest - three decorative plumes */}
          <g className={styles.crest}>
            <line
              x1="108"
              y1="31"
              x2="105"
              y2="18"
              stroke="#c89b3c"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="105" cy="17" r="2.5" fill="#c89b3c" />
            <circle cx="105" cy="17" r="1.2" fill="#0d7a6e" />

            <line
              x1="110"
              y1="30"
              x2="110"
              y2="14"
              stroke="#c89b3c"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="110" cy="13" r="2.8" fill="#c89b3c" />
            <circle cx="110" cy="13" r="1.4" fill="#0d7a6e" />

            <line
              x1="112"
              y1="31"
              x2="116"
              y2="19"
              stroke="#c89b3c"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="116" cy="18" r="2.3" fill="#c89b3c" />
            <circle cx="116" cy="18" r="1.1" fill="#0d7a6e" />
          </g>
        </g>

        {/* ── Feet (visible when perched) ── */}
        <g className={styles.feet}>
          {/* Left foot */}
          <line
            x1="96"
            y1="102"
            x2="93"
            y2="115"
            stroke="#e8762c"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M93 115 L88 118 M93 115 L93 119 M93 115 L97 117"
            stroke="#e8762c"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right foot */}
          <line
            x1="110"
            y1="102"
            x2="113"
            y2="115"
            stroke="#e8762c"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M113 115 L108 118 M113 115 L113 119 M113 115 L117 117"
            stroke="#e8762c"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};
